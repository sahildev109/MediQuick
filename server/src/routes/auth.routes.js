import express from "express";
import { completeProfile, googleAuth, login, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleAuth);
router.put("/complete-profile", completeProfile);


export default router;
