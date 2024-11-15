require("dotenv").config();
const { Server } = require('socket.io');
const express = require("express");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connection");
const cors = require("cors");
const http = require("http");

const port = process.env.PORT || 3000;
const host = '0.0.0.0';

const userRoute = require("./routes/user.routes.js");
const journeyRoute = require("./routes/journey.routes.js");
const { checkForAuthenticationCookie, restrictTo } = require("./middlewares/user.middlewares.js");
const { userMessage } = require("./controllers/userMessage.js");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "*",
  credentials: true,
}));
const dataBaseUrl = process.env.DATABASE_URL;
// console.log(dataBaseUrl);
connectToMongoDB(dataBaseUrl).then(() => {
  app.on('error', (error) => {
    console.error('Express is not able to talk to the database. Error:', error);
  });

  server.listen(port, host, () => {
    console.log(`Server is listening at http://${host}:${port}`);
  });

  server.on('close', () => {
    console.log('Server closed');
  });
})
.catch((error) => {
  console.error('Failed to connect to the database:', error);
});

app.use(express.urlencoded({ extended: false }));
app.use(checkForAuthenticationCookie("token"));

app.get("/", (req, res) => {
  return res.send("Hello!, Welcome to Share Ride.");
});

app.use("/user", userRoute);
app.use("/journey", restrictTo(["USER", "ADMIN"]), journeyRoute);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// console.log('Socket server initialized');

io.on('connection', (socket) => {
  // console.log('A user connected:', socket.id);
  userMessage(socket, io);
  socket.on('disconnect', () => {
    // console.log('A user disconnected:', socket.id);
  });
});

io.on('error', (error) => {
  console.error('Socket.io error:', error);
});
