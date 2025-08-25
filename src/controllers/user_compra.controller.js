import { UserModel } from "../models/user.model.js";
import { CompraModel } from "../models/compra.model.js";
import { UserCompraModel } from "../models/user_compras.model.js";

// Crear relación usuario-compra
export const createUserCompra = async (req, res) => {
  const { user_id, compra_id } = req.body;

  try {
    if (!user_id || !compra_id) {
      return res.status(400).json({
        message: "Error: user_id y compra_id son requeridos",
        error: "Bad Request",
        statusCode: 400,
      });
    }

    // Verificar que existen
    const user = await UserModel.findByPk(user_id);
    const compra = await CompraModel.findByPk(compra_id);

    if (!user || !compra) {
      return res.status(404).json({
        message: "Error: Usuario o Compra no encontrados",
        error: "Not Found",
        statusCode: 404,
      });
    }

    // Crear relación
    const relation = await UserCompraModel.create({ user_id, compra_id });
    res.status(201).json(relation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las compras de un usuario
export const getComprasByUser = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const user = await UserModel.findByPk(userId, {
      include: {
        model: CompraModel,
        as: "compras",
        through: { attributes: [] }, // ocultamos tabla intermedia
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Error: Usuario no encontrado",
        error: "Not Found",
        statusCode: 404,
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los usuarios de una compra
export const getUsersByCompra = async (req, res) => {
  const compraId = parseInt(req.params.id);

  try {
    const compra = await CompraModel.findByPk(compraId, {
      include: {
        model: UserModel,
        as: "users",
        through: { attributes: [] },
      },
    });

    if (!compra) {
      return res.status(404).json({
        message: "Error: Compra no encontrada",
        error: "Not Found",
        statusCode: 404,
      });
    }

    res.status(200).json(compra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar relación usuario-compra
export const deleteUserCompra = async (req, res) => {
  const { user_id, compra_id } = req.body;

  try {
    const relation = await UserCompraModel.findOne({
      where: { user_id, compra_id },
    });

    if (!relation) {
      return res.status(404).json({
        message: "Error: Relación no encontrada",
        error: "Not Found",
        statusCode: 404,
      });
    }

    await relation.destroy();
    res.status(200).json("Relación eliminada correctamente.");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
