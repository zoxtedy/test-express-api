import moment from 'moment';
import { v4 as uuid } from 'uuid';

const ROLES = ["MANAGER", "WORKER", "SECURITY"];
const DOB_CUTOFF = moment("11/11/2000", "DD/MM/YYYY");

let users = [];

const findUserById = (id) => users.find((user) => user.id === id);

const validateNewUser = (user) => {
    if (!user?.name) return { status: 400, message: "name is a required parameter" };
    if (user.name.length < 3 || user.name.length > 50) {
        return { status: 400, message: "name should be between 3 and 50 characters" };
    }

    if (!user.dob) return { status: 400, message: "Birthday is a required parameter" };
    const dob = moment(user.dob, "DD/MM/YYYY", true);
    if (!dob.isValid()) return { status: 400, message: "dob must be in format DD/MM/YYYY" };
    if (dob.isAfter(DOB_CUTOFF)) {
        return { status: 400, message: "dob must be on or before 11/11/2000" };
    }

    if (!ROLES.includes(user.role)) return { status: 400, message: `Invalid role: ${user.role}` };
    if (typeof user.active !== "boolean") return { status: 400, message: "active must be a boolean" };
    if (users.length >= 10) return { status: 400, message: "Maximum number of users is 10!" };

    return { status: 201, dob };
};

const validateRoleAndActive = (payload) => {
    if (payload.role !== undefined && !ROLES.includes(payload.role)) {
        return { status: 400, message: `Invalid role: ${payload.role}` };
    }
    if (payload.active !== undefined && typeof payload.active !== "boolean") {
        return { status: 400, message: "active must be a boolean" };
    }
    return null;
};

export const getUsers = (req, res) => {
    res.send(users);
};

export const createUser = (req, res) => {
    const validation = validateNewUser(req.body);
    if (validation.status !== 201) return res.status(validation.status).send(validation.message);

    const userToSave = {
        name: req.body.name,
        dob: validation.dob.format("DD/MM/YYYY"),
        role: req.body.role,
        active: req.body.active,
        id: uuid()
    };

    users.push(userToSave);

    res.type("json");
    return res.status(201).send(JSON.stringify(userToSave, null, 2));
};

export const getUser = (req, res) => {
    const user = findUserById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    return res.json(user);
};

export const deleteUser = (req, res) => {
    try {
        const user = findUserById(req.params.id);
        if (!user) return res.status(404).send("User not found");

        console.log(`user with id ${req.params.id} has been deleted`);
        users = users.filter((u) => u.id !== req.params.id);
        return res.sendStatus(204);
    } catch (err) {
        return res.status(500).send("Error trying to delete the user");
    }
};

export const updateUser = (req, res) => {
    try {
        const user = findUserById(req.params.id);
        if (!user) return res.status(404).send("User not found");

        const validationError = validateRoleAndActive(req.body);
        if (validationError) return res.status(validationError.status).send(validationError.message);

        if (req.body.role !== undefined) user.role = req.body.role;
        if (req.body.active !== undefined) user.active = req.body.active;

        return res
            .status(200)
            .send(`User ${user.name} updated to role: ${user.role} and active set to ${user.active}`);
    } catch (err) {
        return res.status(400).send("Error trying to update the user");
    }
};
