import {createContext, useEffect, useState} from "react";
import {User} from "../../gql/graphql";
import {useQuery} from "@apollo/client";
import {GET_AUTH} from "../../lib/query/user/getAuth.graphql.ts";
import errorHandler from "../../controller/errorHandler.ts";


interface AuthContext {
    auth: User | null,
    getUser: (() => void) | null
}

export const AuthContext = createContext<AuthContext>({
    auth: null,
    getUser: null
});
export default function AuthContextProvider({ children } : { children : JSX.Element }){
    const { refetch } = useQuery(GET_AUTH, {
        onCompleted: (data) => {
            setAuth(data.getAuth)
        },
        onError: (errorHandler)
    })
    const [auth, setAuth] = useState<User | null>(null);

    const getUser = () => {
        refetch().
        then((data) => {
            setAuth(data.data.getAuth)
        }).
        catch(errorHandler)
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, getUser }}>
            {children}
        </AuthContext.Provider>
    )
}
