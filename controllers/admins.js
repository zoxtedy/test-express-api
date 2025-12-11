import { v4 as uuid } from "uuid";
import { issueToken } from "../middleware/auth.js";

let admins = [];

export const listAdmins = (req, res) => {
    return res.json(admins.map(({ password, ...rest }) => rest));
};

export const createAdmin = (req, res) => {
    const { username, password, name } = req.body || {};
    if (!username || !password || !name) {
        return res.status(400).json({ error: "username, password, and name are required" });
    }

    if (admins.find((a) => a.username === username)) {
        return res.status(409).json({ error: "username already exists" });
    }

    const admin = { id: uuid(), username, password, name };
    admins.push(admin);
    return res.status(201).json({ id: admin.id, username: admin.username, name: admin.name });
};

export const getAdmin = (req, res) => {
    const admin = admins.find((a) => a.id === req.params.id);
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    return res.json({ id: admin.id, username: admin.username, name: admin.name });
};

export const updateAdmin = (req, res) => {
    const admin = admins.find((a) => a.id === req.params.id);
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    if (req.body?.password) admin.password = req.body.password;
    if (req.body?.username) admin.username = req.body.username;
    if (req.body?.name) admin.name = req.body.name;

    return res.json({ id: admin.id, username: admin.username, name: admin.name });
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

    const token = issueToken({ id: admin.id, username: admin.username, name: admin.name });
    return res.json({ token: `Bearer ${token}` });
};

