import { CompraModel } from "../models/compra.model.js";

// Obtener todas las compras
export const getAllCompras = async (req, res) => {
    try {
        const compras = await CompraModel.findAll();
        res.status(200).json(compras);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear una nueva compra
export const createCompra = async (req, res) => {
    const { monto, tipo, is_paid } = req.body;
    try {
        // Validaciones
        if (!monto || !tipo) {
            return res.status(400).json({
                message: "Error: Algunos campos están vacíos.",
                error: "Bad request",
                statusCode: 400
            });
        }
        if (monto.length > 100 || tipo.length > 50) {
            return res.status(400).json({
                message: "Error: Los atributos superan los límites permitidos.",
                error: "Bad request",
                statusCode: 400
            });
        }
        if (is_paid !== undefined && typeof is_paid !== "boolean") {
            return res.status(400).json({
                message: "Error: is_paid debe ser booleano.",
                error: "Bad request",
                statusCode: 400
            });
        }
        const newCompra = await CompraModel.create({
            monto,
            tipo,
            is_paid
        });
        res.status(201).json(newCompra);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener compra por ID
export const getComprassByID = async (req, res) => {
    const compraID = parseInt(req.params.id);
    if (isNaN(compraID)) {
        return res.status(400).json({
            message: "Error: El ID debe ser un número.",
            error: "Bad Request",
            statusCode: 400
        });
    }
    try {
        const compra = await CompraModel.findByPk(compraID);
        if (!compra) {
            return res.status(404).json({
                message: "Error: Compra no encontrada.",
                error: "Not Found",
                statusCode: 404
            });
        }
        res.status(200).json(compra);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar compra
export const updateCompras = async (req, res) => {
    const compraID = parseInt(req.params.id);
    const { monto, tipo, is_paid } = req.body;
    if (isNaN(compraID)) {
        return res.status(400).json({
            message: "Error: El ID debe ser un número.",
            error: "Bad Request",
            statusCode: 400
        });
    }
    try {
        const compra = await CompraModel.findByPk(compraID);
        if (!compra) {
            return res.status(404).json({
                message: "Error: Registro de compra no encontrada.",
                error: "Not Found",
                statusCode: 404
            });
        }
        if (monto && monto.length > 100) {
            return res.status(400).json({
                message: "Error: monto supera los 100 caracteres",
                error: "Bad Request",
                statusCode: 400
            });
        }
        if (tipo && tipo.length > 50) {
            return res.status(400).json({
                message: "Error: tipo supera los 50 caracteres",
                error: "Bad Request",
                statusCode: 400
            });
        }
        if (is_paid !== undefined && typeof is_paid !== "boolean") {
            return res.status(400).json({
                message: "Error: is_paid debe ser booleano",
                error: "Bad Request",
                statusCode: 400
            });
        }
        await compra.update({
            monto: monto ?? compra.monto,
            tipo: tipo ?? compra.tipo,
            is_paid: is_paid ?? compra.is_paid
        });

        res.status(200).json(compra);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar compra
export const deleteCompra = async (req, res) => {
    const compraID = parseInt(req.params.id);

    if (isNaN(compraID)) {
        return res.status(400).json({
            message: "Error: El ID debe ser un número.",
            error: "Bad Request",
            statusCode: 400
        });
    }

    try {
        const compra = await CompraModel.findByPk(compraID);
        if (!compra) {
            return res.status(404).json({
                message: "Error: Compra no encontrada.",
                error: "Not Found",
                statusCode: 404
            });
        }

        await compra.destroy();
        res.status(200).json({ message: "Compra eliminada correctamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
