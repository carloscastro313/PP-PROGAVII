import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import {
    useParams,
    useHistory
  } from "react-router-dom";
import API from '../helpers/API';
import DetalleMascota from '../components/DetalleMascota';
import Spinner from '../components/Spinner';

const Detalle = () => {
    const [mascota, setMascota] = useState(null);
    const [fetching, setFetching] = useState(true);
    const {id} = useParams();
    let history = useHistory();
    useEffect(() => {
        getDetalle();
    }, [])
    
    const getDetalle = async () => {
        setFetching(true);

        const json = await API("http://localhost:4000/mascotas/" +id);
        if(json.id)
            setMascota(json);
        else
            history.push(`/error`);
        setFetching(false);
    }

  return (
    <div className="bg-slate-800 w-10/12 min-h-[700px] text-white m-auto mt-10">
        <Title title={"Detalle"} />

        <div className="py-5 flex col h-[500px] m-auto">
            {
                fetching? <Spinner />:
                <DetalleMascota mascota={mascota}/>
            }
        </div>
    </div>
  )
}

export default Detalle