
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:2468/graphql",
  generates: {
    "types/graphql.d.ts": {
      plugins: ["typescript"],
      config: {
        noExport: true
      }
    }
  }
};

export default config;
