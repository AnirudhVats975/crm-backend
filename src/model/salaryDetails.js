import mongoose, { Schema } from "mongoose";

const SalaryDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    employeeID: {
      type: String,
      required: true,
    },

    name: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    joiningDate: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    UAN: {
      type: String,
    },

    EPFNo: {
      type: String,
    },

    BankAcNo: {
      type: String,
    },

    overtimeAmount: {
      type: String,
    },

    basicSalary: {
      type: String,
    },

    medicalAllowance: {
      type: String,
    },

    conveyanceAllowance: {
      type: String,
    },

    specialAllowance: {
      type: String,
    },

    EPF: {
      type: String,
    },

    EsiOrHealthInsurance: {
      type: String,
    },

    vehicleLoan: {
      type: String,
    },

    vehicleLoanMonthlyDeduction: {
      type: String,
    },

    otherLoan: {
      type: String,
    },

    otherLoanMonthlyDeduction: {
      type: String,
    },
  },
  { timestamps: true }
);

export const SalaryDetails = mongoose.model(
  "SalaryDetails",
  SalaryDetailsSchema
);
