import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUSer } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      getCurrentUSer()
        .then((res) => {
            if(res) {
                setIsLogged(true);
                setUser(res);
            } else {
                setIsLogged(false);
                setUser(null);
            }
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setLoading(false);
        })
    }, [])
    
    return (
        <GlobalContext.Provider
            value={{
                isLogged,
                setIsLogged,
                user, 
                setUser, 
                loading
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
} 

export default GlobalProvider;