import mongoose from "mongoose";

const cycleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserReg",
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    length: {
      type: Number // optional, can calculate from dates
    },
    averageFlow: {
      type: String,
      enum: ["light", "medium", "heavy"]
    },
    Cramps: {
      type: String,
      enum: ["light", "medium", "heavy"],
      required: true
    },
    notes: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Cycle", cycleSchema, "UserCycle");
