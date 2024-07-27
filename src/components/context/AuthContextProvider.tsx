import { createContext, ReactNode, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { User } from "@/gql/graphql.ts";
import { debouncedError } from "@/controller/errorHandler.ts";
import { UPDATE_THEME } from "@/lib/query/user/updateTheme.graphql.ts";
import { Nullable } from "@/types/utils";
import { useSessionStorage } from "usehooks-ts";
import { GET_AUTH } from "@/lib/query/user/getAuth.graphql.ts";

interface AuthContext {
  auth: Nullable<User>;
  token: string;
  loading: boolean;
  getUser: Nullable<() => Promise<void>>;
  setToken: Nullable<(token: string) => void>;
  toggleTheme: Nullable<() => void>;
  logout: Nullable<() => void>;
}

export const AuthContext = createContext<AuthContext>({
  auth: null,
  token: "",
  loading: false,
  getUser: null,
  setToken: null,
  toggleTheme: null,
  logout: null,
});

interface IProps {
  children: ReactNode;
}

export default function AuthContextProvider({ children }: IProps) {
  const [auth, setAuth, removeAuth] = useSessionStorage<Nullable<User>>("auth", null);
  const [token, setToken, removeToken] = useSessionStorage<string>("token", "");
  const [updateTheme] = useMutation(UPDATE_THEME);
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

    console.log("DAT", data);
    setAuth(data.data.getAuth);
  };

  const logout = async () => {
    removeAuth();
    removeToken();
    location.reload();
  };

  const toggleTheme = () => {
    if (auth) {
      if (auth.theme == "dark") {
        setAuth({ ...auth, theme: "light" });
        updateTheme({
          variables: {
            theme: "light",
          },
        }).catch(debouncedError);
      } else {
        setAuth({ ...auth, theme: "dark" });
        updateTheme({
          variables: {
            theme: "dark",
          },
        }).catch(debouncedError);
      }
    }
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

  useEffect(() => {
    if (auth) {
      if (auth.theme == "dark") {
        document.documentElement.style.setProperty("--main-color", "rgb(34, 35, 36, 1)");
        document.documentElement.style.setProperty("--background-color", "#111111");
        document.documentElement.style.setProperty("--color", "rgb(220, 220, 220, 0.8)");
        document.documentElement.style.setProperty("--modal-background-color", "rgb(020, 020, 020, 0.8)");
      } else {
        document.documentElement.style.setProperty("--main-color", "white");
        document.documentElement.style.setProperty("--background-color", "#f0f2f5");
        document.documentElement.style.setProperty("--color", "black");
        document.documentElement.style.setProperty("--modal-background-color", "rgba(255, 255, 255, 0.8)");
      }
    }
  }, [auth?.theme]);

  const value = {
    auth,
    token,
    loading,
    getUser,
    setToken,
    toggleTheme,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      <>{children}</>
    </AuthContext.Provider>
  );
}
