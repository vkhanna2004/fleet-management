import mongoose, { Schema } from "mongoose";

const cargoSchema = new Schema(
  {
    cargoId: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    weight: {
      type: Number,//in kilograms
      required: true,
      min: 0,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    specialHandling: {
      type: Boolean,
      default: false,
    },
    deliveryStatus: {
      type: String,
      enum: ["Pending", "In Transit", "Delivered", "Delayed"],
      default: "Pending",
    },
    // proofOfDelivery: {
    //   type: String, // Could store image/file URL
    // },
  },
  { timestamps: true }
);

export const Cargo = mongoose.model("Cargo", cargoSchema);
