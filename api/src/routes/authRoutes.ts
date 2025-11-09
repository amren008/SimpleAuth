import express from "express";
import { getMe, login, logout, signup } from "../controllers/authController";
import { authMiddleware } from "../middleware/auth";
import { validateLogin, validateSignup } from "../middleware/validation";

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);

export default router;
