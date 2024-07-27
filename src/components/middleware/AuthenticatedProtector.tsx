import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/use-auth.ts";

interface AuthenticatedProtector {
  children: JSX.Element;
}

export default function AuthenticatedProtector({ children }: AuthenticatedProtector) {
  const { loading, auth, token } = useAuth();

  if (loading || !auth) return <></>;

  if (!token)
    return (
      <Navigate
        to={"/login"}
        replace={true}
      />
    );

  return children;
}
