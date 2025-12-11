import express from "express";
import { authenticate } from "../controllers/admins.js";

const router = express.Router();

router.get("/authenticate", authenticate);

export default router;

