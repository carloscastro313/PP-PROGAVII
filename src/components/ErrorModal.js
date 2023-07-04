import React from 'react'

export const ErrorModal = ({msg = "", show = false, onClick}) => {
  return (
    <div
    className={`w-full h-full fixed bg-black bg-opacity-80 backdrop-blur-sm ${
      !show && "hidden"
    } `}
  >
    <div className="flex justify-center h-full">
      <div className="w-[300px] bg-red-300 self-center p-5 rounded overflow-y-auto ">
        <div className="flex flex-col gap-5">
            <h1 className="text-xl text-center">Error</h1>
                <div className="max-h-[300px] overflow-x-auto">
                    <p>{msg}</p>
                </div>
                <div className="flex justify-center content-center">
                    <button type="button" onClick={onClick}>Cerrar</button>
                </div>
            </div>
        </div>
    </div>
  </div>
  )
}
