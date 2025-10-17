const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3007;

app.use(cors());
app.use(express.json());
app.use(express.static("frontend"));

const sequelize = require("./database");

const Cliente = require("./models/Cliente");
const Rutina = require("./models/Rutina");
const Ejercicio = require("./models/Ejercicio");
const Turno = require("./models/Turno");

sequelize
  .authenticate()
  .then(() => console.log("Conectado a MySQL usando Sequelize"))
  .catch((err) => console.error("Error de conexión:", err));

sequelize.sync().then(() => {
  console.log("Modelos sincronizados con la base de datos.");
});

app.get("/clientes", async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      include: [{ model: Rutina, as: "rutina" }],
    });
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/clientes", async (req, res) => {
  try {
    const { nombre, apellido, fecha, email, telefono, rutinaId } = req.body;
    const nuevoCliente = await Cliente.create({
      nombre,
      apellido,
      fecha,
      email,
      telefono,
      rutinaId,
    });
    res.status(201).json({
      mensaje: "Cliente agregado correctamente!",
      id: nuevoCliente.id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/clientes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, apellido, fecha, email, telefono, rutinaId } = req.body;
    const [updated] = await Cliente.update(
      { nombre, apellido, fecha, email, telefono, rutinaId },
      { where: { id } }
    );
    if (!updated)
      return res.status(404).json({ mensaje: "Cliente no encontrado!" });
    res.json({ mensaje: "Cliente actualizado correctamente!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/clientes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Cliente.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).json({ mensaje: "Cliente no encontrado!" });
    res.json({ mensaje: "Cliente eliminado correctamente!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/clientes/:id/rutina", async (req, res) => {
  try {
    const idCli = req.params.id;
    const { idRutina } = req.body;
    const [updated] = await Cliente.update(
      { rutinaId: idRutina },
      { where: { id: idCli } }
    );
    if (!updated)
      return res.status(404).json({ mensaje: "Cliente no encontrado!" });
    res.json({ mensaje: "Rutina asignada correctamente!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/rutinas", async (req, res) => {
  try {
    const rutinas = await Rutina.findAll();
    res.json(rutinas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/rutinas/:id/ejercicios", async (req, res) => {
  try {
    const idRutina = req.params.id;
    const ejercicios = await Ejercicio.findAll({
      where: { rutinaId: idRutina },
    });
    res.json(ejercicios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/turnos", async (req, res) => {
  try {
    const turnos = await Turno.findAll({
      include: [
        { model: Cliente, as: "cliente" },
        { model: Rutina, as: "rutina" },
      ],
    });
    res.json(turnos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/turnos", async (req, res) => {
  try {
    const { cliente_id, rutina_id, dia, hora, cupos, estado } = req.body;
    const nuevoTurno = await Turno.create({
      cliente_id: cliente_id || null,
      rutina_id: rutina_id || null,
      dia,
      hora,
      cupos,
      estado: estado || "pendiente",
    });
    res
      .status(201)
      .json({ mensaje: "Turno creado correctamente", id: nuevoTurno.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/turnos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { cliente_id, rutina_id, dia, hora, cupos, estado } = req.body;
    const [updated] = await Turno.update(
      { cliente_id, rutina_id, dia, hora, cupos, estado },
      { where: { id } }
    );
    if (!updated)
      return res.status(404).json({ mensaje: "Turno no encontrado" });
    res.json({ mensaje: "Turno actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/turnos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Turno.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).json({ mensaje: "Turno no encontrado" });
    res.json({ mensaje: "Turno eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
