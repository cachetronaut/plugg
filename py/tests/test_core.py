from __future__ import annotations

from plugg import AuthError, Principal, canonicalize_principal, is_auth_error, principal_to_json


def test_canonicalizes_principal() -> None:
    principal: Principal = {
        "id": "principal_user_01",
        "kind": "user",
        "claims": {"roles": ["developer", "operator"], "org": "org_demo"},
    }

    assert canonicalize_principal(principal) == (
        '{"claims":{"org":"org_demo","roles":["developer","operator"]},'
        '"id":"principal_user_01","kind":"user"}'
    )
    assert principal_to_json(principal) == {
        "id": "principal_user_01",
        "kind": "user",
        "claims": {"roles": ["developer", "operator"], "org": "org_demo"},
    }


def test_auth_error_carries_code() -> None:
    error = AuthError("invalid_credential", "Unknown credential")

    assert error.code == "invalid_credential"
    assert str(error) == "Unknown credential"
    assert is_auth_error(error)
    assert not is_auth_error(RuntimeError("other"))
