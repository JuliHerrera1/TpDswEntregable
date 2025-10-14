export default function MenuCliente({ cambiarVista }) {
  return (
    <div id="menu_gestion_cliente" className="menu_cliente">
      <h1>Gestión de Clientes</h1>
      <button onClick={() => cambiarVista("crear")}>Crear Cliente</button>
      <button onClick={() => cambiarVista("listado")}>
        Ver listado de clientes
      </button>
    </div>
  );
}
