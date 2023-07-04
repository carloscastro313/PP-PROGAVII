import React from 'react'

const Fila = ({mascota:{_id,nombre,edad,tipo}, deleteFunc, seleccionarModificar, detelle}) => {
  return (
    <tr>
        <td>
            {nombre}
        </td>
        <td>
            {tipo}
        </td>
        <td className="flex gap-3 justify-around">
            <button className="min-w-[100px] bg-orange-400 hover:bg-orange-500 hover:text-white text-white" type="button" onClick={() => seleccionarModificar(_id)}>
                Modificar
            </button>
            <button type="button" className="min-w-[100px] bg-red-400 hover:bg-red-500 hover:text-white text-white" onClick={() => deleteFunc(_id)}>
                Eliminar
            </button>
            <button type="button" className="min-w-[100px] bg-blue-400 hover:bg-blue-500 hover:text-white text-white" onClick={() => detelle(_id)}>
                Detalle
            </button>
        </td>
    </tr>
  )
}

export default Fila