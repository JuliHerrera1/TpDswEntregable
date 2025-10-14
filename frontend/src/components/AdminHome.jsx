import { useState } from "react";
import "./AdminHome.css";

export default function AdminHome({ cambiarVista }) {
  const [admin, setAdmin] = useState({ id: 1, nombre: "Administrador" });
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(admin.nombre);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nombreLimpio = nuevoNombre.trim();
    if (!nombreLimpio) {
      alert("Ingrese un nombre válido");
      return;
    }
    setAdmin((prev) => ({ ...prev, nombre: nombreLimpio }));
    alert("Nombre actualizado correctamente!");
    setMostrarForm(false);
  };

  return (
    <div id="pantalla_admin">
      <h1 id="h1_bienvenida">Bienvenido {admin.nombre}!!</h1>

      <div id="menu_admin">
        <p>Seleccione la sección a la que desea ir:</p>
        <button
          className="link_pantallas"
          onClick={() => cambiarVista("listado")}
        >
          Administrar Clientes
        </button>
        <button
          className="link_pantallas"
          onClick={() => cambiarVista("turnosHome")}
        >
          Administrar Turnos
        </button>
        <button
          className="link_pantallas"
          onClick={() => cambiarVista("rutinas")}
        >
          Administrar Rutinas
        </button>
        <button
          id="button_mostrar_modificaciones"
          onClick={() => setMostrarForm(!mostrarForm)}
        >
          Modificar datos propios
        </button>
      </div>

      {mostrarForm && (
        <div id="modificar_datos_admin">
          <h2>Modificar datos propios</h2>
          <form id="form_admin_actualizar" onSubmit={handleSubmit}>
            <label htmlFor="inputNombre">Nombre:</label>
            <input
              type="text"
              id="inputNombre"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              placeholder="Ingrese nuevo nombre"
            />
            <button type="submit">Actualizar</button>
          </form>
        </div>
      )}
    </div>
  );
}
