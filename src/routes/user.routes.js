import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  forgetPasswordUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/forgot-password").post(forgetPasswordUser);

export default router;
