import { EstadisticasModel } from "../models/estadisticas.model.js";
import { UserModel } from "../models/user.model.js";

// Crear Estadística
export const createEstadisticas = async (req, res) => {
    const { titulo, description, valor, user_id } = req.body;
    try {
        if (!titulo || !description || !valor || !user_id) {
            return res.status(400).json({
                message: "Error: Algunos campos están vacíos.",
                error: "Bad Request",
                statusCode: 400
            });
        }
        if (titulo.length > 100 || description.length > 200) {
            return res.status(400).json({
                message: "Error: Campos demasiado tienen que tener menos de 200 caracteres.",
                error: "Bad Request",
                statusCode: 400
            });
        }
        // Verificar usuario
        const userExists = await UserModel.findByPk(user_id);
        if (!userExists) {
            return res.status(404).json({
                message: "Error: Usuario no encontrado.",
                error: "Not Found",
                statusCode: 404
            });
        }
        const newEstadistica = await EstadisticasModel.create({
            titulo,
            description,
            valor,
            user_id
        });
        res.status(201).json(newEstadistica);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las estadísticas con el usuario
export const getAllEstadisticas = async (req, res) => {
    try {
        const estadisticas = await EstadisticasModel.findAll({
            include: [
                {
                    model: UserModel,
                    as: "author",
                    attributes: ["id", "name", "email"]
                }
            ]
        });
        res.status(200).json(estadisticas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener estadística por ID
export const getEstadisticasByID = async (req, res) => {
    const estadisticaID = parseInt(req.params.id);
    if (isNaN(estadisticaID)) {
        return res.status(400).json({
            message: "Error: El ID debe ser un número.",
            error: "Bad Request",
            statusCode: 400
        });
    }
    try {
        const estadistica = await EstadisticasModel.findByPk(estadisticaID, {
            include: [
                {
                    model: UserModel,
                    as: "author",
                    attributes: ["id", "name", "email"]
                }
            ]
        });
        if (!estadistica) {
            return res.status(404).json({
                message: "Error: Estadística no encontrada.",
                error: "Not Found",
                statusCode: 404
            });
        }
        res.status(200).json(estadistica);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar estadística
export const updateEstadisticas = async (req, res) => {
    const estadisticaID = parseInt(req.params.id);
    const { titulo, descripcion, valor } = req.body;
    if (isNaN(estadisticaID)) {
        return res.status(400).json({
            message: "Error: El ID debe ser un número.",
            error: "Bad Request",
            statusCode: 400
        });
    }
    if (titulo && titulo.length > 100) {
        return res.status(400).json({
            message: "Error: Título demasiado largo.",
            error: "Bad Request",
            statusCode: 400
        });
    }
    if (descripcion && descripcion.length > 255) {
        return res.status(400).json({
            message: "Error: Descripción demasiado larga.",
            error: "Bad Request",
            statusCode: 400
        });
    }
    try {
        const estadistica = await EstadisticasModel.findByPk(estadisticaID);
        if (!estadistica) {
            return res.status(404).json({
                message: "Error: Estadística no encontrada.",
                error: "Not Found",
                statusCode: 404
            });
        }
        await estadistica.update({ titulo, descripcion, valor });
        res.status(200).json("Estadística actualizada correctamente.");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar estadística
export const deleteEstadisticas = async (req, res) => {
    const estadisticaID = parseInt(req.params.id);
    if (isNaN(estadisticaID)) {
        return res.status(400).json({
            message: "Error: El ID debe ser un número.",
            error: "Bad Request",
            statusCode: 400
        });
    }
    try {
        const estadistica = await EstadisticasModel.findByPk(estadisticaID);
        if (!estadistica) {
            return res.status(404).json({
                message: "Error: Estadística no encontrada.",
                error: "Not Found",
                statusCode: 404
            });
        }
        await estadistica.destroy();
        res.status(200).json("Estadística eliminada correctamente.");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
