from datetime import date, datetime, timedelta
from typing import Any
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

from app.features.market_alerts.providers.base import MarketAlertsProvider
from app.features.market_alerts.providers.forex_factory import (
    ForexFactoryProvider,
)
from app.features.market_alerts.schemas import (
    MarketAlertEventResponse,
    MarketAlertsResponse,
)
from app.models.user import User


IMPACT_TO_IMPORTANCE = {
    "LOW": 1,
    "MEDIUM": 2,
    "HIGH": 3,
}


def _split_filter(value: str | None) -> set[str]:
    if not value:
        return set()

    return {
        item.strip().upper()
        for item in value.split(",")
        if item.strip()
    }


def _split_category_filter(value: str | None) -> set[str]:
    if not value:
        return set()

    return {
        item.strip().casefold()
        for item in value.split(",")
        if item.strip()
    }


def _safe_timezone(value: str | None) -> ZoneInfo:
    try:
        return ZoneInfo(value or "Europe/Athens")
    except ZoneInfoNotFoundError:
        return ZoneInfo("Europe/Athens")


def _parse_datetime(value: Any) -> datetime | None:
    if not value:
        return None

    text = str(value).strip()

    if not text:
        return None

    try:
        parsed = datetime.fromisoformat(text)
    except ValueError:
        return None

    return parsed


def _clean_optional(value: Any) -> str | None:
    if value is None:
        return None

    cleaned = str(value).strip()

    return cleaned or None


def _resolve_impact(value: Any) -> tuple[int, str]:
    cleaned = (
        _clean_optional(value)
        or "Low"
    ).upper()

    if cleaned not in IMPACT_TO_IMPORTANCE:
        cleaned = "LOW"

    return (
        IMPACT_TO_IMPORTANCE[cleaned],
        cleaned,
    )


def _normalize_event(
    raw_event: dict[str, Any],
    user_timezone: ZoneInfo,
) -> MarketAlertEventResponse | None:
    event_datetime = _parse_datetime(
        raw_event.get("date")
    )

    if event_datetime is None:
        return None

    if event_datetime.tzinfo is None:
        return None

    currency = (
        _clean_optional(raw_event.get("country"))
        or "OTHER"
    ).upper()

    event_name = (
        _clean_optional(raw_event.get("title"))
        or "Economic Event"
    )

    importance, impact = _resolve_impact(
        raw_event.get("impact")
    )

    event_id = (
        f"{currency}-{event_name}-"
        f"{event_datetime.isoformat()}"
    )

    return MarketAlertEventResponse(
        id=event_id,
        date=event_datetime.astimezone(user_timezone),
        country=currency,
        currency=currency,
        category="Economic Calendar",
        event=event_name,
        importance=importance,
        impact=impact,
        actual=_clean_optional(raw_event.get("actual")),
        forecast=_clean_optional(raw_event.get("forecast")),
        previous=_clean_optional(raw_event.get("previous")),
        reference=None,
        source="Forex Factory",
    )


def get_market_alerts(
    current_user: User,
    from_date: date | None = None,
    to_date: date | None = None,
    currencies: str | None = None,
    impacts: str | None = None,
    categories: str | None = None,
    limit: int = 100,
    provider: MarketAlertsProvider | None = None,
) -> MarketAlertsResponse:
    user_timezone = _safe_timezone(
        getattr(current_user, "timezone", None)
    )
    today = datetime.now(user_timezone).date()

    selected_from_date = from_date or today
    selected_to_date = to_date or (today + timedelta(days=1))

    if selected_to_date < selected_from_date:
        raise ValueError(
            "to_date must be on or after from_date."
        )

    active_provider = provider or ForexFactoryProvider()

    raw_events = active_provider.fetch_events(
        start_date=selected_from_date,
        end_date=selected_to_date,
    )

    currency_filter = _split_filter(currencies)
    impact_filter = _split_filter(impacts)
    category_filter = _split_category_filter(categories)

    normalized_events: list[MarketAlertEventResponse] = []
    now = datetime.now(user_timezone)
    for raw_event in raw_events:
        normalized = _normalize_event(
            raw_event=raw_event,
            user_timezone=user_timezone,
        )

        if normalized is None:
            continue
        if normalized.date < (now - timedelta(hours=2)):
            continue

        local_event_date = normalized.date.date()

        if not (
            selected_from_date
            <= local_event_date
            <= selected_to_date
        ):
            continue

        if (
            currency_filter
            and normalized.currency not in currency_filter
        ):
            continue

        if (
            impact_filter
            and normalized.impact not in impact_filter
        ):
            continue

        if (
            category_filter
            and normalized.category.casefold()
            not in category_filter
        ):
            continue

        normalized_events.append(normalized)

    normalized_events.sort(
        key=lambda event: (
            event.date,
            -event.importance,
            event.event,
        )
    )

    limited_events = normalized_events[:limit]

    return MarketAlertsResponse(
        timezone=str(user_timezone),
        time_format=getattr(
            current_user,
            "time_format",
            "24h",
        ),
        date_format=getattr(
            current_user,
            "date_format",
            "DD/MM/YYYY",
        ),
        from_date=selected_from_date.isoformat(),
        to_date=selected_to_date.isoformat(),
        total=len(normalized_events),
        currencies=sorted(
            {
                event.currency
                for event in normalized_events
            }
        ),
        categories=["Economic Calendar"],
        events=limited_events,
    )
