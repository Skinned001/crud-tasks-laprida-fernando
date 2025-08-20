import { Router } from 'express';
import {
    createUser,
    getAllUsersWithTasks,
    getUserByID,
    updateUser,
    deleteUser,
} from '../controllers/user_controller.js';

const routerUser = Router();

routerUser.post('/users', createUser);
routerUser.get('/users', getAllUsersWithTasks);
routerUser.get('/users/:id', getUserByID);
routerUser.put('/users/:id', updateUser);
routerUser.delete('/users/:id', deleteUser);

export default routerUser;