const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const journeySchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    passengerRequired: {
      type: Number,
      required: true,
    },
    phoneNo:{
      type: String,
      required: true, 
    },
    fullName:{
      type: String,
      required: true, 
    },
    enrollmentNo:{
      type: String,
      required: true,
    },
    passengers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    }],
    journeyStartLocation: {
      type: String,
      required: true,
      default: "Main Gate",
    },
    journeyEndLocation: {
      type: String,
      required: true,
      default: "Destination City",
    },
    journeyDescription: {
      type: String,
      required: true,
    },
    fare: {
      type: Number,
      default: 0,
    },
    journeyDate: {
      type: Date,
      required: true,
    },
   journeyTime: {
    type: String,
    required: true,
   },

    status: {
      type: String,
      enum: ["required", "full", "cancelled"],
      default: "required",
    },
  },
  { timestamps: true }
);

const Journey = mongoose.model("Journey", journeySchema);
module.exports = Journey;
