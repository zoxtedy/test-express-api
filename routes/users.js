import express from 'express';

import { getUsers, createUser, getUser, deleteUser, updateUser } from '../controllers/users.js';
import { authenticateBearer } from "../middleware/auth.js";

const router = express.Router();

router.use(authenticateBearer);

router.get('/', getUsers);

router.post('/', createUser);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

export default router;
