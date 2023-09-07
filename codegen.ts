import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.GQL_SCHEMA_URL,
  documents: ['src/**/*.graphql'],
  emitLegacyCommonJSImports: false,
  generates: {
    // Types & Resolvers types in general
    'src/api/graphql/types.generated.ts': {
      plugins: ['typescript'],
      config: {
        fetcher: 'graphql-request',
        skipTypename: true, // More readable types
        useIndexSignature: true, //https://github.com/dotansimha/graphql-code-generator/issues/1133
      },
    },

    // Config SDK for each queries.gql file
    'src/api/graphql/sdk.generated.ts': {
      presetConfig: {
        baseTypesPath: 'api/graphql/types.generated.ts',
      },
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
        {
          add: {
            // FIXME: Added no-check while `graphlq-codegen` has a bug with types importing
            // See https://github.com/dotansimha/graphql-code-generator/issues/9046
            content: '// @ts-nocheck',
          },
        },
      ],
      config: {
        skipTypename: true, // More readable types
        useIndexSignature: true, // https://github.com/dotansimha/graphql-code-generator/issues/1133
      },
    },

    // [TEST] graphql-request doesn't support upload for now, we need another way ?
    'src/api/graphql/apollo.generated.ts': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.apollo.generated.ts',
        baseTypesPath: '../types.generated.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        skipTypename: false, // More readable types
      },
    },

    // [LEGACY] Config React Query for each queries.gql file (with hooks)
    // Note: This was used before the SDK was created. There are still parts of the application relying on those.
    'src/api/graphql/gql.generated.ts': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.gql.generated.ts',
        baseTypesPath: '../types.generated.ts',
      },
      plugins: [
        'typescript-operations',
        'typescript-react-query',
        {
          add: {
            // FIXME: Added no-check while `graphlq-codegen` has a bug with types importing
            // See https://github.com/dotansimha/graphql-code-generator/issues/9046
            content: '// @ts-nocheck',
          },
        },
      ],
      config: {
        fetcher: 'graphql-request',
        skipTypename: true, // More readable types
      },
    },
  }
}
 
export default config
