import React, { Fragment, useState,useEffect } from "react";
import Formulario from "./conponentes/Formulario";
import Cita from "./conponentes/Cita";
function App() {

  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if(!citasIniciales){
    citasIniciales = [];
  }
  const [citas, guardarCitas] = useState(citasIniciales);

  useEffect(()=>{
    if(citas){
      localStorage.setItem("citas",JSON.stringify(citas));
    }else{
      localStorage.setItem("citas",JSON.stringify([]));
    }
  },[citas])

  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  const eliminarCita = (id) => {
    guardarCitas(citas.filter((cita) => cita.id !== id));
  };

  const titulo = citas.length !== 0 ? "Administra tus citas" : "No hay citas";

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>

            {citas.map((cita) => {
              return (
                <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
