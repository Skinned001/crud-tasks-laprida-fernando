import { Router } from 'express';
import {
    createTask,
	getAllTasks,
	getTaskByID,
	updateTask,
	deleteTask,
} from '../controllers/task_controller.js';

const router = Router();

routerUser.post('task:', createTask);
routerUser.get('/task', getAllTasks);
routerUser.get('/tasks/:id', getTaskByID);
routerUser.put('/tasks/:id', updateTask);
routerUser.delete('/tasks/:id', deleteTask);

export default router;