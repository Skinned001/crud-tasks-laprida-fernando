import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';
import { UserModel } from "./user.model.js";

export const TaskModel = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  is_complete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
},
  {
    timestamps: false,
    // createdAt: created_at,
  }
);

// RELACIONES UNO A MUCHOS
TaskModel.belongsTo(UserModel, { foreignKey: "user_id", as: "author" });

UserModel.hasMany(TaskModel, { foreignKey: "user_id" });