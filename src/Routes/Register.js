import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import FormLogin from '../components/FormLogin';
import Title from '../components/Title';
import API from '../helpers/API';
import { ErrorModal } from '../components/ErrorModal';

const Register = () => {
    const [msg, setMsg] = useState("");
    const [showError, setShowError] = useState(false);

    let history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            history.push("/")
        }
    }, [])
    

    const createUser = async (value) => {
        try {
            const res = await API({
                url: "http://localhost:4000/api/user",
                param: {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(value)
                }
            });
            
            localStorage.setItem("token",res.token);
            history.push("/");
        } catch (error) {
            setMsg(error.message);
            setShowError(true);
            
        }
    }


  return (
    <>
        <ErrorModal  show={showError} msg={msg} onClick={() => {setMsg(""); setShowError(false)} } />
        <div className="bg-slate-800 w-[400px] text-white m-auto mt-10">
            <Title title="Crear usuario" />
            <div className="p-5">
                <FormLogin isCreate={true} postFunc={createUser} />
            </div>
        </div>
    </>
  )
}

export default Register;