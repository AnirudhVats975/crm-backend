import mongoose, { Schema } from "mongoose";
import { apiError } from "../utils/apiError.js";

const leaveDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    totalLeave: {
      type: Number,
      required: true,
    },

    earnedLeave: {
      type: Number,
      required: true,
    },

    sickLeave: {
      type: Number,
      required: true,
    },

    causalLeave: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

leaveDetailsSchema.pre("validate", function (next) {
  const totalLeave = this.totalLeave;
  const sumOfLeaves = this.earnedLeave + this.sickLeave + this.causalLeave;

  if (sumOfLeaves > totalLeave) {
    return next(
      new apiError(
        401,
        "The sum of earnedLeave, sickLeave, and causalLeave cannot exceed totalLeave."
      )
    );
  }

  next();
});

export const LeaveDetails = mongoose.model("LeaveDetails", leaveDetailsSchema);
