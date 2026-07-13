from dataclasses import dataclass, field

from app.services.mt5.aggregator import (
    calculate_entry_volume,
    calculate_exit_volume,
    calculate_remaining_volume,
)
from app.services.mt5.models import PositionData


VALID_DIRECTIONS = {
    "BUY",
    "SELL",
}


@dataclass(slots=True)
class ValidationResult:
    is_valid: bool
    errors: list[str] = field(default_factory=list)


def validate_position(
    position: PositionData,
) -> ValidationResult:
    errors = []

    if position.account_id <= 0:
        errors.append(
            "Invalid MT5 account id."
        )

    if position.position_id <= 0:
        errors.append(
            "Invalid MT5 position id."
        )

    if not position.symbol:
        errors.append(
            "Position symbol is missing."
        )

    if position.direction not in VALID_DIRECTIONS:
        errors.append(
            "Position direction must be BUY or SELL."
        )

    entry_volume = calculate_entry_volume(
        position,
    )

    exit_volume = calculate_exit_volume(
        position,
    )

    remaining_volume = calculate_remaining_volume(
        position,
    )

    if position.open_time is None:
        errors.append(
            "Position open time is missing."
        )

    if position.is_open:
        has_entry_source = (
            bool(position.entry_deals)
            or (
                position.live_entry_price is not None
                and position.live_volume is not None
            )
        )

        if not has_entry_source:
            errors.append(
                "Open position has no entry information."
            )

        if position.live_entry_price is None:
            errors.append(
                "Open position entry price is missing."
            )

        if entry_volume <= 0:
            errors.append(
                "Open position volume must be greater than zero."
            )

        if position.close_time is not None:
            errors.append(
                "Open position cannot have a close time."
            )

        if remaining_volume <= 0:
            errors.append(
                "Open position must have remaining volume."
            )

    else:
        if not position.entry_deals:
            errors.append(
                "Closed position has no entry deals."
            )

        if entry_volume <= 0:
            errors.append(
                "Entry volume must be greater than zero."
            )

        if not position.exit_deals:
            errors.append(
                "Closed position has no exit deals."
            )

        if exit_volume > entry_volume + 0.0000001:
            errors.append(
                "Exit volume exceeds entry volume."
            )

        if position.close_time is None:
            errors.append(
                "Closed position close time is missing."
            )

        if remaining_volume > 0.0000001:
            errors.append(
                "Closed position still has remaining volume."
            )

        if (
            position.open_time is not None
            and position.close_time is not None
            and position.close_time < position.open_time
        ):
            errors.append(
                "Close time cannot be earlier than open time."
            )

    return ValidationResult(
        is_valid=not errors,
        errors=errors,
    )


def validate_positions(
    positions: list[PositionData],
) -> dict[int, ValidationResult]:
    results = {}

    seen_position_ids = set()

    for position in positions:
        if position.position_id in seen_position_ids:
            results[position.position_id] = ValidationResult(
                is_valid=False,
                errors=[
                    "Duplicate position id in synchronization batch."
                ],
            )
            continue

        seen_position_ids.add(
            position.position_id,
        )

        results[position.position_id] = validate_position(
            position,
        )

    return results