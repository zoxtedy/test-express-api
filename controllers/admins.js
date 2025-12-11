import { v4 as uuid } from "uuid";
import { issueToken } from "../middleware/auth.js";

let admins = [];

export const listAdmins = (req, res) => {
    return res.json(admins);
};

export const createAdmin = (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password) {
        return res.status(400).json({ error: "username and password are required" });
    }

    if (admins.find((a) => a.username === username)) {
        return res.status(409).json({ error: "username already exists" });
    }

    const admin = { id: uuid(), username, password };
    admins.push(admin);
    return res.status(201).json({ id: admin.id, username: admin.username });
};

export const getAdmin = (req, res) => {
    const admin = admins.find((a) => a.id === req.params.id);
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    return res.json({ id: admin.id, username: admin.username });
};

export const updateAdmin = (req, res) => {
    const admin = admins.find((a) => a.id === req.params.id);
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    if (req.body?.password) admin.password = req.body.password;
    if (req.body?.username) admin.username = req.body.username;

    return res.json({ id: admin.id, username: admin.username });
};

export const deleteAdmin = (req, res) => {
    const exists = admins.some((a) => a.id === req.params.id);
    admins = admins.filter((a) => a.id !== req.params.id);
    if (!exists) return res.status(404).json({ error: "Admin not found" });
    return res.sendStatus(204);
};

export const authenticate = (req, res) => {
    const { user, password } = req.query;
    const admin = admins.find((a) => a.username === user && a.password === password);
    if (!admin) return res.status(401).json({ error: "Invalid credentials" });

    const token = issueToken({ id: admin.id, username: admin.username });
    return res.json({ token: `Bearer ${token}` });
};

