import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../model/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validationBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(
      500,
      "something went to wrong while generating access and refresh token"
    );
  }
};

// *-------- register controller------*
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, mobileNumber, password } = req.body;

  if ([fullName, email, mobileNumber, password].some((field) => field === "")) {
    throw new apiError(400, "All felid are required ");
  }

  const existedUser = await User.findOne({
    $or: [{ mobileNumber }, { email }],
  });

  if (existedUser) {
    throw new apiError(409, "User with email or userName already exists");
  }

  const user = await User.create({
    fullName,
    email,
    password,
    mobileNumber,
    role: "admin",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new apiError(500, "Somethings went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "User created successfully"));
});

// *-----login controller ----*
const loginUser = asyncHandler(async (req, res) => {
  const { mobileNumber, email, password } = req.body;

  if (!(mobileNumber || email)) {
    throw new apiError(400, "mobile or email is required");
  }

  const user = await User.findOne({ $or: [{ mobileNumber }, { email }] });

  if (!user) {
    throw new apiError(400, "User is not register");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new apiError(401, "invalid user Credentials");
  }

  const { refreshToken, accessToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const loggedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new apiResponse(
        200,
        {
          user: loggedUser,
          accessToken,
          refreshToken,
        },
        "User logged In successfully"
      )
    );
});

// *-----logout controller------*
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, //this remove the felid from the document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res, next) => {
  const incomingRefreshToken = req.cookie || req.body;
  if (!incomingRefreshToken) {
    throw new apiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);

    if (!user) {
      throw new apiError(401, "invalid refresh token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new apiError(401, "Refresh token is expired or used");
    }

    const option = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, option)
      .cookie("refreshToken", newRefreshToken, option)
      .json(
        new apiError(
          200,
          { accessToken, refreshAccessToken: newRefreshToken },
          "AccessToken Token Refreshed"
        )
      );
  } catch (error) {
    throw new apiError(500, error?.message || "Invalid refresh token");
  }
});

const forgetPasswordUser = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new apiError(401, "Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new apiError(401, "User is not found");
  }

  // Generate a unique reset token and set expiry
  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

  // Update user with reset token and expiry
  user.resetToken = resetToken;
  user.resetTokenExpiry = resetTokenExpiry;
  await user.save();

  const transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "hank29@ethereal.email",
      pass: "FrTHXFuX8G9M5Sqfn3",
    },
  });

  const resetLink = `http://localhost:8000/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: "hank29@ethereal.email",
    to: email,
    subject: "Password Reset",
    text: `Click the link to reset your password: ${resetLink} `,
  };
  try {
    const messageResponse = await transporter.sendMail(mailOptions);
    res.json(new apiResponse(200, messageResponse, "Reset password message is sent"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending reset email." });
  }
});

export { registerUser, loginUser, logoutUser, forgetPasswordUser };
