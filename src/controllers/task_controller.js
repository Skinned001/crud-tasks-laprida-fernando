import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";


// Obtener todas las tareas con el usuario que las creó
export const getAllTasksWithUser = async (req, res) => {
  try {
    const tasks = await TaskModel.findAll({
      include: [
        {
          model: UserModel,
          as: "author", 
          attributes: ["id", 
            "name", 
            "email"] 
        }
      ]
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Crear una tarea
export const createTasks = async (req, res) => {
    const { title, description, is_complete, user_id } = req.body;
    try {
        // Validaciones
        if (!title || !description || !user_id) {
            return res.status(400).json({
                message: "Error: Algunos campos están vacíos.",
                error: "Bad request",
                statusCode: 400
            });
        }

        const checkIfTitleExists = await TaskModel.findOne({ where: { title } });
        if (checkIfTitleExists) {
            return res.status(400).json({
                message: "Error: Esa tarea ya existe",
                error: "Bad request",
                statusCode: 400
            });
        }

        if (title.length > 100 || description.length > 100) {
            return res.status(400).json({
                message: "Error: Hay atributos que superan los 100 caracteres",
                error: "Bad request",
                statusCode: 400
            });
        }

        if (typeof is_complete !== "boolean") {
            return res.status(400).json({
                message: "Error: is_complete debe ser booleano.",
                error: "Bad request",
                statusCode: 400
            });
        }

        // Verificar que el usuario existe
        const userExists = await UserModel.findByPk(user_id);
        if (!userExists) {
            return res.status(404).json({
                message: "Error: Usuario no encontrado.",
                error: "Not Found",
                statusCode: 404
            });
        }

        // Crear la tarea vinculada al usuario
        const createNewTask = await TaskModel.create({
            title,
            description,
            is_complete,
            user_id
        });

        res.status(201).json(createNewTask);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


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

        const findID = await TaskModel.findByPk(taskID)

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
    const { title, description, is_complete } = req.body
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
        const findID = await TaskModel.findByPk(taskID)
        if (!findID) {
            return res.status(404).json({
                message: "Error: Ese ID no existe.",
                error: "Bad request",
                statusCode: 404
            })
        }
        if (is_complete !== (true || false)) {
            return res.status(400).json({
                message: "Error: is_complete debe ser booleano.",
                error: "Bad request",
                statusCode: 400
            })
        }
        const checkIfTitleExists = await TaskModel.findOne({ where: { title: title } })
        if (checkIfTitleExists) {
            return res.status(400).json({
                message: "Error: Esa tarea ya existe",
                error: "Bad request",
                statusCode: 400
            })
        }
        await findID.update({ title, description, is_complete })
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
        const findID = await TaskModel.findByPk(taskID)
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