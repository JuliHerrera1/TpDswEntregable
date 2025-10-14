import { useEffect, useState } from "react";

export default function ClienteList({ cambiarVista }) {
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [clienteEditando, setClienteEditando] = useState(null);

  // obtenemos el listado de clis
  const obtenerClientes = async () => {
    try {
      const res = await fetch("http://localhost:3007/clientes");
      let data = await res.json();
      if (filtro) {
        data = data.filter((c) =>
          c.nombre.toLowerCase().includes(filtro.toLowerCase())
        );
      }
      setClientes(data);
    } catch {
      alert("Error al obtener clientes!!");
    }
  };
  useEffect(() => {
    obtenerClientes();
  }, [filtro]);

  //Eliminamos al cli del back
  const borrarCliente = async (id) => {
    if (!confirm(`¿Seguro que desea eliminar al cliente ${id}?`)) return;
    try {
      const res = await fetch(`http://localhost:3007/clientes/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.mensaje);
      obtenerClientes();
    } catch {
      alert("Error al borrar cliente!!");
    }
  };

  // Guardamos las modificaciones del cli en el back
  const guardarCambios = async () => {
    if (!clienteEditando) return;
    try {
      const res = await fetch(
        `http://localhost:3007/clientes/${clienteEditando.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(clienteEditando),
        }
      );
      if (!res.ok) {
        throw new Error("Error al actualizar cliente");
      }
      const data = await res.json();
      alert(data.mensaje);
      setClienteEditando(null);
      obtenerClientes();
    } catch {
      alert("Error al guardar los cambios!");
    }
  };

  return (
    <div>
      {/*LISTADO*/}
      {!clienteEditando && (
        <div id="listado_clientes">
          <h2>Listado de Clientes</h2>
          <input
            type="text"
            placeholder="Filtrar por nombre..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <table id="tabla_clientes" border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Fecha Nacimiento</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.nombre}</td>
                  <td>{c.apellido}</td>
                  <td>{c.fecha ? c.fecha.split("T")[0] : ""}</td>
                  <td>{c.telefono}</td>
                  <td>{c.email}</td>
                  <td>
                    <button onClick={() => setClienteEditando(c)}>
                      Actualizar
                    </button>
                    <button onClick={() => borrarCliente(c.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => cambiarVista("menu")}>Volver al menú</button>
        </div>
      )}

      {/* FORM DE EDICIÓN */}
      {clienteEditando && (
        <div id="form_editar_cliente">
          <h2>Editar Cliente</h2>
          <label>
            Nombre:
            <input
              type="text"
              value={clienteEditando.nombre}
              onChange={(e) =>
                setClienteEditando({
                  ...clienteEditando,
                  nombre: e.target.value,
                })
              }
            />
          </label>
          <br />
          <label>
            Apellido:
            <input
              type="text"
              value={clienteEditando.apellido}
              onChange={(e) =>
                setClienteEditando({
                  ...clienteEditando,
                  apellido: e.target.value,
                })
              }
            />
          </label>
          <br />
          <label>
            Fecha Nacimiento:
            <input
              type="date"
              value={
                clienteEditando.fecha ? clienteEditando.fecha.split("T")[0] : ""
              }
              onChange={(e) =>
                setClienteEditando({
                  ...clienteEditando,
                  fecha: e.target.value,
                })
              }
            />
          </label>
          <br />
          <label>
            Teléfono:
            <input
              type="text"
              value={clienteEditando.telefono}
              onChange={(e) =>
                setClienteEditando({
                  ...clienteEditando,
                  telefono: e.target.value,
                })
              }
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={clienteEditando.email}
              onChange={(e) =>
                setClienteEditando({
                  ...clienteEditando,
                  email: e.target.value,
                })
              }
            />
          </label>
          <br />
          <button onClick={guardarCambios}>Guardar</button>
          <button onClick={() => setClienteEditando(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}
