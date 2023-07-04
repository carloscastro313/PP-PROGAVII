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
        const token = localStorage.getItem("token");
        if(!token){
            history.push("/login")
        }else{
            getDetalle();
        }
    }, [])
    
    const getDetalle = async () => {
        try {
            setFetching(true);

            const json = await API({
                url: "http://localhost:4000/api/mascotas/" +id,
                isToken: true,
                history
            });

            if(json.ok)
                setMascota(json.mascota);
            else
                history.push(`/error`);
                
        } catch (error) {
        }finally{
            setFetching(false);
            
        }
    }

  return (
    <div className="bg-slate-800 w-[500px]  text-white m-auto mt-10">
        <Title title={"Detalle"} />

        <div className="py-5 flex col m-auto">
            {
                fetching? <Spinner />:
                <DetalleMascota mascota={mascota}/>
            }
        </div>
    </div>
  )
}

export default Detalle