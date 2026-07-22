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


def send_password_reset_email(
    recipient_email: str,
    reset_token: str,
) -> None:

    if not RESEND_API_KEY:
        raise RuntimeError(
            "RESEND_API_KEY is not configured."
        )

    recipient = (
        DEV_EMAIL_OVERRIDE
        if DEV_EMAIL_OVERRIDE
        else recipient_email
    )

    reset_link = (
        f"{FRONTEND_URL}/reset-password"
        f"?token={reset_token}"
    )

    resend.Emails.send(
        {
            "from": EMAIL_FROM,
            "to": [recipient],
            "subject": "TradePilot Pro - Password Reset",
            "html": f"""
                <h2>Password Reset</h2>

                <p>
                    A password reset was requested
                    for your account.
                </p>

                <p>
                    Click the link below:
                </p>

                <p>
                    <a href="{reset_link}">
                        Reset Password
                    </a>
                </p>

                <p>
                    If you did not request this,
                    you can safely ignore this email.
                </p>
            """,
        }
    )