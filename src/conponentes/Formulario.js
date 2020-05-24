import React, { Fragment,useState } from "react";
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
const Formulario = ({crearCita}) => {

    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });

    const [error,actualizarError] = useState(false);

    const actualizarState =(e)=>{
        actualizarCita({...cita,[e.target.name]:e.target.value})
    }

    const {mascota,propietario,fecha,hora,sintomas} = cita;


    const submitCita = (e)=>{
        e.preventDefault();
        if(mascota.trim() === "" || propietario.trim() === "" || fecha.trim()==="" || hora.trim() === "" || sintomas.trim() === ""){
            actualizarError(true);
            return;
        }
        actualizarError(false);
        cita.id = uuid();
        crearCita(cita);
        actualizarCita({
            mascota: '',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        });
    }

  return (
    <Fragment>
      <h2>Crear cita</h2>
      {
          error ? 
<p className="alerta-error">Todos los campos son obligatorios</p>
          :
          null
      }
      <form onSubmit={submitCita}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={mascota}
        />

        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de la mascota"
          onChange={actualizarState}
          value={propietario}
        />

        <label>Fecha</label>
        <input value={fecha} type="date" name="fecha" className="u-full-width" onChange={actualizarState} />

        <label>Hora</label>
        <input type="time" value={hora} name="hora" className="u-full-width" onChange={actualizarState} />

        <label>Síntomas</label>
        <textarea name="sintomas" value={sintomas} className="u-full-width" onChange={actualizarState}></textarea>

        <button type="submiy" className="u-full-width button-primary" >Agregar Cita</button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes ={
  crearCita: PropTypes.func.isRequired
}

export default Formulario;
