import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { toDefaultValue } from "sequelize/lib/utils";

export const ComprasModel = sequelize.define("Compras", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  monto: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  is_paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },

},
  {
    timestamps: false,
  }
);