import mongoose, { Schema } from "mongoose";

const scheduleSchema = new Schema(
  {
    scheduleId: {
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
    routeId: {
      type: Schema.Types.ObjectId,
      ref: "Route",
      required: true,
      index: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Scheduled", "Ongoing", "Completed", "Cancelled"],
      default: "Scheduled",
    },
  },
  { timestamps: true }
);

export const Schedule = mongoose.model("Schedule", scheduleSchema);
