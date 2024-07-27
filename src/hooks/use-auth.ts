import { useContext } from "react";
import { AuthContext } from "@/components/context/AuthContextProvider.tsx";

export default function useAuth() {
  return useContext(AuthContext);
}
