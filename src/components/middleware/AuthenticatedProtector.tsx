import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/use-auth.ts";
import Loading from "@/components/Loading.tsx";

interface AuthenticatedProtector {
  children: JSX.Element;
}

export default function AuthenticatedProtector({ children }: AuthenticatedProtector) {
  const { loading, auth, token } = useAuth();

  if (loading || !auth) {
    return <Loading />;
  }

  if (!token)
    return (
      <Navigate
        to={`${import.meta.env.VITE_ROOT_URL}/login`}
        // replace={true}
      />
    );

  return children;
}
