import { Router } from 'express';
import {
    createTasks,
	getAllTasksWithUser,
	getTaskByIdWithUser,
	updateTasks,
	deleteTasks,
} from '../controllers/task_controller.js';

const routerTask = Router();

routerTask.post('/tasks', createTasks);
routerTask.get('/tasks', getAllTasksWithUser);
routerTask.get('/tasks/:id', getTaskByIdWithUser);
routerTask.put('/tasks/:id', updateTasks);
routerTask.delete('/tasks/:id', deleteTasks);

export default routerTask;