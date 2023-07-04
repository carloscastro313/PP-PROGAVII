import SessionCheck from "./SessionCheck";

export default ({url,isToken = false,param = {}, history = null}) => {
    return new Promise(async (resolve,reject) => {
        try {
            const parametros = param;
            if(isToken){
                console.log(url,localStorage.getItem("token"));
                const token = localStorage.getItem("token") || "";
                const headers = param.headers || {};
                parametros.headers = {
                    authorization: "Bearer " + token,
                    ...headers
                }
            }
    
            const res = await fetch(url,parametros);
            const json = await res.json();
        
            if(!json.ok){
                if(history != null && (json.error === "JsonWebTokenError" || json.error === "ErrorToken")){
                    SessionCheck(history);
                }
                reject(json); 
            }else{
                resolve(json);
            }
            
        } catch (error) {
            console.log(error);
            reject(error); 
        }
    });
}
