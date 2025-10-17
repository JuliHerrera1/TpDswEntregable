const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Rutina = require("./Rutina");
const Cliente = sequelize.define(
  "Cliente",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre no puede estar sin completar" },
        len: {
          args: [2, 100],
          msg: "El nombre debe tener entre 2 y 25 caracteres",
        },
      },
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El apellido no puede estar sin completar" },
      },
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: { isDate: { msg: "La fecha debe tener un formato válido" } },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: { isEmail: { msg: "Debe ser un correo electronico válido" } },
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        len: {
          args: [6, 20],
          msg: "El telefono debe tener entre 6 y 20 caracteres",
        },
      },
    },
    rutinaId: { type: DataTypes.INTEGER, allowNull: true },
  },
  { tableName: "clientes", timestamps: false }
);

Cliente.belongsTo(Rutina, { foreignKey: "rutinaId", as: "rutina" });
module.exports = Cliente;
