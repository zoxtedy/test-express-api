import express from "express";
import bodyParser from "body-parser";

import usersRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use("/users", usersRoutes);
app.use("/admin", adminRoutes);
app.get("/", (req, res) => res.send("<!DOCTYPE html><html><body><h1>Welcome to the Users API!</h1><h2>Endpoints:</h2><ul><li>GET /users<li>POST /users<ul><li>name: string<li>dob: date<li>role: \"SECURITY\",\"MANAGER\",\"WORKER\"<li>active: boolean</ul><li>GET /users/:id<li>PATCH /users/:id<ul><li>role: \"SECURITY\",\"MANAGER\",\"WORKER\"<li>active: boolean</ul><li>DELETE /users/:id</body></html>"));
app.all("*", (req, res) =>res.status(404).send("You've tried reaching a route that doesn't exist."));

//.listen(process.env.PORT || 5000)

app.listen(process.env.PORT || 5000); // Adapted for heroku. Old line kept in this comment >>listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));
