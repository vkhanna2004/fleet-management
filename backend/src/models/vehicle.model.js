import mongoose, { Schema } from "mongoose";

const vehicleSchema = new Schema(
  {
    vehicleid: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    make: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    licensePlate: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Available", "In Use", "Maintenance", "Unavailable"],
      default: "Available",
    },
    currentLocation: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    year: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
