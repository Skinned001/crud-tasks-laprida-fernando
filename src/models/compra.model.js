import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
// import { UserCompraModel } from "./user_compras.model.js";

export const CompraModel = sequelize.define("Compra", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  is_paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },

}, {
  timestamps: false,
});

// esto es un hook para que después de crear una compra, insertar en la tabla intermedia
CompraModel.afterCreate(async (compra, options) => {
  await UserCompraModel.create({
    user_id: compra.user_id,
    compra_id: compra.id,
  });
});
