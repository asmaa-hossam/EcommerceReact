import { createContext, useEffect, useState } from "react";

 export let AuthContext=createContext();

function AuthContextProvider(props) {
    let[token,settoken]=useState(null)
    useEffect(()=>{
        if(localStorage.getItem('tkn')){
settoken(localStorage.getItem('tkn'))
        }
    },[])
    return ( <>
    <AuthContext.Provider value={{token,settoken}}>
{props.children}
    </AuthContext.Provider>
    </> );
}

export default AuthContextProvider;