import express from "express";
import bodyParser from "body-parser";

import usersRoutes from "./routes/users.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use("/users", usersRoutes);
app.get("/", (req, res) => res.send("Welcome to the Users API! \n Endpoints: \n GET /users , \n POST /users, \n GET /users/:id"));
app.all("*", (req, res) =>res.status(404).send("You've tried reaching a route that doesn't exist."));

//.listen(process.env.PORT || 5000)

app.listen(process.env.PORT || 5000); //.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));
