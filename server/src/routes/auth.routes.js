import {Router} from "express";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { getMe, loginUser, logoutUser, refreshController, registerUser } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middlewares.js";

const router = Router();

// POST /api/auth/register
router.post("/register", registerValidator, registerUser);

// POST /api/auth/login
router.post("/login", loginValidator, loginUser);

// POST /api/auth/refresh
router.post("/refresh-token", refreshController);

// GET /api/auth/me
router.get("/me", authenticate, getMe);

// POST /api/auth/logout
router.post("/logout", authenticate, logoutUser);

export default router;