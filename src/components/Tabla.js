import React from 'react'
import Fila from './Fila'

const Tabla = ({listado = [], deleteFunc, seleccionarModificar,detelle}) => {
  return (
    <table className="m-auto w-1/2 m-auto">
        <thead>
            <tr>
                <th className="p-2">Nombre</th>
                <th className="p-2">Tipo</th>
                <th className="p-2">Acciones</th>
            </tr>
        </thead>
        <tbody>
            {
                listado.map((value) => (
                    <Fila mascota={value} key={value.id} deleteFunc={deleteFunc} seleccionarModificar={seleccionarModificar} detelle={detelle}/>
                ))
            }
        </tbody>
    </table>
  )
}

export default Tabla