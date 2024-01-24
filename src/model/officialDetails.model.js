import mongoose, { Schema } from "mongoose";

const officialDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    employeeType: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    workingDays: {
      type: Array,
      required: true,
    },

    workingShift: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const OfficialDetails = mongoose.model(
  "OfficialDetails",
  officialDetailsSchema
);
