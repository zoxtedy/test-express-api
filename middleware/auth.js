import jwt from "jsonwebtoken";

const SECRET = "qa-admin-secret"; // simple shared secret for exercise purposes

export const issueToken = (payload) =>
    jwt.sign(payload, SECRET, { expiresIn: "1h" });

export const authenticateBearer = (req, res, next) => {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ error: "Missing or invalid Authorization header" });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.admin = { id: decoded.id, username: decoded.username, name: decoded.name };
        return next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

