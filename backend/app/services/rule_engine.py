def _normalize_session_name(
    session_name: str | None,
) -> str | None:
    if not session_name:
        return None

    normalized_value = (
        str(session_name)
        .strip()
        .lower()
    )

    session_aliases = {
        "asia": "asia",
        "asia session": "asia",
        "asian": "asia",
        "asian session": "asia",

        "london": "london",
        "london session": "london",

        "new york": "new_york",
        "new york session": "new_york",
        "newyork": "new_york",
        "newyork session": "new_york",

        "overlap": "overlap",
        "london / new york overlap": "overlap",
        "london-new york overlap": "overlap",
        "london new york overlap": "overlap",
        "new york overlap": "overlap",
    }

    return session_aliases.get(
        normalized_value
    )


def evaluate_trade(
    trade,
    trading_plan,
    trades_today_count=0,
    has_high_impact_news=False,
):
    score = 100

    violations = []
    warnings = []
    successes = []

    # Rule 1: Minimum RR
    if (
        trading_plan.minimum_rr
        is not None
        and trade.risk_reward
        is not None
    ):
        if (
            trade.risk_reward
            < trading_plan.minimum_rr
        ):
            score -= 20

            violations.append(
                "Risk Reward is below "
                "trading plan minimum"
            )
        else:
            successes.append(
                "Risk Reward is acceptable"
            )

    # Rule 2: Trading Session
    if trade.session_name:
        normalized_session = (
            _normalize_session_name(
                trade.session_name
            )
        )

        allowed = False

        if (
            normalized_session == "asia"
            and trading_plan.session_asia
        ):
            allowed = True

        elif (
            normalized_session == "london"
            and trading_plan.session_london
        ):
            allowed = True

        elif (
            normalized_session
            == "new_york"
            and trading_plan.session_newyork
        ):
            allowed = True

        elif (
            normalized_session
            == "overlap"
            and trading_plan.session_overlap
        ):
            allowed = True

        if normalized_session is None:
            score -= 15

            violations.append(
                "Trade session is not "
                "recognized"
            )

        elif not allowed:
            score -= 15

            violations.append(
                "Trade session is not allowed "
                "by trading plan"
            )

        else:
            successes.append(
                "Trade session is allowed"
            )

    # Rule 3: Maximum trades per day
    if (
        trading_plan.maximum_trades_day
        is not None
    ):
        if (
            trades_today_count
            > trading_plan.maximum_trades_day
        ):
            score -= 20

            violations.append(
                "Maximum trades per day "
                "exceeded"
            )
        else:
            successes.append(
                "Trades per day are "
                "within limit"
            )

    # Rule 4: High impact news
    if has_high_impact_news:
        score -= 25

        warnings.append(
            "High impact news detected "
            "near trade time"
        )
    else:
        successes.append(
            "No high impact news detected"
        )

    # Rule 5: Risk per trade placeholder
    warnings.append(
        "Risk per trade check is pending "
        "position size module"
    )

    if score < 0:
        score = 0

    passed = len(violations) == 0

    return {
        "score": score,
        "passed": passed,
        "violations": violations,
        "warnings": warnings,
        "successes": successes,
    }