import {Navigate} from "react-router-dom";

export default function UnauthenticatedProtector({ children } : { children: JSX.Element }){

    return (
        <>
            {
                !localStorage.getItem("token") ?
                    children :
                    <Navigate to={"/"} replace={true} />

            }
        </>
    )
}
