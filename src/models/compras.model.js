import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ComprasModel = sequelize.define(
  "Role",
  {
    rolename: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);