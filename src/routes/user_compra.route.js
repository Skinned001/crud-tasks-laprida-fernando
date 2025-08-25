import { Router } from "express";
import {
  createUserCompra,
  getComprasByUser,
  getUsersByCompra,
  deleteUserCompra,
} from "../controllers/user_compra.controller.js";

const routerUserCompra = Router();

routerUserCompra.post("/", createUserCompra);           // Asignar compra a usuario
routerUserCompra.get("/user/:id", getComprasByUser);    // Ver compras de un usuario
routerUserCompra.get("/compra/:id", getUsersByCompra);  // Ver usuarios de una compra
routerUserCompra.delete("/", deleteUserCompra);         // Eliminar relación

export default routerUserCompra;
