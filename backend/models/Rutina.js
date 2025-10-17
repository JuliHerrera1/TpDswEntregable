const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Rutina = sequelize.define(
  "Rutina",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    nivel: { type: DataTypes.STRING(50), allowNull: true },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
  },
  { tableName: "rutinas", timestamps: false }
);

module.exports = Rutina;
