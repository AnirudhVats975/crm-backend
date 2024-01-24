import { Router } from "express";
import { personalDetails } from "../controllers/teams.controllers.js";

const router = Router();

router.route("/userPersonalDetails").post(personalDetails);

export default router;
