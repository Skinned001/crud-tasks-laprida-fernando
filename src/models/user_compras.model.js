import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { CompraModel } from "./compra.model.js";
import { UserModel } from "./user.model.js";

export const UserCompraModel = sequelize.define("User_Compra",  {
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
UserModel.belongsToMany(CompraModel, {
  through: UserCompraModel,
  foreignKey: "user_id",
  as: "compras",
});

CompraModel.belongsToMany(UserModel, {
  through: UserCompraModel,
  foreignKey: "compra_id",
  as: "users",
});