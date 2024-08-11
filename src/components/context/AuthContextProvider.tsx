import { createContext, ReactNode, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { User } from "@/gql/graphql.ts";
import { debouncedError } from "@/utils/error-handler.ts";
import { Nullable } from "@/types/utils";
import { useSessionStorage } from "usehooks-ts";
import { GET_AUTH } from "@/lib/query/user/getAuth.graphql.ts";

interface AuthContext {
  auth: Nullable<User>;
  setAuth: Nullable<(auth: Nullable<User>) => void>;
  token: string;
  loading: boolean;
  getUser: Nullable<() => Promise<void>>;
  setToken: Nullable<(token: string) => void>;
  logout: Nullable<() => void>;
}

export const AuthContext = createContext<AuthContext>({
  auth: null,
  setAuth: null,
  token: "",
  loading: false,
  getUser: null,
  setToken: null,
  logout: null,
});

interface IProps {
  children: ReactNode;
}

export default function AuthContextProvider({ children }: IProps) {
  const [auth, setAuth, removeAuth] = useSessionStorage<Nullable<User>>("auth", null);
  const [token, setToken, removeToken] = useSessionStorage<string>("token", "");
  const { refetch, loading } = useQuery(GET_AUTH, {
    onCompleted: (data) => setAuth(data.getAuth),
    onError: debouncedError,
    skip: true,
  });

  const getUser = async () => {
    const data = await refetch().catch(debouncedError);

    if (!data) {
      return;
    }

    setAuth(data.data.getAuth);
  };

  const logout = async () => {
    removeAuth();
    removeToken();
    location.reload();
  };

  useEffect(() => {
    if (
      !(
        location.pathname.includes("login") ||
        location.pathname.includes("register") ||
        location.pathname.includes("forgot") ||
        location.pathname.includes("activate")
      )
    ) {
      getUser();
    }
  }, []);

  const value = {
    auth,
    setAuth,
    token,
    loading,
    getUser,
    setToken,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      <>{children}</>
    </AuthContext.Provider>
  );
}
