import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { EstadisticasModel } from "./estadisticas.model.js";


export const UserModel = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// RELACIONES UNO A UNO
UserModel.belongsTo(EstadisticasModel, { foreignKey: "estadisticas_id", as: "estadisticas" });

EstadisticasModel.hasOne(UserModel, { foreignKey: "estadisticas_id" });