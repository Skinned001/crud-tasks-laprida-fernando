import { Router } from 'express';
import {
    createEstadisticas,
    getAllEstadisticas,
    getEstadisticasByID,
    updateEstadisticas,
    deleteEstadisticas,
} from '../controllers/estadisticas.controller.js';

const routerEstadisticas = Router();

routerEstadisticas.post('/tasks', createEstadisticas);
routerEstadisticas.get('/tasks', getAllEstadisticas);
routerEstadisticas.get('/tasks/:id', getEstadisticasByID);
routerEstadisticas.put('/tasks/:id', updateEstadisticas);
routerEstadisticas.delete('/tasks/:id', deleteEstadisticas);

export default routerEstadisticas;