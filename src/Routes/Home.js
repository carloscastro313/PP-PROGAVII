import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import Title from '../components/Title'
import Form from '../components/Form'
import Tabla from '../components/Tabla';
import API from '../helpers/API';
import Spinner from '../components/Spinner';
import SessionCheck from '../helpers/SessionCheck';
import { ErrorModal } from '../components/ErrorModal';

const Home = () => {

    let history = useHistory();

    const [listado, setListado] = useState([]);
    const [id, setId] = useState(null);
    const [msg, setMsg] = useState("");
    const [showError, setShowError] = useState(false);

    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(!token){
            history.push("/login");
        }else{
            fetchApi();
        }
    }, []);
    
    const fetchApi = async () => {
        try {
            setFetching(true);
            const res = await API({
                url: "http://localhost:4000/api/mascotas",
                isToken: true,
                history
            });
            setListado(() => res.mascotas);
        } catch (error) {
        }finally{
            setFetching(false);
        }

    }

    const postFunc = async ({nombre,edad,tipo,vacunado,observaciones}) => {
        setFetching(true);
        let method = "post";
        let url = "http://localhost:4000/api/mascotas";
        let value = {
            nombre,edad,tipo,vacunado,observaciones
        }
        let success = true;

        if(id != null){
            url += `/${id}`;
            method = "put";
        }
        
        try {
            await API({
                url,
                isToken: true,
                param: {
                    method,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(value)
                },
                history
            });

            fetchApi();
        } catch (error) {
            setMsg(error.message);
            setShowError(true);

            success = false;
        }finally{
            setFetching(false);
        }

        return success;
    }


    const deleteFunc = async (id) => {
        try {
            setFetching(true);
            await API({
                url: "http://localhost:4000/api/mascotas/" +id,
                isToken: true,
                param: {
                    method: "delete",
                }
                });
            await fetchApi();
            
        } catch (error) {
            setMsg(error.message);
            setShowError(true);
        }finally{
            setFetching(false);
        }
    }


    const seleccionarModificar = (id) => {
        setId(id);
    }

    const detelle = (id) => {
        history.push(`/detalle/${id}`);
    }

  return (
    <>
        <ErrorModal  show={showError} msg={msg} onClick={() => {setMsg(""); setShowError(false)} } />
        <div className="bg-slate-800 w-[600px] text-white m-auto mt-10">
            <Title title="Listado pacientes" />
            <div className="p-5">
                <Form postFunc={postFunc} id={id} setId={setId} history={history} />
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
    </>
  )
}

export default Home