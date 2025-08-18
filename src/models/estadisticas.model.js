
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const EstadisticasModel = sequelize.define(
  "Estadisticas",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    type_of_user: {
      type: DataTypes.STRING(100),
      defaultValue: false
    },
  },
  {
    timestamps: false,
  }
);
