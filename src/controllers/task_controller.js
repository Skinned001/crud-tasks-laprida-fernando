import { Task } from "../models/task_model.js";


//Encontrar todas las tareas
export const getAllTasks = async (req, res) => {
    const getAll = await Task.findAll();
    res.json(getAll)
    };

//Crear una tarea 
export const createTasks = async (req, res) => {
    const { title, description, isComplete } = req.body
    try {
        const checkIfTitleExists = await Task.findOne({ where: { title: title } })
        if (checkIfTitleExists) {
            return res.status(400).json({
                message: "Error: Esa tarea ya existe",
                error: "Bad request",
                statusCode: 400
            })
        }
        const titleLength = await title.length
        const descriptionLength = await description.length
        if (titleLength > 100 || descriptionLength > 100) {
            return res.status(400).json({
                message: "Error: Hay atributos que superan los 100 caracteres",
                error: "Bad request",
                statusCode: 400
            })
        }
        if (!title || !description) {
            return res.status(400).json({
                message: "Error: Algunos campos están vacíos.",
                error: "Bad request",
                statusCode: 400
            })
        }
        if (typeof isComplete !== "boolean") {
            return res.status(400).json({
                message: "Error: isComplete debe ser booleano.",
                error: "Bad request",
                statusCode: 400
            })
        }
        const createNewTask = await Task.create(req.body)
        res.status(200).json(createNewTask)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Traer tarea por ID
export const getTasksByID = async (req, res) => {
    const taskID = parseInt(req.params.id)
    try {
        if (isNaN(taskID)) {
            return res.status(400).json({
                message: "Error: El ID debe ser un número.",
                error: "Bad Request",
                statusCode: 400
            })
        }

        const findID = await Task.findByPk(taskID)

        if (!findID) {
            return res.status(404).json({
                message: "Error: Ese ID no se ha encontrado",
                error: "Not found",
                statusCode: 404
            })
        }
        res.status(200).json(findID)
    } catch (error) {
        return res.status(500).json("Error al encontrar el ID")
    }

}
//Actualizar Tarea
export const updateTasks = async (req, res) => {
    const taskID = parseInt(req.params.id)
    const { title, description, isComplete } = req.body
    const titleLength = await title.length
    const descriptionLength = await description.length
    if (titleLength > 100 || descriptionLength > 100) {
        return res.status(400).json({
            message: "Error: Hay atributos que superan los 100 caracteres",
            error: "Bad request",
            statusCode: 400
        })
    }
    if (isNaN(taskID)) {
        return res.status(400).json({
            message: "Error: El ID debe ser un número.",
            error: "Bad Request",
            statusCode: 400
        })
    } 
    if (!title && !description) {
        return res.status(400).json({
            message: "Error: Algunos campos están vacíos.",
            error: "Bad request",
            statusCode: 400
        })
    }
    try {
        const findID = await Task.findByPk(taskID)
        if (!findID) {
            return res.status(404).json({
                message: "Error: Ese ID no existe.",
                error: "Bad request",
                statusCode: 404
            })
        }
        if (isComplete !== (true || false)) {
            return res.status(400).json({
                message: "Error: isComplete debe ser booleano.",
                error: "Bad request",
                statusCode: 400
            })
        }
        const checkIfTitleExists = await Task.findOne({ where: { title: title } })
        if (checkIfTitleExists) {
            return res.status(400).json({
                message: "Error: Esa tarea ya existe",
                error: "Bad request",
                statusCode: 400
            })
        }
        await findID.update({ title, description, isComplete })
        res.status(200).json("Datos actualizados")
    } catch (error) {
        return res.status(500).json({
            message: "Error: Error al actualizar los datos.",
            error: "Internal server error",
            statusCode: 500
        })
    }
}

//Eliminar una Tarea
export const deleteTasks = async (req, res) => {
    const taskID = parseInt(req.params.id)
    if (isNaN(taskID)) {
        return res.status(400).json({
            message: "Error: El ID debe ser un número.",
            error: "Bad Request",
            statusCode: 400
        })
    }
    try {
        const findID = await Task.findByPk(taskID)
        if (!findID) {
            return res.status(404).json({
                message: "Error: Ese ID no existe.",
                error: "Bad request",
                statusCode: 404
            })
        }
        const deleteData = await findID.destroy()
        res.status(200).json("Tarea eliminada.")
    } catch (error) {
        return res.status(500).json({
            message: "Error: Error al eliminar la tarea.",
            error: "Internal server error",
            statusCode: 500
        })
    }
}