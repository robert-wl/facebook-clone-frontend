import { createContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { User } from "../../../gql/graphql.ts";
import { GET_AUTH } from "../../../lib/query/user/getAuth.graphql.ts";
import { debouncedError } from "../../controller/errorHandler.ts";
import { UPDATE_THEME } from "../../../lib/query/user/updateTheme.graphql.ts";

interface AuthContext {
    auth: User | null;
    loading: boolean;
    getUser: (() => Promise<void>) | null;
    toggleTheme: (() => void) | null;
}

export const AuthContext = createContext<AuthContext>({
    auth: null,
    loading: false,
    getUser: null,
    toggleTheme: null,
});
export default function AuthContextProvider({ children }: { children: JSX.Element }) {
    const { refetch, loading } = useQuery(GET_AUTH, {
        onCompleted: (data) => {
            setAuth(data.getAuth);
        },
        onError: debouncedError,
        skip: true,
    });
    const [auth, setAuth] = useState<User | null>(null);
    const [updateTheme] = useMutation(UPDATE_THEME);

    const getUser = async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const data = await refetch().catch(debouncedError);
        console.log("hai");
        if (data) {
            setAuth(data.data.getAuth);
        }
    };

    const toggleTheme = () => {
        if (auth) {
            if (auth.theme == "dark") {
                setAuth({ ...auth, theme: "light" });
                updateTheme({
                    variables: {
                        theme: "light",
                    },
                }).catch(debouncedError);
            } else {
                setAuth({ ...auth, theme: "dark" });
                updateTheme({
                    variables: {
                        theme: "dark",
                    },
                }).catch(debouncedError);
            }
        }
    };

    useEffect(() => {
        if (!(location.pathname.includes("login") || location.pathname.includes("register") || location.pathname.includes("forgot") || location.pathname.includes("activate"))) {
            getUser();
        }
    }, []);

    useEffect(() => {
        if (auth) {
            if (auth.theme == "dark") {
                document.documentElement.style.setProperty("--main-color", "rgb(34, 35, 36, 1)");
                document.documentElement.style.setProperty("--background-color", "#111111");
                document.documentElement.style.setProperty("--color", "rgb(220, 220, 220, 0.8)");
                document.documentElement.style.setProperty("--modal-background-color", "rgb(020, 020, 020, 0.8)");
            } else {
                document.documentElement.style.setProperty("--main-color", "white");
                document.documentElement.style.setProperty("--background-color", "#f0f2f5");
                document.documentElement.style.setProperty("--color", "black");
                document.documentElement.style.setProperty("--modal-background-color", "rgba(255, 255, 255, 0.8)");
            }
        }
    }, [auth?.theme]);

    return (
        <AuthContext.Provider value={{ auth, loading, getUser, toggleTheme }}>
            <>{children}</>
        </AuthContext.Provider>
    );
}
