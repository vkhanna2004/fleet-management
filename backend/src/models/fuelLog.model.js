import mongoose, { Schema } from "mongoose";

const fuelLogSchema = new Schema(
  {
    logid: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    vehicleid: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
      index: true,
    },
    fuelType: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    cost: {
      type: Number,
      required: true,
      min: 1,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

export const FuelLog=mongoose.model("FuelLog",fuelLogSchema);