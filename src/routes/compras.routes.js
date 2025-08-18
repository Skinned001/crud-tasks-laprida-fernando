import { Router } from 'express';
import {
    createCompras,
    getAllCompras,
    getComprassByID,
} from '../controllers/compras.controller.js';

const routerCompras = Router();

routerCompras.post('/compras', createCompras);
routerCompras.get('/compras', getAllCompras);
routerCompras.get('/compras/:id', getComprassByID);

export default routerCompras;