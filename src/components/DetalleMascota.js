import React from 'react'

const DetalleMascota = ({mascota: {nombre,edad,tipo,vacunado,observaciones}}) => {
  return (
    <div className="bg-sky-900 w-1/2 h-[300px] m-auto mt-10 p-3 flex flex-col gap-3 text-2xl justify-evenly">
        <div>
            <p>
                <span>Nombre: </span>{nombre}
            </p>
        </div>
        <div>
            <p>
                <span>Edad: </span>{edad}
            </p>
        </div>
        <div>
            <p>
                <span>Tipo: </span>{tipo}
            </p>
        </div>
        <div>
            <p>
                <span>Vacunado: </span>{vacunado? "SI": "NO"}
            </p>
        </div>
        <div>
            <p>
                <span>Observaciones: </span>{observaciones}
            </p>
        </div>
    </div>
  )
}

export default DetalleMascota