const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Juli_66.",
  database: "gimnasio",
  port: 3307,
});

db.connect((err) => {
  if (err) {
    console.log("Error conectando a DB:", err);
    return;
  }
  console.log("Conectado a MySQL");
});

module.exports = db;
