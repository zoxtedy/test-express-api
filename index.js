import express from "express";
import bodyParser from "body-parser";

import usersRoutes from "./routes/users.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use("/users", usersRoutes);
app.get("/", (req, res) => res.send("Welcome to the Users API! <br>Endpoints:<br>  GET /users<br>  POST /users<br>    name: string<br>    dob: date<br>    role: \"SECURITY\",\"MANAGER\",\"WORKER\"<br>    active: bulean<br>    GET /users/:id<br>  PATCH /users/:id<br>    role: \"SECURITY\",\"MANAGER\",\"WORKER\"<br>    active: bulean<br>  DELETE /users/:id"));
app.all("*", (req, res) =>res.status(404).send("You've tried reaching a route that doesn't exist."));

//.listen(process.env.PORT || 5000)

app.listen(process.env.PORT || 5000); // Adapted for heroku. Old line kept in this comment >>listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));
