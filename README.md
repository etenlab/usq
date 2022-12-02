# USQ

## Generating Types for Proskomma's GraphQL Interface

A type file exists at `./scripts/src/generated/graphql.ts` to define
the types needed to interact with Proskomma queries. To update this
file:

1. Clone [Diegesis Apollo Sanbox](https://github.com/Proskomma/diegesis-apollo-sandbox)

```sh
git clone https://github.com/Proskomma/diegesis-apollo-sandbox.git
```

2. Launch the diegesis server locally:

```sh
npm install # or yarn install
node index.js
```

3. While the Diegesis server is running, run the codegen script in
   this project:

```sh
cd scripts
npm install # or yarn install
npm run codegen
```

This script will then use the [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) to update the `./scripts/src/generated/graphql.ts` file.
