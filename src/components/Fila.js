import React from 'react'

const Fila = ({mascota:{id,nombre,edad,tipo}, deleteFunc, seleccionarModificar, detelle}) => {
  return (
    <tr>
        <td>
            {nombre}
        </td>
        <td>
            {tipo}
        </td>
        <td className="flex gap-3">
            <button type="button" onClick={() => seleccionarModificar(id)}>
                Modificar
            </button>
            <button type="button" onClick={() => deleteFunc(id)}>
                Eliminar
            </button>
            <button type="button" onClick={() => detelle(id)}>
                Detalle
            </button>
        </td>
    </tr>
  )
}

export default Fila