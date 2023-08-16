import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider.tsx";

interface AuthenticatedProtector {
    children: JSX.Element;
}

export default function AuthenticatedProtector({ children }: AuthenticatedProtector) {
    const { auth, loading } = useContext(AuthContext);

    if (loading) return <></>;
    return (
        <>
            {localStorage.getItem("token") && auth ? (
                children
            ) : (
                <Navigate
                    to={"/login"}
                    replace={true}
                />
            )}
        </>
    );
}
