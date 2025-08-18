import { Router } from 'express';
import {
    createTasks,
	getAllTasks,
	getTasksByID,
	updateTasks,
	deleteTasks,
} from '../controllers/task_controller.js';

const routerTask = Router();

routerTask.post('/tasks', createTasks);
routerTask.get('/tasks', getAllTasks);
routerTask.get('/tasks/:id', getTasksByID);
routerTask.put('/tasks/:id', updateTasks);
routerTask.delete('/tasks/:id', deleteTasks);

export default routerTask;