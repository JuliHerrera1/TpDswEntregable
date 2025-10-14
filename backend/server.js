const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3007;

app.use(cors());
app.use(express.json());
app.use(express.static("frontend"));

const db = require("./database");

//clientes:
app.get("/clientes", (req, res) => {
  db.query("SELECT * FROM clientes", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/clientes", (req, res) => {
  const { nombre, apellido, fecha, email, telefono } = req.body;
  const sql =
    "INSERT INTO clientes (nombre, apellido, fecha, email, telefono) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [nombre, apellido, fecha, email, telefono], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      mensaje: "Cliente agregado correctamente!",
      id: result.insertId,
    });
  });
});

app.put("/clientes/:id", (req, res) => {
  const id = req.params.id;
  const { nombre, apellido, fecha, email, telefono } = req.body;
  //console.log("PUT recibido:", { id, nombre, apellido, fecha, email, telefono });
  const fechaSQL = fecha ? fecha.split("T")[0] : null;
  //console.log("Actualizando cliente:", id, req.body);
  const sql =
    "UPDATE clientes SET nombre=?, apellido=?, fecha=?, email=?, telefono=? WHERE id=?";
  const valores = [nombre, apellido, fechaSQL, email, telefono, id];
  //console.log("Ejecutando query:", sql, "con valores:", valores);
  db.query(sql, valores, (err, result) => {
    if (err) {
      //console.error("Error en UPDATE:", err.message);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      //console.warn("Cliente no encontrado:", id);
      return res.status(404).json({ mensaje: "Cliente no encontrado!" });
    }
    res.json({ mensaje: "Cliente actualizado correctamente!" });
  });
});
//console los dejo comentados para poder ver los errores y ver en que parte se nos estab rompiendd

app.delete("/clientes/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM clientes WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: "Cliente eliminado correctamente!" });
  });
});

//rutinas:
app.get("/rutinas", (req, res) => {
  const sql = "SELECT * FROM rutinas";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

//ejercicios de rutis:
app.get("/rutinas/:id/ejercicios", (req, res) => {
  const idRutina = req.params.id;
  const sql = "SELECT * FROM ejercicios WHERE rutinaId = ?";
  db.query(sql, [idRutina], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

//asignamos rutinas a clis:
app.put("/clientes/:id/rutina", (req, res) => {
  const idCli = req.params.id;
  const { idRutina } = req.body;
  const sql = "UPDATE clientes SET rutinaId=? WHERE id=?";
  db.query(sql, [idRutina, idCli], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ mensaje: "Cliente no encontrado!" });
    res.json({ mensaje: "Rutina asignada correctamente!" });
  });
});

//turnos:
app.get("/turnos", (req, res) => {
  const sql = "SELECT * FROM turnos";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/turnos", (req, res) => {
  const {
    /*cliente_id, rutina_id, ((agregar abajo dsp tmb, en el insert y db.query))*/ dia,
    hora,
    cupos,
  } = req.body;
  const sql = "INSERT INTO turnos (dia, hora, cupos, estado) VALUES (?,?,?,?)";
  db.query(sql, [dia, hora, cupos, "pendiente"], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res
      .status(201)
      .json({ mensaje: "Turno creado correctamente", id: result.insertId });
  });
});

app.put("/turnos/:id", (req, res) => {
  const id = req.params.id;
  const { cliente_id, rutina_id, dia, hora, cupos, estado } = req.body;
  const sql =
    "UPDATE turnos SET cliente_id=?, rutina_id=?, dia=?, hora=?, cupos=?, estado=? WHERE id=?";
  db.query(
    sql,
    [cliente_id, rutina_id, dia, hora, cupos, estado, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ mensaje: "Turno no encontrado" });
      res.json({ mensaje: "Turno actualizado correctamente" });
    }
  );
});

app.delete("/turnos/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM turnos WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: "Turno eliminado correctamente" });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
