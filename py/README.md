# Plugg Py

Plugg is the Python authentication port for agent-fabric primitives. It resolves
opaque credentials into neutral fabric principals without binding the primitive
packages to an identity provider.

This repo publishes the PyPI project `plugg`.

## Install

```sh
uv add plugg
```

## API

The Python and TypeScript packages expose the same concepts:

- `Principal`
- `PrincipalKind`
- `AuthAdapter`
- `AuthError`
- `AuthErrorCode`
- `canonicalize_principal`
- `principal_to_json`
- `is_auth_error`

Python uses snake_case names for functions. TypeScript uses camelCase names.

## Usage

```py
from __future__ import annotations

from plugg import AuthAdapter, AuthError, Principal, canonicalize_principal, is_auth_error


class DemoAuthAdapter:
    async def resolve(self, credential: str) -> Principal:
        if credential != "opaque-dev-credential":
            raise AuthError("invalid_credential", "Unknown credential")

        return {
            "id": "principal_user_01",
            "kind": "user",
            "claims": {"org": "org_demo", "roles": ["developer", "operator"]},
        }


async def resolve_principal(adapter: AuthAdapter) -> str:
    try:
        principal = await adapter.resolve("opaque-dev-credential")
        return canonicalize_principal(principal)
    except AuthError as error:
        if is_auth_error(error):
            return error.code
        raise
```

## Mirror Contract

`plugg` and `plugg` must agree on the canonical principal JSON format.
For the same principal, both languages must produce:

```json
{"claims":{"org":"org_demo","roles":["developer","operator"]},"id":"principal_user_01","kind":"user"}
```

## Development

```sh
uv sync --dev
uv run ruff check .
uv run ruff format --check .
uv run ty check
uv run python -m pytest
uv build --out-dir dist --clear
```
