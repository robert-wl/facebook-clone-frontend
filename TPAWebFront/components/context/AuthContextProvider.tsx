import {createContext, useState} from "react";
import {User} from "../../gql/graphql";
import {useQuery} from "@apollo/client";
import {GET_AUTH} from "../../lib/query/user/getAuth.graphql.ts";

export const AuthContext = createContext<User | null>(null);
export default function AuthContextProvider({ children } : { children : JSX.Element }){
    useQuery(GET_AUTH, {
        onCompleted: (data) => {
            setAuth(data.getAuth)
        },
        skip: !localStorage.getItem("token")
    })
    const [auth, setAuth] = useState<User | null>(null);


    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}
