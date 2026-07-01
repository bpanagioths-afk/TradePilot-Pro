from datetime import datetime


def calculate_pips(
    direction,
    entry,
    exit_price
):

    if not exit_price:
        return 0

    if direction == "BUY":
        return round(
            (exit_price - entry) * 10000,
            1
        )

    return round(
        (entry - exit_price) * 10000,
        1
    )


def calculate_rr(
    entry,
    sl,
    tp
):

    if not sl or not tp:
        return 0

    risk = abs(entry - sl)

    reward = abs(tp - entry)

    if risk == 0:
        return 0

    return round(
        reward / risk,
        2
    )


def calculate_duration(
    open_time,
    close_time
):

    if not open_time or not close_time:
        return 0

    delta = close_time - open_time

    return int(
        delta.total_seconds() / 60
    )