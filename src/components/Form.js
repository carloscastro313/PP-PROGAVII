import React, { useEffect, useState } from 'react'
import API from '../helpers/API';
import SelectTipo from './SelectTipo';

const initialValues = {
    nombre: "",
    edad: "",
    tipo: "",
    vacunado: false,
    observaciones: ""
}

const Form = ({postFunc, id}) => {

    const [mascota, setMascota] = useState(initialValues);
    const [tipos, setTipos] = useState([]);
       
    useEffect(() => {
        getTipos();
    }, []);

    useEffect(() => {
      if(id){
        getFunc();
      }else{
        setMascota(initialValues);
      }
    }, [id])
    
    const getFunc = async () => {
        const json = await API("http://localhost:4000/mascotas/"+id);
        setMascota(json);
    }    

    const getTipos = async () => {
        const json = await API("http://localhost:4000/tipos");
        setTipos([...json]);
    }


    const handlerChange = (e) => {
        const value = e.target.name === "vacunado" ? e.target.checked : e.target.value;
        setMascota(m => {return{...m, [e.target.name] : value}})
    }

    const handlerSubmit = (e) => {
        e.preventDefault();

        postFunc(mascota);
    }

  return (
    <form onSubmit={handlerSubmit} className="m-auto w-1/2 my-10">
        <div className="flex gap-3 p-3">
            <label htmlFor='nombre' className="w-48">Nombre</label>
            <input value={mascota.nombre} name="nombre" id="nombre" className="text-black" onChange={handlerChange} />
        </div>
        <div className="flex gap-3 p-3">
            <label htmlFor='edad' className="w-48">Edad</label>
            <input value={mascota.edad} name="edad" id="edad" className="text-black" onChange={handlerChange} />
        </div>
        <div className="flex gap-3 p-3">
            <label htmlFor='tipo' className="w-48">Tipo</label>
            {/* <select className="text-black" value={mascota.tipo} onChange={handlerChange} name='tipo'>
                {
                    tipos.map(({id,descripcion}) => (<option key={id}>{descripcion}</option>))
                }
            </select> */}
            <SelectTipo handlerChange={handlerChange} tipo={mascota.tipo} />
        </div>
        <div className="flex gap-3 p-3">
            <label htmlFor='vacunado' className="w-48">Vacunado</label>
            <input value={mascota.vacunado} name="vacunado" id="vacunado" className="text-black" type="checkbox" onChange={handlerChange} />
        </div>
        <div className="flex gap-3 p-3">
            <label htmlFor='observaciones' className="w-48">Observaciones</label>
            <textarea value={mascota.observaciones} name="observaciones" id="observaciones" className="text-black" onChange={handlerChange}/>
        </div>
        <button className='p-3' type="submit">{id == null? "Crear" : "Modificar"}</button>
    </form>
  )
}

export default Form