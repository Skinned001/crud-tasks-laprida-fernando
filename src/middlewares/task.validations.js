import { body, param } from "express-validator";
import { TaskModel } from "../models/task.model.js";

export const createTaskValidation = [
    body("id")
        .isInt({ min: 1 })
        .withMessage("ID debe ser un numero entero entero positivo")
        .custom(async (value) => {
            const task = await TaskModel.findByPk(value);
            if (!task) {
                throw new Error("La tarea no existe");
            }
        }),
    body("title")
        .optional()
        .isString()
        .withMessage("El campo no title debe estar vacio")
        .custom(async (value) => {
            const taskExists = await TaskModel.findOne({
                where: { title: value },
            });
            if (taskExists) {
                throw new error("Tarea ya existente");
            }
            return true;
        }),
    body("description")
        .isString()
        .withMessage("El campo description no debe estar vacio"),
    body("is_complete")
        .withMessage("El campo is_complete no debe estar vacio")
        .isBoolean()
        .withMessage("El campo is_complete debe ser booleano"),
    body("user_id")
        .notEmpty()
        .withMessage("user_id no debe estar vacio, asignar a un usuario esta tarea")
        .isInt()
        .withMessage("user_id debe ser un numero entero")
];

export const getTaskByIDValidation = [
    param("id")
        .exists()
        .isInt({ min: 1 })
        .withMessage("El campo ID debe ser un numero")
        .custom(async (value) => {
            const task = await Task.findByPk(value);
            if (!task) {
                throw new Error("La tarea no existe");
            }
        }),
];


export const updateTaskValidation = [
    param("id")
        .isInt()
        .withMessage("El id debe ser un entero")
        .custom(async (value) => {
            const person = await PersonModel.findByPk(value);
            if (!person) {
                throw new Error("La tarea no existe");
            }
        }),
    body("title")
        .optional()
        .isString()
        .withMessage("El campo name debe ser una cadena de caracteres")
        .isLength({ min: 2, max: 100 })
        .withMessage("El titulo debe ser entre 2 y 100 caracteres")
        .custom(async (value, { req }) => {
            const taskExists = await Task.findOne({
                where: { title: value, id: { [Op.ne]: req.params.id } },
            });
            if (taskExists) {
                throw new Error("Ese tarea ya existe");
            }
            return true;
        }),
    body("description")
        .optional()
        .isString()
        .isLength({ min: 2, max: 200 })
        .withMessage("El campo description debe ser de 2 a 200 caracteres"),
    body("is_complete")
        .optional()
        .isBoolean()
        .withMessage("El campo is_complete debe ser booleano"),
    body("user_id")
        .optional()
        .isInt({ min: 1 })
        .withMessage("El campo user_id debe ser un entero"),
];

export const deleteTaskValidation = [
    param("id")
        .exists()
        .isInt({ min: 1 })
        .withMessage("El campo ID debe ser un numero")
        .custom(async (value) => {
            const task = await Task.findByPk(value);
            if (!task) {
                throw new Error("La tarea no existe");
            }
        }),
];