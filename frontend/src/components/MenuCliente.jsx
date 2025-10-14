export default function MenuCliente({ cambiarVista }) {
  return (
    <div id="menu_gestion_cliente" className="menu_cliente">
      <h1>Gestión de Clientes</h1>
      <button onClick={() => cambiarVista("crearCliente")}>
        Crear Cliente
      </button>
      <button onClick={() => cambiarVista("listado")}>
        Ver listado de clientes
      </button>
      <button
        onClick={() => cambiarVista("admin")}
        className="button_volver_menu"
      >
        Volver al Menú Administrador
      </button>
    </div>
  );
}
