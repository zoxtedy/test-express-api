import express from "express";
import bodyParser from "body-parser";

import wakeDyno from "heroku-keep-awake";

import usersRoutes from "./routes/users.js";

const PORT = 5000;
const DYNO_URL = 'https://neon-api-test-task.herokuapp.com'


const app = express();


app.use(bodyParser.json());

const opts = {
    interval: 2,
    logging: true,
    stopTimes: { start: '08:00', end: '20:00' }
}

app.use("/users", usersRoutes);
app.get("/", (req, res) => res.send("<!DOCTYPE html><html><body><h1>Welcome to the Users API!</h1><h2>Endpoints:</h2><ul><li>GET /users<li>POST /users<ul><li>name: string<li>dob: date<li>role: \"SECURITY\",\"MANAGER\",\"WORKER\"<li>active: boolean</ul><li>GET /users/:id<li>PATCH /users/:id<ul><li>role: \"SECURITY\",\"MANAGER\",\"WORKER\"<li>active: boolean</ul><li>DELETE /users/:id</body></html>"));
app.all("*", (req, res) =>res.status(404).send("You've tried reaching a route that doesn't exist."));

//.listen(process.env.PORT || 5000)

app.listen(PORT, () => {
    wakeDyno(DYNO_URL,opts); 
})
