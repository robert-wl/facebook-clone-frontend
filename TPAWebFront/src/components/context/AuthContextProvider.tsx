import { createContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { User } from "../../../gql/graphql.ts";
import { GET_AUTH } from "../../../lib/query/user/getAuth.graphql.ts";
import { debouncedError } from "../../../controller/errorHandler.ts";

interface AuthContext {
    auth: User | null;
    loading: boolean;
    getUser: (() => Promise<void>) | null;
}

export const AuthContext = createContext<AuthContext>({
    auth: null,
    loading: false,
    getUser: null,
});
export default function AuthContextProvider({ children }: { children: JSX.Element }) {
    const { refetch, loading } = useQuery(GET_AUTH, {
        onCompleted: (data) => {
            setAuth(data.getAuth);
        },
        onError: debouncedError,
        skip: location.pathname == "",
    });
    const [auth, setAuth] = useState<User | null>(null);

    const getUser = async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const data = await refetch().catch(debouncedError);

        if (data) {
            setAuth(data.data.getAuth);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (auth) {
            if (auth.theme == "dark") {
                console.log("hai");
                document.documentElement.style.setProperty("--main-color", "rgb(34, 35, 36, 1)");
                document.documentElement.style.setProperty("--background-color", "#111111");
                document.documentElement.style.setProperty("--color", "rgb(220, 220, 220, 0.8)");
                document.documentElement.style.setProperty("--modal-background-color", "rgb(020, 020, 020, 0.8)");
            } else {
                document.documentElement.style.setProperty("--main-color", "white");
                document.documentElement.style.setProperty("--background-color", "#e9ecf1");
                document.documentElement.style.setProperty("--color", "black");
                document.documentElement.style.setProperty("--modal-background-color", "rgba(255, 255, 255, 0.8)");
            }
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, loading, getUser }}>
            <>{children}</>
        </AuthContext.Provider>
    );
}
