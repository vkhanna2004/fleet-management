import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { redisClient } from "../config/redis.js";
const userSchema = new Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["Admin", "FleetManager", "Driver", "MaintenanceStaff", "Customer"],
      required: [true, "Select a role"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// middleware function- which will be executed before saving anything
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      userid: this._id,
      email: this.email,
      fullName: this.fullName,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Generate Refresh Token and store it in Redis
userSchema.methods.generateRefreshToken = async function () {
  const refreshToken = jwt.sign(
    {
      userid: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );

  // Convert expiry into seconds
  const refreshExpirySeconds =parseInt(process.env.REFRESH_TOKEN_EXPIRY) * 24 * 60 * 60;

  await redisClient.setEx(
    this._id.toString(),
    refreshExpirySeconds,
    refreshToken
  );

  return refreshToken;
};

//Logout , remove refresh token
userSchema.methods.revokeRefreshToken = async function () {
  await redisClient.del(this._id.toString());
};

export const User = mongoose.model("User", userSchema);
