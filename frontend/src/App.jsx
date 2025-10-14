import { useState } from "react";
import MenuCliente from "./components/MenuCliente";
import ClienteForm from "./components/ClienteForm";
import ClienteList from "./components/ClienteList";
import "./clientes.css";

export default function App() {
  const [vista, setVista] = useState("menu"); // 'menu', 'crear', 'listado'

  return (
    <div>
      {vista === "menu" && <MenuCliente cambiarVista={setVista} />}
      {vista === "crear" && <ClienteForm cambiarVista={setVista} />}
      {vista === "listado" && <ClienteList cambiarVista={setVista} />}
    </div>
  );
}
