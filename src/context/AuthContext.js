import React from "react";
import { IonLoading } from "@ionic/react";
import { createContext, useEffect, useState } from "react";
import { Storage } from "@capacitor/storage";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const [loggedIn,setLoggedIn] = useState(false);
    const [showLoading,setShowLoading] = useState(false);
    const [jwt,setJwt] = useState()

    //تنفيذ الدالة
    useEffect(() => {
        getAuthenticated()
    }, [])
    
    //get authenticated code
    const getAuthenticated = async () => {
        setShowLoading(true)
        const accessToken = await Storage.get({key:"accessToken"})
        if(accessToken.value) {
            setLoggedIn(true);
            setJwt(accessToken.value)
            setShowLoading(false)
        } else{
            setLoggedIn(false)
            setShowLoading(false)
        }
        
    }
    

    return(
        <>
        {showLoading 
        ? 
        <IonLoading isOpen={showLoading} duration={1000} />
        :
        <AuthContext.Provider value={{loggedIn,setLoggedIn,jwt,setJwt}}>
            {props.children}
        </AuthContext.Provider>
        }
        </>
    )
}

export default AuthContextProvider;