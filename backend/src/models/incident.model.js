import mongoose, { Schema } from "mongoose";

const incidentSchema = new Schema(
  {
    incidentId: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
      index: true,
    },
    driverId: {
      type: Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    resolutionStatus: {
      type: String,
      enum: ["Pending", "Resolved", "Under Investigation"],
      default: "Pending",
    },
    //can add option for adding photos
  },
  { timestamps: true }
);

export const Incident = mongoose.model("Incident", incidentSchema);
