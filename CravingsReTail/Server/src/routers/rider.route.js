import express from "express";
import {
  RiderGetData,
  RiderUpdateProfile,
} from "../controllers/rider.controller.js";
import { RiderAuthProtect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/get-rider-data", RiderAuthProtect, RiderGetData);

router.post("/update-profile", RiderAuthProtect, RiderUpdateProfile);

export default router;
