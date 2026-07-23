import os

import resend


RESEND_API_KEY = os.getenv("RESEND_API_KEY")
EMAIL_FROM = os.getenv(
    "EMAIL_FROM",
    "TradePilot Pro <onboarding@resend.dev>",
)
DEV_EMAIL_OVERRIDE = os.getenv("DEV_EMAIL_OVERRIDE")
FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173",
)

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY


def _ensure_email_is_configured() -> None:
    if not RESEND_API_KEY:
        raise RuntimeError("RESEND_API_KEY is not configured.")


def _get_recipient(recipient_email: str) -> str:
    return DEV_EMAIL_OVERRIDE or recipient_email


def send_username_recovery_email(
    recipient_email: str,
    username: str,
) -> None:
    _ensure_email_is_configured()
    recipient = _get_recipient(recipient_email)

    resend.Emails.send(
        {
            "from": EMAIL_FROM,
            "to": [recipient],
            "subject": "TradePilot Pro - Username Recovery",
            "html": f"""
                <h2>Username Recovery</h2>
                <p>Your TradePilot Pro username is:</p>
                <p><strong>{username}</strong></p>
                <p><a href="{FRONTEND_URL}/login">Open TradePilot Pro</a></p>
                <p>If you did not request this email, you can safely ignore it.</p>
            """,
        }
    )


def send_password_reset_email(
    recipient_email: str,
    reset_token: str,
) -> None:
    _ensure_email_is_configured()
    recipient = _get_recipient(recipient_email)
    reset_link = f"{FRONTEND_URL}/reset-password?token={reset_token}"

    resend.Emails.send(
        {
            "from": EMAIL_FROM,
            "to": [recipient],
            "subject": "TradePilot Pro - Password Reset",
            "html": f"""
                <h2>Password Reset</h2>
                <p>A password reset was requested for your account.</p>
                <p><a href="{reset_link}">Reset Password</a></p>
                <p>If you did not request this, you can safely ignore this email.</p>
            """,
        }
    )
