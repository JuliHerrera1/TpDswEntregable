import { useState, useEffect } from "react";

export default function TurnosForm({
  cambiarVista,
  turnoEdicion,
  setTurnoEdicion,
}) {
  const [dia, setDia] = useState("");
  const [hora, setHora] = useState("");
  const [cupos, setCupos] = useState("");

  useEffect(() => {
    if (turnoEdicion) {
      setDia(turnoEdicion.dia);
      setHora(turnoEdicion.hora);
      setCupos(turnoEdicion.cupos);
    } else {
      setDia("");
      setHora("");
      setCupos("");
    }
  }, [turnoEdicion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dia || !hora || !cupos || cupos <= 0) {
      alert("Complete correctamente todos los campos!!");
      return;
    }

    const turnoData = { dia, hora, cupos: parseInt(cupos) };

    try {
      const res = turnoEdicion
        ? await fetch(`http://localhost:3007/turnos/${turnoEdicion.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(turnoData),
          })
        : await fetch("http://localhost:3007/turnos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(turnoData),
          });

      const data = await res.json();
      alert(data.mensaje || "Turno creado correctamente!!");
      setTurnoEdicion(null);
      cambiarVista("listado");
    } catch (err) {
      alert("Error al crear o actualizar el turno!!");
      console.error(err);
    }
  };

  return (
    <div id="form_turnos">
      <h2>{turnoEdicion ? "Editar turno" : "Nuevo turno"}</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Ingresar datos del turno deseado</legend>
          <div className="form_input">
            <label>Día</label>
            <input
              type="date"
              value={dia}
              onChange={(e) => setDia(e.target.value)}
              required
            />
          </div>
          <div className="form_input">
            <label>Horario</label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              required
            />
          </div>
          <div className="form_input">
            <label>Cupos</label>
            <input
              type="number"
              value={cupos}
              onChange={(e) => setCupos(e.target.value)}
              required
            />
          </div>
          <div className="form_input form_submit">
            <button type="submit">Finalizar</button>
            <button type="button" onClick={() => cambiarVista("menu")}>
              Volver al menú
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
