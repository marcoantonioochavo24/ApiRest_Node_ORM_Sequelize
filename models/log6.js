import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Log6 = sequelize.define(
  "Log6",
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
    tableName: "log6",
    timestamps: false
  }
);
