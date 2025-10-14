import { useState } from "react";
import TurnosForm from "./TurnosForm";
import TurnosList from "./TurnosList";

export default function TurnosHome({ cambiarVista }) {
  const [vista, setVista] = useState("menu"); // menu, crearTurno, listado
  const [turnoEdicion, setTurnoEdicion] = useState(null);

  const abrirFormulario = (turno = null) => {
    setTurnoEdicion(turno);
    setVista("crearTurno");
  };

  return (
    <div>
      {vista === "menu" && (
        <div id="menu_gestion_turnos">
          <h1>Gestión de Turnos</h1>
          <div className="botones">
            <button onClick={() => abrirFormulario(null)}>Crear Turno</button>
            <button onClick={() => setVista("listado")}>
              Ver listado de turnos
            </button>
            <button onClick={() => cambiarVista("admin")}>
              Volver al menú del administrador
            </button>
          </div>
        </div>
      )}

      {vista === "crearTurno" && (
        <TurnosForm
          cambiarVista={setVista}
          turnoEdicion={turnoEdicion}
          setTurnoEdicion={setTurnoEdicion}
        />
      )}

      {vista === "listado" && (
        <TurnosList
          cambiarVista={abrirFormulario}
          setTurnoEdicion={setTurnoEdicion}
        />
      )}
    </div>
  );
}
