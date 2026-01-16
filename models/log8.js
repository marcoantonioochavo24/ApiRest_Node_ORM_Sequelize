import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Log8 = sequelize.define(
  "Log8",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    texto: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "log8",
    timestamps: false
  }
);
