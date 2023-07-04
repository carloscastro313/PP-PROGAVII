import API from "./API";

export default async function(history){

    try {
        const token = localStorage.getItem("token");
    
        if(!token) return false;
    
        const res = await API({
            url:"http://localhost:4000/api/auth/relog",
            isToken: true,
            param: {
                method: "POST",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            },
            history
        });
    
        localStorage.setItem("token",res.token);
    
        return true;
        
    } catch (error) {
        localStorage.removeItem("token");
        return false;
    }
}