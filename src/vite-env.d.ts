/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_BACKED_URL: string;
  readonly VITE_GRAPHQL_BACKEND_WS_URL: string;
  readonly VITE_ROOT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
