import { Navigate } from "react-router-dom";

interface AuthenticatedProtector {
    children: JSX.Element;
}

export default function AuthenticatedProtector({ children }: AuthenticatedProtector) {
    return (
        <>
            {localStorage.getItem("token") ? (
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
