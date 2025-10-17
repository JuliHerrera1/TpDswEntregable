import { useState } from "react";
import MenuCliente from "./components/MenuCliente";
import ClienteForm from "./components/ClienteForm";
import ClienteList from "./components/ClienteList";
import AdminHome from "./components/AdminHome";
import TurnosHome from "./components/TurnosHome";
import TurnosForm from "./components/TurnosForm";
import TurnosList from "./components/TurnosList";
import RutinasList from "./components/RutinasList";
import "./clientes.css";

export default function App() {
  const [vista, setVista] = useState("admin"); //VISTA GUARDA UN STRING QUE INDICA QUE PANTALLA MOSTRAR Y SETVISTA ES LA FUNCION QUE PERMITE CAMBIAR ESE VALOR. INICIALMENTE ESTA EN ADMIN
  return (
    <div>
      {/*Vistas q tiene el Adminn de clientes*/}
      {vista === "menu" && <MenuCliente cambiarVista={setVista} />}
      {/*SI VISTA ES MENU SE MUESTRA EL COMPONENTE MenuCliente*/}
      {vista === "crearCliente" && <ClienteForm cambiarVista={setVista} />}
      {vista === "listado" && <ClienteList cambiarVista={setVista} />}
      {/*Vistas que tiene el Adminn*/}
      {vista === "admin" && <AdminHome cambiarVista={setVista} />}
      {/*Vistas que tiene el Adminn de rutinas*/}
      {vista === "rutinas" && <RutinasList cambiarVista={setVista} />}
      {/*Vistas que tiene el Adminn de turnos*/}
      {vista === "turnos" && <TurnosList cambiarVista={setVista} />}
      {vista === "crearTurno" && <TurnosForm cambiarVista={setVista} />}
      {vista === "turnosHome" && <TurnosHome cambiarVista={setVista} />}
    </div>
  );
}
//El operador && hace que el componente a la derecha se renderice solo si la condicion de la izquierda es verdadera.
