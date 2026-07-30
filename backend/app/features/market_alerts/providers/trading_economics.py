import json
import os
from datetime import date
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen

from app.features.market_alerts.providers.base import MarketAlertsProvider


class ProviderConfigurationError(RuntimeError):
    pass


class ProviderRequestError(RuntimeError):
    pass


class TradingEconomicsProvider(MarketAlertsProvider):
    BASE_URL = "https://api.tradingeconomics.com"
    TIMEOUT_SECONDS = 15

    def __init__(self) -> None:
        self.api_key = os.getenv(
            "TRADING_ECONOMICS_API_KEY",
            "",
        ).strip()

        if not self.api_key:
            raise ProviderConfigurationError(
                "TRADING_ECONOMICS_API_KEY is not configured."
            )

    def fetch_events(
        self,
        start_date: date,
        end_date: date,
    ) -> list[dict[str, Any]]:
        start_value = start_date.isoformat()
        end_value = end_date.isoformat()

        path = (
            "/calendar/country/All/"
            f"{quote(start_value)}/{quote(end_value)}"
        )
        query = urlencode(
            {
                "c": self.api_key,
                "f": "json",
            }
        )
        request = Request(
            f"{self.BASE_URL}{path}?{query}",
            headers={
                "Accept": "application/json",
                "User-Agent": "TradePilot-Pro/1.0",
            },
        )

        try:
            with urlopen(
                request,
                timeout=self.TIMEOUT_SECONDS,
            ) as response:
                payload = response.read().decode("utf-8")
        except HTTPError as exc:
            raise ProviderRequestError(
                f"Trading Economics returned HTTP {exc.code}."
            ) from exc
        except URLError as exc:
            raise ProviderRequestError(
                "Trading Economics is currently unavailable."
            ) from exc
        except TimeoutError as exc:
            raise ProviderRequestError(
                "Trading Economics request timed out."
            ) from exc

        try:
            data = json.loads(payload)
        except json.JSONDecodeError as exc:
            raise ProviderRequestError(
                "Trading Economics returned invalid JSON."
            ) from exc

        if isinstance(data, dict):
            message = (
                data.get("message")
                or data.get("Message")
                or data.get("detail")
            )
            raise ProviderRequestError(
                str(message or "Trading Economics returned an invalid response.")
            )

        if not isinstance(data, list):
            raise ProviderRequestError(
                "Trading Economics returned an unexpected response."
            )

        return data
