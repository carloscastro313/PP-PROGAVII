import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-slate-800 text-center h-32 px-3 flex justify-center">
        <Link to="/" className="h-10 w-60 block m-auto">
            <h1 className="text-white text-5xl ">Veterinaria</h1>
        </Link>
    </header>
  )
}

export default Header