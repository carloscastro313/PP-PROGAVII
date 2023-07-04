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

const Form = ({postFunc, id, setId, history}) => {
    const [mascota, setMascota] = useState(initialValues);

    useEffect(() => {
        console.log(id)
      if(id){
        getFunc();
      }else{
        setMascota(initialValues);
      }
    }, [id])
    
    const getFunc = async () => {
        try {
            const json = await API({
                url: "http://localhost:4000/api/mascotas/"+id,
                isToken: true,
                param: {
                    method: "GET"
                },
                history
            });
            console.log(json)
            setMascota({...json.mascota});
        } catch (error) {
            setId(null);
        }
    }    

    const handlerChange = (e) => {
        const value = e.target.name === "vacunado" ? e.target.checked : e.target.value;
        setMascota(m => {return{...m, [e.target.name] : value}})
    }

    const handlerSubmit = async (e) => {
        e.preventDefault();

        if(await postFunc(mascota))
            reset();
    }

    const reset = () => {
        setId(null);
        setMascota(initialValues);
    }

  return (
    <form onSubmit={handlerSubmit} className="m-auto flex flex-col justify-center my-10">
        <div className="flex gap-3 p-3">
            <label htmlFor='nombre' className="w-56">Nombre</label>
            <input value={mascota.nombre} name="nombre" id="nombre" className="text-black w-[100%]" onChange={handlerChange} />
        </div>
        <div className="flex gap-3 p-3">
            <label htmlFor='edad' className="w-56">Edad</label>
            <input value={mascota.edad} name="edad" id="edad" className="text-black w-[100%]" onChange={handlerChange} />
        </div>
        <div className="flex gap-3 p-3">
            <label htmlFor='tipo' className="w-56">Tipo</label>
            {/* <select className="text-black" value={mascota.tipo} onChange={handlerChange} name='tipo'>
                {
                    tipos.map(({id,descripcion}) => (<option key={id}>{descripcion}</option>))
                }
            </select> */}
            <SelectTipo handlerChange={handlerChange} tipo={mascota.tipo} />
        </div>
        <div className="flex gap-3 p-3">
            <label htmlFor='vacunado' className="w-56">Vacunado</label>
            <input value={mascota.vacunado} name="vacunado" id="vacunado" className="text-black" type="checkbox" onChange={handlerChange} />
        </div>
        <div className="flex gap-3 p-3">
            <label htmlFor='observaciones' className="w-56">Observaciones</label>
            <textarea value={mascota.observaciones} name="observaciones" id="observaciones" className="text-black w-[100%]" onChange={handlerChange}/>
        </div>
        <div className="flex justify-around">
            <button className='p-3 bg-green-400 hover:bg-green-500 hover:text-white text-white' type="submit">{id == null? "Crear" : "Modificar"}</button>
            <button className='p-3 bg-red-400 hover:bg-red-500 hover:text-white text-white' type="button" onClick={reset} >Limpiar</button>
        </div>
    </form>
  )
}

export default Form