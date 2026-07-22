import express from "express";
import {
  CustomerGetData,
  CustomerUpdateProfile,
} from "../controllers/customer.controller.js";
import { CustomerAuthProtect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/get-customer-data", CustomerAuthProtect, CustomerGetData);

router.post("/update-profile", CustomerAuthProtect, CustomerUpdateProfile);

export default router;
