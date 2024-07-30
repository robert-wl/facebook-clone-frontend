import { createContext, ReactNode, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { debouncedError } from "@/controller/errorHandler.ts";
import { UPDATE_THEME } from "@/lib/query/user/updateTheme.graphql.ts";
import { Nullable } from "@/types/utils";
import useAuth from "@/hooks/use-auth.ts";

interface ThemeContext {
  toggleTheme: Nullable<() => void>;
}

export const ThemeContext = createContext<ThemeContext>({
  toggleTheme: null,
});

interface IProps {
  children: ReactNode;
}

export default function ThemeContextProvider({ children }: IProps) {
  const { auth, setAuth } = useAuth();
  const [updateTheme] = useMutation(UPDATE_THEME);

  const toggleTheme = () => {
    if (auth) {
      if (auth.theme == "dark") {
        setAuth?.({ ...auth, theme: "light" });
        updateTheme({
          variables: {
            theme: "light",
          },
        }).catch(debouncedError);
      } else {
        setAuth?.({ ...auth, theme: "dark" });
        updateTheme({
          variables: {
            theme: "dark",
          },
        }).catch(debouncedError);
      }
    }
  };

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
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <>{children}</>
    </ThemeContext.Provider>
  );
}
