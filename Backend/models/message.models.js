const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    from: {
        type: String,
        required: true
    },
    fromId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    room: {
        type: String,
        default: ""
    },
    to: {
        type: String,
        required: true
    },
    toId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    timestamp: {
        type: String, 
        required: true
    }
}, {
    timestamps: true 
});
const Message = mongoose.model("Message", messageSchema);

module.exports={Message};
