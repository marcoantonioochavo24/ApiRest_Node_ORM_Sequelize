import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Log9 = sequelize.define(
  "Log9",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    mensaje: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "log9",
    timestamps: false
  }
);
