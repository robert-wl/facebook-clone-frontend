import {createContext, useState} from "react";
import {User} from "../../gql/graphql";



interface Auth {
    user: User | null,
    token: string | null
}



export const AuthContext = createContext<any>({});
export default function AuthContextProvider({ children } : { children : JSX.Element }){
    const [auth, setAuth] = useState<Auth>({
        user: null,
        token: null,
    });
    const token = localStorage.getItem("hai")

    if(token == null || token == ""){
        setAuth({
            user: null,
            token: null,
        })
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
