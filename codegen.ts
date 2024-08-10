import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: import.meta.env.VITE_GRAPHQL_BACKEND_URL,
  documents: "*/**/*.graphql.ts",
  generates: {
    "gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
