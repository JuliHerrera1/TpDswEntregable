import { useState, useEffect } from "react";
import "./Turnos.css";

export default function TurnosList({
  cambiarVista,
  setTurnoEdicion,
  volverAlMenu,
}) {
  const [turnos, setTurnos] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    mostrarTurnos();
  }, []);

  const mostrarTurnos = async (filtroDia = "") => {
    try {
      const res = await fetch("http://localhost:3007/turnos");
      let data = await res.json();
      if (filtroDia)
        data = data.filter((t) => t.dia && t.dia.includes(filtroDia));
      setTurnos(data);
    } catch (err) {
      alert("Error al obtener los turnos!!");
      console.error(err);
    }
  };

  const borrarTurno = async (id) => {
    if (!confirm(`¿Está seguro que desea eliminar el turno con ID: ${id}?`))
      return;
    try {
      const res = await fetch(`http://localhost:3007/turnos/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.mensaje);
      mostrarTurnos(filtro);
    } catch (err) {
      alert("Error al eliminar turno!!");
      console.error(err);
    }
  };

  return (
    <div id="listado_turnos">
      <h2>Listado de turnos</h2>
      <input
        type="text"
        placeholder="Filtrar por día..."
        value={filtro}
        onChange={(e) => {
          setFiltro(e.target.value);
          mostrarTurnos(e.target.value);
        }}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Día</th>
            <th>Horario</th>
            <th>Cupos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {turnos.length === 0 && (
            <tr>
              <td colSpan="5">No hay turnos disponibles</td>
            </tr>
          )}
          {turnos.map((t) => {
            const fechaFormateada = t.dia
              ? t.dia.split("-").reverse().join("/")
              : "";
            return (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{fechaFormateada}</td>
                <td>{t.hora}</td>
                <td>{t.cupos}</td>
                <td>
                  <button
                    className="bot_turno"
                    onClick={() => {
                      setTurnoEdicion(t);
                      cambiarVista(t);
                    }}
                  >
                    Actualizar
                  </button>
                  <button
                    className="bot_turno"
                    onClick={() => borrarTurno(t.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={volverAlMenu}>Volver al menú</button>
    </div>
  );
}
