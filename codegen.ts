import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  //@ts-ignore
  schema: import.meta.env.VITE_GRAPHQL_BACKED_URL,
  documents: "*/**/*.graphql.ts",
  generates: {
    "gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
