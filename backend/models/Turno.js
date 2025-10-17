const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Cliente = require("./Cliente");
const Rutina = require("./Rutina");

const Turno = sequelize.define(
  "Turno",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { isInt: { msg: "Cliente_id debe ser un número entero!" } },
    },
    rutina_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { isInt: { msg: "Rutina_id debe ser un número entero!" } },
    },
    dia: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: { isDate: { msg: "El dia debe ser una fecha válida!" } },
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: true,
      validate: { notEmpty: { msg: "La hora no puede estar vacia!" } },
    },
    cupos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Los cupos deben ser un número entero!" },
        min: { args: [1], msg: "Debe haber al menos 1 cupo!" },
      },
    },
    estado: {
      type: DataTypes.ENUM("pendiente", "confirmado", "cancelado"),
      defaultValue: "pendiente",
      allowNull: false,
      validate: {
        isIn: {
          args: [["pendiente", "confirmado", "cancelado"]],
          msg: "El estado debe ser 'pendiente', 'confirmado' o 'cancelado'!",
        },
      },
    },
  },
  { tableName: "turnos", timestamps: false }
);

Turno.belongsTo(Cliente, { foreignKey: "cliente_id", as: "cliente" });
Turno.belongsTo(Rutina, { foreignKey: "rutina_id", as: "rutina" });
module.exports = Turno;
