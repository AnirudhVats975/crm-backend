import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { PersonalDetails } from "../model/personalDetails.model.js";
import { OfficialDetails } from "../model/officialDetails.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";
import { BankDetails } from "../model/bankDetails.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { DocumentsDetails } from "../model/documentsDetails.model.js";
import { LeaveDetails } from "../model/leaveDetails.model.js";
import { SalaryDetails } from "../model/salaryDetails.js";

const personalDetails = asyncHandler(async (req, res) => {
  const {
    name,
    workEmail,
    phoneNumber,
    dateOfBirth,
    whatAppNumber,
    maritalStatus,
    gender,
    address,
    state,
    city,
    zipCode,
    country,
  } = req.body;

  if (
    !name ||
    !workEmail ||
    !phoneNumber ||
    !dateOfBirth ||
    !whatAppNumber ||
    !maritalStatus ||
    !gender ||
    !address ||
    !state ||
    !city ||
    !country ||
    !zipCode
  ) {
    throw new apiError(401, "All fields are required.");
  }

  const newPersonalDetails = new PersonalDetails({
    userId: new mongoose.Types.ObjectId(req.user?._id),
    name,
    workEmail,
    phoneNumber,
    dateOfBirth,
    whatAppNumber,
    maritalStatus,
    gender,
    address,
    state,
    city,
    country,
    zipCode,
  });

  try {
    await newPersonalDetails.save();
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          newPersonalDetails,
          "Personal details saved successfully."
        )
      );
  } catch (error) {
    console.error("Error saving to the database:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const officialDetails = asyncHandler(async (req, res) => {
  const {
    employeeType,
    department,
    designation,
    joiningDate,
    workingDays,
    workingShift,
  } = req.body;

  if (
    !employeeType ||
    !department ||
    !designation ||
    !joiningDate ||
    !workingDays ||
    !workingShift
  ) {
    throw new apiError(401, "All fields are required.");
  }

  const newOfficialDetails = new OfficialDetails({
    userId: new mongoose.Types.ObjectId(req.user?._id),
    employeeType,
    department,
    designation,
    joiningDate,
    workingDays,
    workingShift,
  });

  try {
    await newOfficialDetails.save();
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          newOfficialDetails,
          "Personal details saved successfully."
        )
      );
  } catch (error) {
    console.error("Error saving to the database:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const bankDetails = asyncHandler(async (req, res) => {
  const { bankName, branchName, accountHolderName, accountNumber, IFSCCode } =
    req.body;

  if (
    !bankName ||
    !branchName ||
    !accountHolderName ||
    !accountNumber ||
    !IFSCCode
  ) {
    throw new apiError(401, "All fields are required.");
  }

  const newBankDetails = new BankDetails({
    userId: new mongoose.Types.ObjectId(req.user?._id),
    bankName,
    branchName,
    accountHolderName,
    accountNumber,
    IFSCCode,
  });

  try {
    await newBankDetails.save();
    return res
      .status(200)
      .json(
        new apiResponse(200, newBankDetails, "Bank details saved successfully.")
      );
  } catch (error) {
    console.error("Error saving to the database:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const documentsDetails = asyncHandler(async (req, res) => {
  try {
    const uploadedFiles = req.files;

    if (!uploadedFiles || Object.keys(uploadedFiles).length === 0) {
      throw new apiError(401, "No file uploaded");
    }

    const cloudinaryResponses = [];
    for (const fieldName in uploadedFiles) {
      const filesForField = uploadedFiles[fieldName];
      for (const file of filesForField) {
        const cloudinaryResponse = await uploadOnCloudinary(file.path);
        if (!cloudinaryResponse) {
          throw new apiError(401, "Failed to upload one or more files");
        }
        // Push an object with both key and URL into cloudinaryResponses
        cloudinaryResponses.push({
          key: fieldName,
          url: cloudinaryResponse.secure_url,
        });
      }
    }

    const documentUrls = {};
    for (const response of cloudinaryResponses) {
      // Check if the key exists in documentUrls, if not, initialize it as an empty array
      if (!documentUrls[response.key]) {
        documentUrls[response.key] = [];
      }
      // Push the URL into the array corresponding to the key
      documentUrls[response.key].push(response.url);
    }

    const documentsDetails = await DocumentsDetails.create({
      userId: new mongoose.Types.ObjectId(req.user?._id),
      documentUrls: documentUrls,
    });

    return res
      .status(201)
      .json(
        new apiResponse(
          200,
          documentsDetails,
          "Bank details saved successfully."
        )
      );
  } catch (error) {
    console.error("Error saving to the documents:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const leaveDetails = asyncHandler(async (req, res) => {
  try {
    const { totalLeave, earnedLeave, sickLeave, causalLeave } = req.body;

    if (!totalLeave || !earnedLeave || !sickLeave || !causalLeave) {
      throw new apiError(401, "all the field are required");
    }

    const newLeaveDetails = new LeaveDetails({
      userId: new mongoose.Types.ObjectId(req.user?._id),
      totalLeave,
      earnedLeave,
      sickLeave,
      causalLeave,
    });
    await newLeaveDetails.save();

    return res
      .status(201)
      .json(
        new apiResponse(
          2001,
          newLeaveDetails,
          "Leave details created successfully"
        )
      );
  } catch (error) {
    console.error("Error while save the leave details :", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const salaryDetails = asyncHandler(async (req, res) => {
  try {
    const {
      employeeID,
      UAN,
      EPFNo,
      overtimeAmount,
      basicSalary,
      medicalAllowance,
      conveyanceAllowance,
      specialAllowance,
      EPF,
      EsiOrHealthInsurance,
      vehicleLoan,
      vehicleLoanMonthlyDeduction,
      otherLoan,
      otherLoanMonthlyDeduction,
    } = req.body;

    const createSalaryDetails = new SalaryDetails({
      userId: new mongoose.Types.ObjectId(req.user?._id),
      employeeID,
      name: new mongoose.Types.ObjectId(req.user?.name),
      joiningDate: new mongoose.Types.ObjectId(req.user?.joiningDate),
      UAN,
      EPFNo,
      BankAcNo: new mongoose.Types.ObjectId(req.user?.accountNumber),
      overtimeAmount,
      basicSalary,
      medicalAllowance,
      conveyanceAllowance,
      specialAllowance,
      EPF,
      EsiOrHealthInsurance,
      vehicleLoan,
      vehicleLoanMonthlyDeduction,
      otherLoan,
      otherLoanMonthlyDeduction,
    });

    await createSalaryDetails.save();

    return res
      .status(201)
      .json(
        new apiResponse(
          2001,
          createSalaryDetails,
          "Leave details created successfully"
        )
      );
  } catch (error) {
    console.error("Error while save the salary details :", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const getAllUser = asyncHandler(async () => {
  try {
     
  } catch (error) {
    console.error("Error while save the get all user details :", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export {
  personalDetails,
  officialDetails,
  bankDetails,
  documentsDetails,
  leaveDetails,
  salaryDetails,
  getAllUser
};
