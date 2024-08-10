import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/use-auth.ts";

export default function UnauthenticatedProtector({ children }: { children: JSX.Element }) {
  const { token } = useAuth();

  if (token)
    return (
      <Navigate
        to={import.meta.env.VITE_ROOT_URL}
        replace={true}
      />
    );

  return children;
}
