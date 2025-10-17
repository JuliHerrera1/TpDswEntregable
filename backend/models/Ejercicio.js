const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Rutina = require("./Rutina");
const Ejercicio = sequelize.define(
  "Ejercicio",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    repeticiones: { type: DataTypes.STRING(50), allowNull: true },
    tipo: { type: DataTypes.STRING(50), allowNull: true },
    rutinaId: { type: DataTypes.INTEGER, allowNull: true },
  },
  { tableName: "ejercicios", timestamps: false }
);
Ejercicio.belongsTo(Rutina, { foreignKey: "rutinaId", as: "rutina" });
module.exports = Ejercicio;
