import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

export const Task = sequelize.define('Task', {
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
  isComplete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});
