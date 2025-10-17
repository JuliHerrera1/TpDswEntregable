import { useState } from "react";

export default function ClienteForm({ cambiarVista }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fecha, setFecha] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const telRegex = /^[0-9]{8,15}$/;
    if (!telRegex.test(telefono)) {
      alert(
        "Ingrese un número de teléfono válido (solo números, 8-15 dígitos)"
      );
      return;
    }

    const nacimiento = new Date(fecha);
    const hoy = new Date();
    const edad =
      hoy.getFullYear() -
      nacimiento.getFullYear() -
      (hoy <
      new Date(hoy.getFullYear(), nacimiento.getMonth(), nacimiento.getDate())
        ? 1
        : 0);
    if (edad < 11) {
      alert("El cliente debe tener al menos 11 años!");
      return;
    }
    const nuevoCli = { nombre, apellido, fecha, email, telefono };
    try {
      const res = await fetch("http://localhost:3007/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoCli),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.Error || data.mensaje || "Error desconocido");
      }
      alert(data.mensaje);
      cambiarVista("listado");
    } catch (err) {
      alert("Error al crear el cliente: " + err.mensaje);
    }

    setNombre("");
    setApellido("");
    setFecha("");
    setEmail("");
    setTelefono("");
  };

  return (
    <div id="form_cliente">
      <h2>Nuevo Cliente</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Ingresar datos personales</legend>
          <div className="form_input">
            <label>Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="form_input">
            <label>Apellido</label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>
          <div className="form_input">
            <label>Fecha Nacimiento</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>
          <div className="form_input">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form_input">
            <label>Teléfono</label>
            <input
              type="number"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>
          <div className="form_submit">
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
