import express from "express";
import bodyParser from "body-parser";

import usersRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/authenticate.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use("/", authRoutes);
app.use("/users", usersRoutes);
app.use("/admin", adminRoutes);
app.get("/", (req, res) =>
    res.send(
        "<!DOCTYPE html><html><body><h1>Welcome to the Users API!</h1><h2>Endpoints:</h2><ul><li>GET /authenticate?user=&lt;username&gt;&password=&lt;password&gt; (returns Bearer token required for /users)</li><li>GET /users</li><li>POST /users<ul><li>name: string</li><li>dob: date</li><li>role: \"SECURITY\",\"MANAGER\",\"WORKER\"</li><li>active: boolean</li></ul></li><li>GET /users/:id</li><li>PATCH /users/:id<ul><li>role: \"SECURITY\",\"MANAGER\",\"WORKER\"</li><li>active: boolean</li></ul></li><li>DELETE /users/:id</li></ul></body></html>"
    )
);
app.all("*", (req, res) =>res.status(404).send("You've tried reaching a route that doesn't exist."));

//.listen(process.env.PORT || 5000)

app.listen(process.env.PORT || 5000); // Adapted for heroku. Old line kept in this comment >>listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));
