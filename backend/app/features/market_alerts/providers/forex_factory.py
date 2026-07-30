import json
from datetime import date, datetime, timedelta, timezone
from threading import Lock
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from app.features.market_alerts.providers.base import MarketAlertsProvider


class ProviderRequestError(RuntimeError):
    pass


class ForexFactoryProvider(MarketAlertsProvider):
    FEED_URL = (
        "https://nfs.faireconomy.media/"
        "ff_calendar_thisweek.json"
    )

    TIMEOUT_SECONDS = 15
    CACHE_TTL_MINUTES = 5

    _cache_lock = Lock()
    _cache_data: list[dict[str, Any]] | None = None
    _cache_created_at: datetime | None = None

    def fetch_events(
        self,
        start_date: date,
        end_date: date,
    ) -> list[dict[str, Any]]:
        cached_data = self._get_valid_cache()

        if cached_data is not None:
            return cached_data

        try:
            data = self._download_events()
        except ProviderRequestError:
            stale_cache = self._get_stale_cache()

            if stale_cache is not None:
                return stale_cache

            raise

        self._store_cache(data)

        return data

    def _download_events(
        self,
    ) -> list[dict[str, Any]]:
        request = Request(
            self.FEED_URL,
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
            if exc.code == 429:
                raise ProviderRequestError(
                    "Forex Factory rate limit reached."
                ) from exc

            raise ProviderRequestError(
                f"Forex Factory returned HTTP {exc.code}."
            ) from exc

        except URLError as exc:
            raise ProviderRequestError(
                "Forex Factory is currently unavailable."
            ) from exc

        except TimeoutError as exc:
            raise ProviderRequestError(
                "Forex Factory request timed out."
            ) from exc

        try:
            data = json.loads(payload)

        except json.JSONDecodeError as exc:
            raise ProviderRequestError(
                "Forex Factory returned invalid JSON."
            ) from exc

        if not isinstance(data, list):
            raise ProviderRequestError(
                "Forex Factory returned an unexpected response."
            )

        return data

    @classmethod
    def _get_valid_cache(
        cls,
    ) -> list[dict[str, Any]] | None:
        with cls._cache_lock:
            if (
                cls._cache_data is None
                or cls._cache_created_at is None
            ):
                return None

            cache_age = (
                datetime.now(timezone.utc)
                - cls._cache_created_at
            )

            if cache_age > timedelta(
                minutes=cls.CACHE_TTL_MINUTES
            ):
                return None

            return list(cls._cache_data)

    @classmethod
    def _get_stale_cache(
        cls,
    ) -> list[dict[str, Any]] | None:
        with cls._cache_lock:
            if cls._cache_data is None:
                return None

            return list(cls._cache_data)

    @classmethod
    def _store_cache(
        cls,
        data: list[dict[str, Any]],
    ) -> None:
        with cls._cache_lock:
            cls._cache_data = list(data)
            cls._cache_created_at = datetime.now(timezone.utc)