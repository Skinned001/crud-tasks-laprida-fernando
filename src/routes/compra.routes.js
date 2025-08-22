import { Router } from 'express';
import {
    createCompra,
    getAllCompras,
    getComprassByID,
} from '../controllers/compra.controller.js';

const routerCompra = Router();

routerCompra.post('/compra', createCompra);
routerCompra.get('/compra', getAllCompras);
routerCompra.get('/compra/:id', getComprassByID);

export default routerCompra;