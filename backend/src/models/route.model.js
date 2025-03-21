import mongoose, { Schema } from "mongoose";

const routeSchema = new Schema(
  {
    routeId: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    source: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    distance: {
      type: Number,
      required: true,
      min: 1, 
    },
    estimatedTime: {
      type: Number, // in minutes
      required: true,
      min: 1,
    },
    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
      index: true,
    },
    
  },
  { timestamps: true }
);

export const Route = mongoose.model("Route", routeSchema);
