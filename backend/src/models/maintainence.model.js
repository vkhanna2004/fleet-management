import mongoose, { Schema } from "mongoose";

const maintainenceSchema = new Schema(
  {
    maintainenceid: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    vehicleid: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    type: {
      type: String,
      enum: ["Routine", "Repair", "Inspection", "Other"],
      required: true,
    },
    cost: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["Scheduled", "In Progress", "Completed", "Overdue", "Cancelled"],
      default: "Scheduled",
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Maintenance = mongoose.model("Maintainence", maintainenceSchema);
