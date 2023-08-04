import {Navigate} from "react-router-dom";

export default function AuthenticatedProtector({ children } : { children: JSX.Element }){

    return (
        <>
            {
                localStorage.getItem("token") ?
                children :
                <Navigate to={"/login"} replace={true} />

            }
        </>
    )
}
