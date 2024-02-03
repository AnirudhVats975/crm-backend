import { Router } from "express";
import {
  bankDetails,
  documentsDetails,
  getAllUser,
  leaveDetails,
  officialDetails,
  personalDetails,
  salaryDetails,
} from "../controllers/teams.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/addPersonalDetails").post(personalDetails);
router.route("/addOfficialDetails").post(officialDetails);
router.route("/addBackDetails").post(bankDetails);
router.route("/addDocuments").post(
  upload.fields([
    { name: "adhaarCard", maxCount: 1 },
    { name: "PANCard", maxCount: 1 },
    { name: "passport", maxCount: 1 },
    { name: "medicalCard", maxCount: 1 },
    { name: "voterIDCard", maxCount: 1 },
    { name: "otherDocument", maxCount: 1 },
  ]),
  documentsDetails
);
router.route("/addLeaveDetails").post(leaveDetails);
router.route("/addSalaryDetails").post(salaryDetails);
router.route("/getAllUser").post(getAllUser);

export default router;
