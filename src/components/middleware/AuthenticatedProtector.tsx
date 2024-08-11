import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/use-auth.ts";
import Loading from "@/components/Loading.tsx";

interface AuthenticatedProtector {
  children: JSX.Element;
}

export default function AuthenticatedProtector({ children }: AuthenticatedProtector) {
  const { loading, auth, token } = useAuth();

  console.log("UNAUTHENTIVCATED", import.meta.env.VITE_ROOT_URL);
  if (loading || !auth) {
    return <Loading />;
  }

  console.log("UNAUTHENTIVCATED2", import.meta.env.VITE_ROOT_URL);
  if (!token)
    return (
      <Navigate
        to={`${import.meta.env.VITE_ROOT_URL}/login`}
        // replace={true}
      />
    );

  return children;
}
