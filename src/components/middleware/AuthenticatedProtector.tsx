import {Navigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "@/components/context/AuthContextProvider.tsx";

interface AuthenticatedProtector {
  children: JSX.Element;
}

export default function AuthenticatedProtector({children}: AuthenticatedProtector) {
  const {loading, auth} = useContext(AuthContext);

  if (loading || !auth) return <></>;

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
