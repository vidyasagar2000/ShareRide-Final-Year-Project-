const { ObjectId } = require('mongoose').Types;
const { Message } = require("../models/message.models.js");
const User = require("../models/user.models.js");

const socketId = {};

const userMessage = (socket, io) => {
    // Store user ID and socket ID when they join a room
    socket.on("joinRoom", async (userId) => {
        try {
            if (!userId || !ObjectId.isValid(userId)) {
                throw new Error("Invalid user ID.");
            }

            const user = await User.findById(userId);
            if (!user) {
                throw new Error("User not found.");
            }

            socketId[userId] = socket.id;
            // console.log(`User ${userId} joined room with socket ID ${socket.id}`);
        } catch (error) {
            console.error(error.message);
            socket.emit('error', { message: error.message });
        }
    });

    // Handling sending a message
    socket.on('message', async (message, user1, user2) => {
        try {
            const room=[user1,user2].sort().join('-');
            const { from, fromId, content, to, toId, timestamp } = message;

            // Validate that all required fields are present
            if (![from, fromId, content, to, toId, timestamp].every(field => field && field.trim() !== '')) {
                // console.log("failed sending",message)
                throw new Error("All fields are required and must not be empty.");
            }

            // Verify sender's identity
            const sender = await User.findById(fromId);
            if (!sender || sender.fullName !== from) {
                throw new Error("Sender verification failed.");
            }

            // Verify receiver's identity
            const receiver = await User.findById(toId);
            if (!receiver || receiver.fullName !== to) {
                throw new Error("Receiver verification failed.");
            }

            // Create new message in the database
            const newMessage = await Message.create({
                from,
                fromId,
                content,
                room,
                to,
                toId,
                timestamp
            });

            // Send the message to the recipient if they are online
            // const recipientSocketId = socketId[toId];
            // if (recipientSocketId) {
                // socket.to(recipientSocketId).emit('message', [newMessage], user1, user2);
                socket.to(room).emit('message', [newMessage], user1, user2);

            // } else {
                // console.log(`User ${toId} is offline.`);
            // }
        } catch (error) {
            console.error("Message sending failed:", error.message);
            socket.emit('error', { message: error.message });
        }
    });

    // Fetch chat history between two users when the chat is opened
    socket.on('openChat', async ({ user1, user2 }) => {
        const room=[user1,user2].sort().join('-');
        socket.join(room);
        try {
            if (!user1 || !user2) {
                throw new Error("Sender or Receiver not recognized");
            }

            const messages = await Message.aggregate([
                {
                    $match: {
                        $or: [
                            { toId: new ObjectId(user1), fromId: new ObjectId(user2) },
                            { toId: new ObjectId(user2), fromId: new ObjectId(user1) },
                        ]
                    }
                },
                {
                    $sort:{
                        createdAt:-1
                    }
                }
            ]);

            // Send the messages back to the client opening the chat
            socket.emit('message', messages, user1, user2);
            // socket.to(room).emit('message',messages, user1, user2);
        } catch (error) {
            console.error("Error fetching messages:", error);
            socket.emit('error', { message: "Failed to fetch messages." });
        }
    });
    
    socket.on('close-chat',({user1,user2})=>{
        const room=[user1,user2].sort().join('-');
        socket.leave(room);
        // console.log(`Socket ${socket.id} left room ${room}`);
    })
    // Handle user leaving room
    socket.on("leaveRoom", (userId) => {
        if (socketId[userId] === socket.id) {
            delete socketId[userId];
            // console.log(`User ${userId} left the room.`);
        }
    });

    // Handle user disconnecting
    socket.on("disconnect", () => {
        for (const userId in socketId) {
            if (socketId[userId] === socket.id) {
                delete socketId[userId];  // Remove user from socketId map
                // console.log(`User ${userId} disconnected.`);
                break;
            }
        }
    });
};

module.exports = { userMessage };
