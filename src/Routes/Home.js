import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import Title from '../components/Title'
import Form from '../components/Form'
import Tabla from '../components/Tabla';
import API from '../helpers/API';
import Spinner from '../components/Spinner';

const Home = () => {

    let history = useHistory();

    const [listado, setListado] = useState([]);
    const [id, setId] = useState(null);

    const [fetching, setFetching] = useState(false);

    useEffect(() => {
      fetchApi();
    }, [])
    
    const fetchApi = async () => {
        setFetching(true);
        const json = await API("http://localhost:4000/mascotas");
        setListado(() => json);
        setFetching(false);
    }

    const postFunc = async ({nombre,edad,tipo,vacunado,observacion}) => {
        setFetching(true);
        let method = "post";
        let url = "http://localhost:4000/mascotas";
        let value = {
            nombre,edad,tipo,vacunado,observacion
        }

        if(id != null){
            url += `/${id}`;
            method = "put";
        }
        
        try {
            await API(url,{
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            });

        } catch (error) {
            console.log(error);
        }finally{
            setFetching(false);
            fetchApi();
        }
    }


    const deleteFunc = async (id) => {
        setFetching(true);
        await API("http://localhost:4000/mascotas/" +id,{
                method: "delete",
            });
        await fetchApi();
        setFetching(false);
    }


    const seleccionarModificar = (id) => {
        setId(id);
    }

    const detelle = (id) => {
        history.push(`/detalle/${id}`);
    }

  return (
    <div className="bg-slate-800 w-10/12 text-white m-auto mt-10">
        <Title title="Listado pacientes" />
        <div className="p-5">
            <Form postFunc={postFunc} id={id}/>
            <div className='flex justify-center'>
                {
                    fetching? <Spinner />:
                <Tabla 
                    listado={listado}
                    deleteFunc={deleteFunc} 
                    seleccionarModificar={seleccionarModificar}
                    detelle={detelle}
                />}
            </div>
        </div>
    </div>
  )
}

export default Home