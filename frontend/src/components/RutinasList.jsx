import { useEffect, useState } from "react";
import "./Rutinas.css";

export default function RutinasList({ cambiarVista }) {
  const [rutinas, setRutinas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [mostrarAsignar, setMostrarAsignar] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [mensajeRespuesta, setMensajeRespuesta] = useState("");

  const obtenerRutinas = async () => {
    try {
      const res = await fetch("http://localhost:3007/rutinas");
      let data = await res.json();
      if (filtro) {
        data = data.filter((r) =>
          r.nivel.toLowerCase().includes(filtro.toLowerCase())
        );
      }
      setRutinas(data);
    } catch {
      alert("Error al obtener rutinas!!");
    }
  };

  const obtenerClientes = async () => {
    try {
      const res = await fetch("http://localhost:3007/clientes");
      const data = await res.json();
      setClientes(data);
    } catch {
      alert("Error al obtener clientes!!");
    }
  };

  useEffect(() => {
    obtenerRutinas();
    obtenerClientes();
  }, [filtro]);

  const verEjercicios = async (idRutina) => {
    const fila = document.getElementById(`ejercicios-${idRutina}`);
    const lista = document.getElementById(`lista-ejercicios-${idRutina}`);

    if (fila.style.display === "none") {
      try {
        const res = await fetch(
          `http://localhost:3007/rutinas/${idRutina}/ejercicios`
        );
        const ejercicios = await res.json();
        lista.innerHTML = ejercicios
          .map((e) => `<li>${e.nombre} (${e.repeticiones}) [${e.tipo}]</li>`)
          .join("");
        fila.style.display = "table-row";
      } catch {
        alert("Error al obtener ejercicios!");
      }
    } else {
      fila.style.display = "none";
    }
  };

  const asignarRutina = async (e) => {
    e.preventDefault();
    if (!clienteSeleccionado || !rutinaSeleccionada) {
      alert("Seleccione cliente y rutina");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:3007/clientes/${clienteSeleccionado}/rutina`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idRutina: rutinaSeleccionada }),
        }
      );
      const data = await res.json();
      setMensajeRespuesta(data.mensaje);
      const cliente = clientes.find((c) => c.id == clienteSeleccionado);
      if (cliente) cliente.rutinaId = rutinaSeleccionada;
    } catch {
      alert("Error al asignar rutina");
    }
  };

  return (
    <div>
      {!mostrarAsignar && (
        <div id="listado_rutinas">
          <h1>Listado de rutinas</h1>
          <input
            type="text"
            placeholder="Filtrar por nivel..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <table id="tabla_rutinas">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Nivel</th>
                <th>Descripción</th>
                <th>Ver ejercicios</th>
              </tr>
            </thead>
            <tbody id="contenido_tabla_rutinas">
              {rutinas.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.nombre}</td>
                  <td>{r.nivel}</td>
                  <td>{r.descripcion}</td>
                  <td>
                    <button onClick={() => verEjercicios(r.id)}>
                      Ver ejercicios
                    </button>
                  </td>
                </tr>
              ))}
              {rutinas.map((r) => (
                <tr
                  key={`ej-${r.id}`}
                  id={`ejercicios-${r.id}`}
                  style={{ display: "none" }}
                >
                  <td colSpan={5}>
                    <ul id={`lista-ejercicios-${r.id}`}></ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => setMostrarAsignar(true)}
            className="button_asignar_rutinas"
          >
            Asignar rutinas a clientes
          </button>
          <button
            onClick={() => cambiarVista("admin")}
            className="volver_admin"
          >
            Volver al menú del administrador
          </button>
        </div>
      )}

      {mostrarAsignar && (
        <div id="asignar_rutina">
          <h2>Asignar rutina a cliente</h2>
          <form onSubmit={asignarRutina}>
            <label>Cliente:</label>
            <select
              value={clienteSeleccionado}
              onChange={(e) => setClienteSeleccionado(e.target.value)}
            >
              <option value="">Seleccione un cliente:</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre} {c.apellido}
                </option>
              ))}
            </select>

            <label>Rutina:</label>
            <select
              value={rutinaSeleccionada}
              onChange={(e) => setRutinaSeleccionada(e.target.value)}
            >
              <option value="">Seleccione una Rutina:</option>
              {rutinas.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.nombre} {r.nivel}
                </option>
              ))}
            </select>

            <button type="submit">Asignar rutina</button>
          </form>
          <p id="mensajeRespuesta">{mensajeRespuesta}</p>

          <h2>Clientes con rutina asignada</h2>
          <table id="tablaClientesRutina">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Rutina Asignada</th>
              </tr>
            </thead>
            <tbody id="contenido_tablaClientesRutina">
              {clientes.map((c) => {
                const ruti = rutinas.find((r) => r.id == c.rutinaId);
                return (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>
                      {c.nombre} {c.apellido}
                    </td>
                    <td>{ruti ? ruti.nombre : ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            onClick={() => setMostrarAsignar(false)}
            id="botonVolverRutina"
          >
            Volver al listado
          </button>
        </div>
      )}
    </div>
  );
}
