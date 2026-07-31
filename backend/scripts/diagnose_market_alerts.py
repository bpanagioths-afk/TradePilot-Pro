import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent

if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))


from datetime import datetime
from pprint import pprint
from zoneinfo import ZoneInfo

from app.features.market_alerts.providers.forex_factory import (
    ForexFactoryProvider,
)
from app.features.market_alerts.service import _normalize_event


USER_TIMEZONE = ZoneInfo("Europe/Athens")


def print_section(title: str) -> None:
    print()
    print("=" * 80)
    print(title)
    print("=" * 80)


def has_value(value) -> bool:
    if value is None:
        return False

    return bool(str(value).strip())


def diagnose_raw_feed() -> list[dict]:
    provider = ForexFactoryProvider()

    print_section("1. DOWNLOADING RAW FOREX FACTORY FEED")

    raw_events = provider._download_events()

    print(f"Raw events received: {len(raw_events)}")

    if not raw_events:
        print("The provider returned an empty list.")
        return []

    print()
    print("Keys found in the first raw event:")
    pprint(sorted(raw_events[0].keys()))

    events_with_actual = [
        event
        for event in raw_events
        if has_value(event.get("actual"))
    ]

    events_without_actual = [
        event
        for event in raw_events
        if not has_value(event.get("actual"))
    ]

    print()
    print(f"Events with Actual: {len(events_with_actual)}")
    print(f"Events without Actual: {len(events_without_actual)}")

    if events_with_actual:
        print()
        print("First three raw events containing Actual:")

        for event in events_with_actual[:3]:
            pprint(
                {
                    "title": event.get("title"),
                    "country": event.get("country"),
                    "date": event.get("date"),
                    "impact": event.get("impact"),
                    "actual": event.get("actual"),
                    "forecast": event.get("forecast"),
                    "previous": event.get("previous"),
                }
            )
    else:
        print()
        print(
            "The current raw feed contains no non-empty Actual values."
        )

    return raw_events


def diagnose_normalization(
    raw_events: list[dict],
) -> None:
    print_section("2. TESTING REAL FEED NORMALIZATION")

    raw_events_with_actual = [
        event
        for event in raw_events
        if has_value(event.get("actual"))
    ]

    if not raw_events_with_actual:
        print(
            "No real event with Actual is currently available "
            "for normalization testing."
        )
        return

    raw_event = raw_events_with_actual[0]

    normalized = _normalize_event(
        raw_event=raw_event,
        user_timezone=USER_TIMEZONE,
    )

    print("Raw event:")
    pprint(
        {
            "title": raw_event.get("title"),
            "date": raw_event.get("date"),
            "actual": raw_event.get("actual"),
            "forecast": raw_event.get("forecast"),
            "previous": raw_event.get("previous"),
        }
    )

    print()
    print("Normalized event:")

    if normalized is None:
        print("Normalization returned None.")
        return

    pprint(
        {
            "event": normalized.event,
            "date": normalized.date.isoformat(),
            "actual": normalized.actual,
            "forecast": normalized.forecast,
            "previous": normalized.previous,
        }
    )

    if normalized.actual == str(
        raw_event.get("actual")
    ).strip():
        print()
        print("PASS: Actual survived normalization unchanged.")
    else:
        print()
        print("FAIL: Actual changed or disappeared during normalization.")


def diagnose_controlled_mapping() -> None:
    print_section("3. CONTROLLED ACTUAL MAPPING TEST")

    controlled_event = {
        "title": "TradePilot Diagnostic Event",
        "country": "USD",
        "date": datetime.now(
            USER_TIMEZONE
        ).isoformat(),
        "impact": "High",
        "actual": "3.2%",
        "forecast": "3.0%",
        "previous": "2.9%",
    }

    normalized = _normalize_event(
        raw_event=controlled_event,
        user_timezone=USER_TIMEZONE,
    )

    if normalized is None:
        print("FAIL: Controlled event was rejected.")
        return

    pprint(
        {
            "actual": normalized.actual,
            "forecast": normalized.forecast,
            "previous": normalized.previous,
        }
    )

    if (
        normalized.actual == "3.2%"
        and normalized.forecast == "3.0%"
        and normalized.previous == "2.9%"
    ):
        print()
        print("PASS: Backend mapping preserves all three values.")
    else:
        print()
        print("FAIL: Controlled values were not preserved.")


def diagnose_cache() -> None:
    print_section("4. PROVIDER CACHE STATUS")

    cache_created_at = (
        ForexFactoryProvider._cache_created_at
    )

    cache_data = ForexFactoryProvider._cache_data

    print(f"Cache created at: {cache_created_at}")

    if cache_data is None:
        print("Cache currently contains no data.")
        return

    print(f"Cached events: {len(cache_data)}")

    cached_actual_count = sum(
        1
        for event in cache_data
        if has_value(event.get("actual"))
    )

    print(
        "Cached events with Actual: "
        f"{cached_actual_count}"
    )


def main() -> None:
    try:
        raw_events = diagnose_raw_feed()

        diagnose_normalization(
            raw_events,
        )

        diagnose_controlled_mapping()

        diagnose_cache()

        print_section("DIAGNOSTIC COMPLETED")

    except Exception as exc:
        print_section("DIAGNOSTIC FAILED")
        print(
            f"{type(exc).__name__}: {exc}"
        )
        raise


if __name__ == "__main__":
    main()