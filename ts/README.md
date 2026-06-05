# Plugg TS

Plugg is the TypeScript authentication port for agent-fabric primitives. It
resolves opaque credentials into neutral fabric principals without binding the
primitive packages to an identity provider.

This repo publishes the npm package `@cachetronaut/plugg`.

## Install

```sh
pnpm add @cachetronaut/plugg
```

## API

The TypeScript and Python packages expose the same concepts:

- `Principal`
- `PrincipalKind`
- `AuthAdapter`
- `AuthError`
- `AuthErrorCode`
- `canonicalizePrincipal`
- `principalToJson`
- `isAuthError`

TypeScript uses camelCase names. Python uses snake_case names for functions.

## Usage

```ts
import {
  AuthError,
  type AuthAdapter,
  type Principal,
  canonicalizePrincipal,
  isAuthError,
} from "@cachetronaut/plugg";

const adapter: AuthAdapter = {
  async resolve(credential: string): Promise<Principal> {
    if (credential !== "opaque-dev-credential") {
      throw new AuthError("invalid_credential", "Unknown credential");
    }

    return {
      id: "principal_user_01",
      kind: "user",
      claims: { org: "org_demo", roles: ["developer", "operator"] },
    };
  },
};

try {
  const principal = await adapter.resolve("opaque-dev-credential");
  console.log(canonicalizePrincipal(principal));
} catch (error) {
  if (isAuthError(error)) {
    console.error(error.code);
  }
}
```

## Mirror Contract

`plugg` and `plugg` must agree on the canonical principal JSON format.
The shared conformance fixture is:

```text
packages/core/tests/conformance/principal/basic/principal.json
```

For the same principal, both languages must produce:

```json
{"claims":{"org":"org_demo","roles":["developer","operator"]},"id":"principal_user_01","kind":"user"}
```

## Development

```sh
pnpm install --frozen-lockfile
pnpm verify
pnpm build
npm pack --dry-run
```
