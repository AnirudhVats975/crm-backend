import mongoose, { Schema } from "mongoose";

const personalDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    name: {
      type: String,
      required: true,
    },

    workEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    whatAppNumber: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },

    maritalStatus: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    zipCode: {
      type: Number,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const PersonalDetails = mongoose.model(
  "PersonalDetails",
  personalDetailsSchema
);
