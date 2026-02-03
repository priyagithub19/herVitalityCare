import mongoose from "mongoose";

const daySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserReg",
      required: true
    },
    cycleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cycle",
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    dayNumber: {
      type: Number, // 1..cycleLength
      required: true
    },
    flow: {
      type: String,
      enum: ["none", "light", "medium", "heavy"],
      default: "none"
    },
    painLevel: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    mood: {
      type: String, 
      enum: ["happy", "normal", "irritable", "sad", "anxious", "tired", "other"],
      default: "normal"
    },
    symptoms: [
      {
        type: String
      }
    ],
    notes: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Day", daySchema, "UserDayLog");
