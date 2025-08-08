import { Router } from 'express';
import {
    createTask,
	getAllTasks,
	getTaskByID,
	updateTask,
	deleteTask,
} from '../controllers/task_controller.js';

const routerTask = Router();

routerTask.post('tasks:', createTask);
routerTask.get('/tasks', getAllTasks);
routerTask.get('/tasks/:id', getTaskByID);
routerTask.put('/tasks/:id', updateTask);
routerTask.delete('/tasks/:id', deleteTask);

export default routerTask;