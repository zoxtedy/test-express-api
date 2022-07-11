import { v4 as uuid } from 'uuid';

let users = [];

export const getUsers = (req, res) => {
    console.log(`Users in the database: ${users}`);

    res.send(users);
}

export const createUser = (req, res) => {   
    const user = req.body;
    let status;
    let message;
    datavalidation: if ("age" in user && "username" in user){
        if (user.age<17) {
			status = 400;
			message = "User is too young. ";
			break datavalidation;
        };
		if (user.age>70) {
            status = 400;
            message = "User is too old. ";
			break datavalidation;
        };
        if(user.username.length>25){
			status = 400;
			message = "Username is too long.";
			break datavalidation;
        }; 
        
        if (users.length>10){
        	status = 400;
		message = "There can be maximum 10 users.";
			break datavalidation;
		};
		users.push(
            {
                user:user.username,
                age:user.age,
                id: uuid()
            });
		status =200;
		message= "User " + user.username + " is created successfully";	
	}else{
        status = 400;
        res.status(400).send("Username and age are required fields.");
    };
    
    res.status(status).send(message);
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
