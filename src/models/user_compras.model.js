import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { RoleModel } from "./compras.model.js";
import { UserComprasModel } from "./user.model.js";

export const UserComprasModel = sequelize.define(
  "User_Compras",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

//RELACIONES
UserModel.belongsToMany(RoleModel, {
  through: UserRoleModel,
  foreignKey: "user_id",
  as: "roles",
});

RoleModel.belongsToMany(UserModel, {
  through: UserRoleModel,
  foreignKey: "role_id",
  as: "users",
});