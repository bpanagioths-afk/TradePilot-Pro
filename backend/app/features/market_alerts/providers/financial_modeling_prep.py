import json
import os
from datetime import date
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from app.features.market_alerts.providers.base import MarketAlertsProvider


class ProviderConfigurationError(RuntimeError):
    pass


class ProviderRequestError(RuntimeError):
    pass


class FinancialModelingPrepProvider(MarketAlertsProvider):
    BASE_URL = "https://financialmodelingprep.com/stable/economic-calendar"
    TIMEOUT_SECONDS = 15

    def __init__(self) -> None:
        self.api_key = os.getenv("FMP_API_KEY", "").strip()
        if not self.api_key:
            raise ProviderConfigurationError("FMP_API_KEY is not configured.")

    def fetch_events(self, start_date: date, end_date: date) -> list[dict[str, Any]]:
        query = urlencode({
            "from": start_date.isoformat(),
            "to": end_date.isoformat(),
            "apikey": self.api_key,
        })
        request = Request(
            f"{self.BASE_URL}?{query}",
            headers={"Accept": "application/json", "User-Agent": "TradePilot-Pro/1.0"},
        )

        try:
            with urlopen(request, timeout=self.TIMEOUT_SECONDS) as response:
                payload = response.read().decode("utf-8")
        except HTTPError as exc:
            if exc.code == 403:
                message = (
                    "FMP rejected the API key or the current plan does not include "
                    "the Economic Calendar endpoint."
                )
            elif exc.code == 429:
                message = "FMP daily API limit has been reached."
            else:
                message = f"FMP returned HTTP {exc.code}."
            raise ProviderRequestError(message) from exc
        except URLError as exc:
            raise ProviderRequestError("FMP is currently unavailable.") from exc
        except TimeoutError as exc:
            raise ProviderRequestError("FMP request timed out.") from exc

        try:
            data = json.loads(payload)
        except json.JSONDecodeError as exc:
            raise ProviderRequestError("FMP returned invalid JSON.") from exc

        if isinstance(data, dict):
            error_message = (
                data.get("Error Message")
                or data.get("error")
                or data.get("message")
                or data.get("detail")
            )
            raise ProviderRequestError(
                str(error_message or "FMP returned an unexpected response.")
            )

        if not isinstance(data, list):
            raise ProviderRequestError("FMP returned an unexpected response.")

        return data
