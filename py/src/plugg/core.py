from __future__ import annotations

import json
from typing import Any, Literal, Protocol, TypedDict

PrincipalKind = Literal["user", "agent", "service"]
AuthErrorCode = Literal["invalid_credential", "expired_credential", "unavailable"]


class Principal(TypedDict):
    id: str
    kind: str
    claims: dict[str, Any]


class AuthAdapter(Protocol):
    async def resolve(self, credential: str) -> Principal: ...


class AuthError(Exception):
    def __init__(self, code: AuthErrorCode, message: str) -> None:
        super().__init__(message)
        self.code = code


def principal_to_json(principal: Principal) -> Principal:
    return {
        "id": principal["id"],
        "kind": principal["kind"],
        "claims": principal["claims"],
    }


def canonicalize_principal(principal: Principal) -> str:
    return json.dumps(principal_to_json(principal), sort_keys=True, separators=(",", ":"))


def is_auth_error(error: BaseException) -> bool:
    return isinstance(error, AuthError)
