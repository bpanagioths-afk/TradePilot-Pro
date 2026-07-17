from datetime import datetime, timedelta, timezone
import os
from typing import Any

import bcrypt
from jose import JWTError, jwt
from dotenv import load_dotenv

load_dotenv()

JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
)


def _get_jwt_secret_key() -> str:

    secret_key = os.getenv("JWT_SECRET_KEY")

    if not secret_key:
        raise RuntimeError("JWT_SECRET_KEY is not set in .env")

    return secret_key


def hash_password(password: str) -> str:

    password_bytes = password.encode("utf-8")

    if len(password_bytes) > 72:
        raise ValueError("Password must not exceed 72 UTF-8 bytes")

    return bcrypt.hashpw(
        password_bytes,
        bcrypt.gensalt(),
    ).decode("utf-8")


def verify_password(
    plain_password: str,
    password_hash: str,
) -> bool:

    try:
        return bcrypt.checkpw(
            plain_password.encode("utf-8"),
            password_hash.encode("utf-8"),
        )
    except (TypeError, ValueError):
        return False


def create_access_token(
    subject: str | int,
    expires_delta: timedelta | None = None,
) -> str:

    now = datetime.now(timezone.utc)
    expires_at = now + (
        expires_delta
        if expires_delta is not None
        else timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    payload: dict[str, Any] = {
        "sub": str(subject),
        "type": "access",
        "iat": now,
        "exp": expires_at,
    }

    return jwt.encode(
        payload,
        _get_jwt_secret_key(),
        algorithm=JWT_ALGORITHM,
    )


def decode_access_token(token: str) -> int:

    try:
        payload = jwt.decode(
            token,
            _get_jwt_secret_key(),
            algorithms=[JWT_ALGORITHM],
        )
    except JWTError as exc:
        raise ValueError("Invalid or expired access token") from exc

    if payload.get("type") != "access":
        raise ValueError("Invalid token type")

    subject = payload.get("sub")

    if subject is None:
        raise ValueError("Access token subject is missing")

    try:
        return int(subject)
    except (TypeError, ValueError) as exc:
        raise ValueError("Access token subject is invalid") from exc
