import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

const initialValues = {
    name: "",
    password: ""
} 

const FormLogin = ({isCreate = false, postFunc}) => {
    let history = useHistory();
    const [usuario, setUsuario] = useState(initialValues);

    const handlerSubmit = (e) => {
        e.preventDefault();
        postFunc(usuario);
    }

    const handlerChange = (e) => {
        setUsuario(m => {return{...m, [e.target.name] : e.target.value}})
    }
 
    const goTo = () => {
        if(isCreate)
            history.push("/login")
        else
            history.push("/registro")
    }

  return (
    <form onSubmit={handlerSubmit}>
        <div className="flex gap-3 p-3">
            <label htmlFor='name' className="w-48">Username</label>
            <input value={usuario.name} name="name" id="name" className="text-black" onChange={handlerChange} />
        </div>
        <div className="flex gap-3 p-3">
            <label htmlFor='password' className="w-48">Contraseña</label>
            <input value={usuario.password} name="password" id="password" className="text-black" onChange={handlerChange} />
        </div>
        <div className='flex justify-around'>
            <button className='p-3' type="submit">{isCreate? "Crear usuario" : "Ingresar"}</button>
            <button className='p-3' type="button" onClick={goTo}>{isCreate? "Volver" : "Crear cuenta"}</button>
        </div>
    </form>
  )
}

export default FormLogin;