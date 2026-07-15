from dataclasses import dataclass
from typing import Any, Optional

import MetaTrader5 as mt5


@dataclass(
    frozen=True,
    slots=True,
)
class MovementResult:
    movement_value: Optional[float]
    movement_unit: Optional[str]
    asset_class: Optional[str]
    symbol_digits: Optional[int]
    symbol_point: Optional[float]
    tick_size: Optional[float]
    legacy_profit_pips: Optional[float]


def _normalize_text(
    value: Any,
) -> str:
    if value is None:
        return ""

    return str(value).strip().lower()


def _get_positive_float(
    value: Any,
) -> Optional[float]:
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None

    if number <= 0:
        return None

    return number


def _get_digits(
    symbol_info: Any,
) -> Optional[int]:
    value = getattr(
        symbol_info,
        "digits",
        None,
    )

    try:
        return int(value)
    except (TypeError, ValueError):
        return None


def _get_point(
    symbol_info: Any,
) -> Optional[float]:
    return _get_positive_float(
        getattr(
            symbol_info,
            "point",
            None,
        )
    )


def _get_tick_size(
    symbol_info: Any,
) -> Optional[float]:
    tick_size = _get_positive_float(
        getattr(
            symbol_info,
            "trade_tick_size",
            None,
        )
    )

    if tick_size is not None:
        return tick_size

    return _get_point(symbol_info)


def _is_forex_symbol(
    symbol_info: Any,
) -> bool:
    path = _normalize_text(
        getattr(
            symbol_info,
            "path",
            "",
        )
    )

    calculation_mode = getattr(
        symbol_info,
        "trade_calc_mode",
        None,
    )

    forex_modes = {
        getattr(
            mt5,
            "SYMBOL_CALC_MODE_FOREX",
            None,
        ),
        getattr(
            mt5,
            "SYMBOL_CALC_MODE_FOREX_NO_LEVERAGE",
            None,
        ),
    }

    forex_modes.discard(None)

    return (
        "forex" in path
        or calculation_mode in forex_modes
    )


def _detect_asset_class(
    symbol: str,
    symbol_info: Any,
) -> str:
    path = _normalize_text(
        getattr(
            symbol_info,
            "path",
            "",
        )
    )

    description = _normalize_text(
        getattr(
            symbol_info,
            "description",
            "",
        )
    )

    category_text = " ".join(
        [
            _normalize_text(symbol),
            path,
            description,
        ]
    )

    if _is_forex_symbol(symbol_info):
        return "forex"

    if any(
        keyword in category_text
        for keyword in (
            "crypto",
            "bitcoin",
            "ethereum",
            "btc",
            "eth",
        )
    ):
        return "crypto"

    if any(
        keyword in category_text
        for keyword in (
            "metal",
            "gold",
            "silver",
            "xau",
            "xag",
        )
    ):
        return "metal"

    if any(
        keyword in category_text
        for keyword in (
            "index",
            "indices",
            "cash index",
        )
    ):
        return "index"

    if any(
        keyword in category_text
        for keyword in (
            "stock",
            "stocks",
            "share",
            "shares",
            "equity",
        )
    ):
        return "stock"

    if "cfd" in category_text:
        return "cfd"

    return "other"


def _calculate_price_difference(
    direction: str,
    entry_price: float,
    exit_price: float,
) -> float:
    normalized_direction = (
        direction
        .strip()
        .upper()
    )

    if normalized_direction == "BUY":
        return exit_price - entry_price

    return entry_price - exit_price


def _calculate_forex_pip_size(
    digits: Optional[int],
    point: Optional[float],
) -> Optional[float]:
    if point is None:
        return None

    if digits in (3, 5):
        return point * 10

    return point


def _round_price_movement(
    price_difference: float,
    digits: Optional[int],
) -> float:
    decimal_places = (
        digits
        if digits is not None
        else 8
    )

    return round(
        price_difference,
        decimal_places,
    )


def calculate_movement(
    symbol: str,
    direction: str,
    entry_price: Optional[float],
    exit_price: Optional[float],
) -> MovementResult:
    if (
        entry_price is None
        or exit_price is None
    ):
        return MovementResult(
            movement_value=None,
            movement_unit=None,
            asset_class=None,
            symbol_digits=None,
            symbol_point=None,
            tick_size=None,
            legacy_profit_pips=None,
        )

    symbol_info = mt5.symbol_info(
        symbol,
    )

    if symbol_info is None:
        return MovementResult(
            movement_value=None,
            movement_unit=None,
            asset_class=None,
            symbol_digits=None,
            symbol_point=None,
            tick_size=None,
            legacy_profit_pips=None,
        )

    digits = _get_digits(
        symbol_info,
    )

    point = _get_point(
        symbol_info,
    )

    tick_size = _get_tick_size(
        symbol_info,
    )

    asset_class = _detect_asset_class(
        symbol,
        symbol_info,
    )

    price_difference = (
        _calculate_price_difference(
            direction=direction,
            entry_price=float(entry_price),
            exit_price=float(exit_price),
        )
    )

    if asset_class == "forex":
        pip_size = _calculate_forex_pip_size(
            digits=digits,
            point=point,
        )

        movement_value = (
            round(
                price_difference / pip_size,
                1,
            )
            if pip_size is not None
            else None
        )

        return MovementResult(
            movement_value=movement_value,
            movement_unit="pips",
            asset_class=asset_class,
            symbol_digits=digits,
            symbol_point=point,
            tick_size=tick_size,
            legacy_profit_pips=movement_value,
        )

    movement_value = _round_price_movement(
        price_difference=price_difference,
        digits=digits,
    )

    return MovementResult(
        movement_value=movement_value,
        movement_unit="points",
        asset_class=asset_class,
        symbol_digits=digits,
        symbol_point=point,
        tick_size=tick_size,
        legacy_profit_pips=movement_value,
    )