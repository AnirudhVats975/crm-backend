import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { PersonalDetails } from "../model/personalDetails.model.js";
import { OfficialDetails } from "../model/officialDetails.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { User } from "../model/user.model.js";
import mongoose from "mongoose";

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


export { personalDetails, officialDetails };
