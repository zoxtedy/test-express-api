import { v4 as uuid } from 'uuid';

let users = [];

export const getUsers = (req, res) => {
    console.log(`Users in the database: ${users}`);

    res.send(users);
}

export const createUser = (req, res) => {   
    const user = req.body;
    let message;
    if ("age" in user){
        if (user.age<17) {
            console.log("User is too young.");
            res.status(400).send("User is too young.");
        }else if (user.age>70) {
            console.log("User is too old.");
            res.status(400).send("User is too old.");
        }
    }else {
            res.status(400).send("User age is a required field.");
    }
    
    if ("username" in user && user.username.length>0){
        if(user.username.length>25){
            console.log("Username is too long.");
            res.status(400).send("Username is too long.");
        }
    }else{
        res.status(400).send("Username is a required field.");
            

        
    users.push(
        {
            user.username,
            user.age,
            id: uuid()
        }
);
    
    console.log(`User [${user.username}] added to the database.`);
    res.status(201).send("User " + user.username + " is created with id:" + user.id)
    

};

export const getUser = (req, res) => {
    res.send(req.params.id)
};

export const deleteUser = (req, res) => { 
    console.log(`user with id ${req.params.id} has been deleted`);
    
    users = users.filter((user) => user.id !== req.params.id);
    res.status(204).send("User" + req.params.id + "is deleted")
};

export const updateUser =  (req,res) => {
    const user = users.find((user) => user.id === req.params.id);
    
    user.username = req.body.username;
    user.age = req.body.age;

    console.log(`username has been updated to ${req.body.username}.age has been updated to ${req.body.age}`)
};
