import express from "express";
import { listAdmins, createAdmin, getAdmin, updateAdmin, deleteAdmin } from "../controllers/admins.js";

const router = express.Router();

router.get("/", listAdmins);
router.post("/", createAdmin);
router.get("/:id", getAdmin);
router.patch("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

export default router;

