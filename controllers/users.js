import moment from 'moment'
import { v4 as uuid } from 'uuid';

let users = [];
export const getUsers = (req, res) => {
    res.send(users);
}

export const createUser = (req, res) => {   
    const user = req.body;
    if (!user.name) {
        res.status(400).send("name is a required parameter");
    } else if (user.name.length<3 && user.name.length>50) {
        res.status(400).send("name should be between 3 and 50 characters");
    } else if (!user.dob) {
        res.status(400).send("Birthaday is a required parameter");
    } else if (!moment(user.dob, "DD/MM/YYYY", true).isValid()) {
        res.status(400).send("dob must be in format DD/MM/YYYY");
    } else if (user.dob > "11/11/2000") {
        res.status(400).send("dob must be in format DD/MM/YYYY");
    } else if (!["MANAGER", "WORKER", "SECURITY"].includes(user.role)) {
        res.status(500).send("Invalid role: " + user.role);
    } else if (!user.active) {
        res.status(400).send("You can only create active users");
    } else if (users.length>=10) {
        res.status(400).send("Maximum nuber of users is 10!");
    }else {
        users.push({
            name: user.name,
            dob: user.dob,
            role: user.role,
            active: user.active,
            id: uuid()
        });

        res.status(201).send(JSON.stringify(users[users.length - 1],null,2));
    }
};

export const getUser = (req, res) => {
    res.send(req.params.id)
};

export const deleteUser = (req, res) => { 
    try{
        console.log("user with id ${req.params.id} has been deleted");
        users = users.filter((user) => user.id !== req.params.id);
        res.status(204).send("User" + req.params.id + "is deleted")
    }catch (err) {
        res.status(500).send("Error trying to delete the user")
    }
};

export const updateUser =  (req,res) => {
    try {
        const user = users.find((user) => user.id === req.params.id);
         
        if (!["MANAGER", "WORKER", "SECURITY"].includes(user.role)) {
            res.status(400).send("Invalid role: " + user.role);
        } else {
            user.dob = req.body.role;
            user.dob = req.body.active;

            res.status(200).send("User " + user.name + " is updated to role: " + user.role + " and actiive set to " + user.active)
        }
    } catch (err) {
        res.status(400).send("Error trying to update the user")
    }
};
