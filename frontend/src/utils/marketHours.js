const FOREX_MARKET_TIME_ZONE =
    "America/New_York";

const FOREX_WEEKLY_OPEN_MINUTE =
    (17 * 60) + 5;

const FOREX_WEEKLY_CLOSE_MINUTE =
    (16 * 60) + 59;


function getZonedWeekdayAndMinutes(
    date,
    timeZone
) {
    const parts =
        new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone,
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
                hourCycle: "h23"
            }
        ).formatToParts(date);

    const values = Object.fromEntries(
        parts
            .filter(
                (part) =>
                    part.type !== "literal"
            )
            .map(
                (part) => [
                    part.type,
                    part.value
                ]
            )
    );

    return {
        weekday: values.weekday,
        minutes:
            (Number(values.hour) * 60)
            + Number(values.minute)
    };
}


export function isForexMarketOpen(date) {
    const newYorkTime =
        getZonedWeekdayAndMinutes(
            date,
            FOREX_MARKET_TIME_ZONE
        );

    if (newYorkTime.weekday === "Sat") {
        return false;
    }

    if (newYorkTime.weekday === "Sun") {
        return (
            newYorkTime.minutes
            >= FOREX_WEEKLY_OPEN_MINUTE
        );
    }

    if (newYorkTime.weekday === "Fri") {
        return (
            newYorkTime.minutes
            < FOREX_WEEKLY_CLOSE_MINUTE
        );
    }

    return true;
}
