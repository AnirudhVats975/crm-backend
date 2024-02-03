import mongoose, { Schema } from "mongoose";

const bankDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    bankName: {
      type: String,
      required: true,
    },

    branchName: {
      type: String,
      required: true,
    },

    accountHolderName: {
      type: String,
      required: true,
    },

    accountNumber: {
      type: String,
      required: true,
    },

    IFSCCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const BankDetails = mongoose.model("BankDetails", bankDetailsSchema);
