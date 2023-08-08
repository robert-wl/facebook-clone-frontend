import {createContext, useEffect, useState} from "react";
import {User} from "../../gql/graphql";
import {useQuery} from "@apollo/client";
import {GET_AUTH} from "../../lib/query/user/getAuth.graphql.ts";
import errorHandler from "../../controller/errorHandler.ts";

export const AuthContext = createContext<User | null>(null);
export default function AuthContextProvider({ children } : { children : JSX.Element }){
    const { refetch } = useQuery(GET_AUTH, {
        onCompleted: (data) => {
            setAuth(data.getAuth)
        },
        onError: (errorHandler)
    })
    const [auth, setAuth] = useState<User | null>(null);

/*    useEffect(() => {
        refetch();
    }, []);*/

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}
