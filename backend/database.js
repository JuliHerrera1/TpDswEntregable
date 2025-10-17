const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("gimnasio", "root", "Juli_66.", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00", //par ajustar zona horaria> solucion problemas con listado
  dialectOptions: { dateStrings: true, typeCast: true },
  port: 3307,
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("Conectado a MySQL usando Sequelize"))
  .catch((err) => console.error("Hubo un error de conexion:", err));

module.exports = sequelize;
