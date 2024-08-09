import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo/handler.ts";
import AuthContextProvider from "./components/context/AuthContextProvider.tsx";
import ThemeContextProvider from "@/components/context/ThemeContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <ThemeContextProvider>
          <BrowserRouter basename={import.meta.env.VITE_ROOT_URL}>
            <App />
          </BrowserRouter>
        </ThemeContextProvider>
      </AuthContextProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
