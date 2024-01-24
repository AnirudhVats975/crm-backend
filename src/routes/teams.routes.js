import { Router } from "express";
import {
  officialDetails,
  personalDetails,
} from "../controllers/teams.controllers.js";

const router = Router();

router.route("/addPersonalDetails").post(personalDetails);
router.route("/addOfficialDetails").post(officialDetails);

export default router;
