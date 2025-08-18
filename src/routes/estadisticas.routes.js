import { Router } from 'express';
import {
    createEstadisticas,
    getAllEstadisticas,
    getEstadisticasByID,
    updateEstadisticas,
    deleteEstadisticas,
} from '../controllers/estadisticas.controller.js';

const routerEstadisticas = Router();

routerEstadisticas.post('/tasks', createTasks);
routerEstadisticas.get('/tasks', getAllTasks);
routerEstadisticas.get('/tasks/:id', getTasksByID);
routerEstadisticas.put('/tasks/:id', updateTasks);
routerEstadisticas.delete('/tasks/:id', deleteTasks);

export default routerEstadisticas;