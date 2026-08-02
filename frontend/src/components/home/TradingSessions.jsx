import { useEffect, useMemo, useState } from "react";

import {
    Box,
    Chip,
    Divider,
    Paper,
    Typography
} from "@mui/material";

import PublicIcon from "@mui/icons-material/Public";

import { loadSettings } from "../../services/settingsService";
import { isForexMarketOpen } from "../../utils/marketHours";

const DEFAULT_DISPLAY_TIME_ZONE = "Europe/Athens";

const SESSION_DEFINITIONS = [
    {
        id: "asia",
        name: "Asia Session",
        market: "Tokyo",
        timeZone: "Asia/Tokyo",
        openHour: 9,
        closeHour: 18,
        dotColor: "#22c55e"
    },
    {
        id: "london",
        name: "London Session",
        market: "London",
        timeZone: "Europe/London",
        openHour: 8,
        closeHour: 17,
        dotColor: "#f59e0b"
    },
    {
        id: "new-york",
        name: "New York Session",
        market: "New York",
        timeZone: "America/New_York",
        openHour: 8,
        closeHour: 17,
        dotColor: "#3b82f6"
    }
];

function getTimeParts(date, timeZone) {
    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone,
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
    }).formatToParts(date);

    const values = Object.fromEntries(
        parts
            .filter((part) => part.type !== "literal")
            .map((part) => [part.type, part.value])
    );

    return {
        weekday: values.weekday,
        hour: Number(values.hour),
        minute: Number(values.minute)
    };
}

function isWeekend(weekday) {
    return weekday === "Sat" || weekday === "Sun";
}

function minutesFromMidnight(hour, minute = 0) {
    return (hour * 60) + minute;
}

function getSessionStatus(session, now) {
    if (!isForexMarketOpen(now)) {
        return {
            label: "Closed",
            color: "default"
        };
    }

    const local = getTimeParts(
        now,
        session.timeZone
    );

    if (isWeekend(local.weekday)) {
        return {
            label: "Closed",
            color: "default"
        };
    }

    const currentMinutes = minutesFromMidnight(
        local.hour,
        local.minute
    );

    const openMinutes = minutesFromMidnight(session.openHour);
    const closeMinutes = minutesFromMidnight(session.closeHour);

    if (
        currentMinutes >= openMinutes &&
        currentMinutes < closeMinutes
    ) {
        return {
            label: "Open",
            color: "success"
        };
    }

    const minutesUntilOpen = openMinutes - currentMinutes;

    if (
        minutesUntilOpen > 0 &&
        minutesUntilOpen <= 60
    ) {
        return {
            label: "Opening soon",
            color: "warning"
        };
    }

    return {
        label: "Closed",
        color: "default"
    };
}

function getTimeZoneOffsetMilliseconds(date, timeZone) {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23"
    }).formatToParts(date);

    const values = Object.fromEntries(
        parts
            .filter((part) => part.type !== "literal")
            .map((part) => [part.type, part.value])
    );

    const asUtc = Date.UTC(
        Number(values.year),
        Number(values.month) - 1,
        Number(values.day),
        Number(values.hour),
        Number(values.minute),
        Number(values.second)
    );

    return asUtc - date.getTime();
}

function zonedLocalTimeToUtc(date, timeZone, hour, minute = 0) {
    const dateParts = new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).formatToParts(date);

    const values = Object.fromEntries(
        dateParts
            .filter((part) => part.type !== "literal")
            .map((part) => [part.type, part.value])
    );

    const approximateUtc = new Date(Date.UTC(
        Number(values.year),
        Number(values.month) - 1,
        Number(values.day),
        hour,
        minute,
        0
    ));

    const offset = getTimeZoneOffsetMilliseconds(
        approximateUtc,
        timeZone
    );

    return new Date(approximateUtc.getTime() - offset);
}

function formatInTimeZone(date, displayTimeZone) {
    return new Intl.DateTimeFormat("en-GB", {
        timeZone: displayTimeZone,
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
    }).format(date);
}

function getDisplayHours(session, now, displayTimeZone) {
    const openDate = zonedLocalTimeToUtc(
        now,
        session.timeZone,
        session.openHour
    );

    const closeDate = zonedLocalTimeToUtc(
        now,
        session.timeZone,
        session.closeHour
    );

    return `${formatInTimeZone(openDate, displayTimeZone)} - ${formatInTimeZone(closeDate, displayTimeZone)}`;
}

function getOverlap(now, displayTimeZone) {
    const marketIsOpen =
        isForexMarketOpen(now);

    const london = SESSION_DEFINITIONS.find(
        (session) => session.id === "london"
    );

    const newYork = SESSION_DEFINITIONS.find(
        (session) => session.id === "new-york"
    );

    const londonOpen = zonedLocalTimeToUtc(
        now,
        london.timeZone,
        london.openHour
    );

    const londonClose = zonedLocalTimeToUtc(
        now,
        london.timeZone,
        london.closeHour
    );

    const newYorkOpen = zonedLocalTimeToUtc(
        now,
        newYork.timeZone,
        newYork.openHour
    );

    const newYorkClose = zonedLocalTimeToUtc(
        now,
        newYork.timeZone,
        newYork.closeHour
    );

    const overlapStart = new Date(
        Math.max(
            londonOpen.getTime(),
            newYorkOpen.getTime()
        )
    );

    const overlapEnd = new Date(
        Math.min(
            londonClose.getTime(),
            newYorkClose.getTime()
        )
    );

    const isActive =
        marketIsOpen
        && now.getTime()
            >= overlapStart.getTime()
        && now.getTime()
            < overlapEnd.getTime();

    const minutesUntilStart = Math.floor(
        (overlapStart.getTime() - now.getTime()) / 60000
    );

    let status = {
        label: "Closed",
        color: "default"
    };

    if (isActive) {
        status = {
            label: "Open",
            color: "primary"
        };
    } else if (
        marketIsOpen
        && minutesUntilStart > 0
        && minutesUntilStart <= 60
    ) {
        status = {
            label: "Opening soon",
            color: "warning"
        };
    } else if (
        marketIsOpen
        && minutesUntilStart > 60
    ) {
        status = {
            label: "Later today",
            color: "info"
        };
    }

    return {
        id: "overlap",
        name: "London / New York Overlap",
        market: "High volatility",
        hours: `${formatInTimeZone(overlapStart, displayTimeZone)} - ${formatInTimeZone(overlapEnd, displayTimeZone)}`,
        status,
        dotColor: "#8b5cf6"
    };
}

function SessionRow({
    name,
    market,
    hours,
    status,
    dotColor
}) {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "minmax(190px, 1.4fr) 130px 120px minmax(110px, 0.8fr)"
                },
                alignItems: "center",
                gap: {
                    xs: 1,
                    sm: 2
                },
                px: 2,
                py: 1.5
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1.25,
                    alignItems: "center"
                }}
            >
                <Box
                    sx={{
                        width: 10,
                        height: 10,
                        flexShrink: 0,
                        borderRadius: "50%",
                        bgcolor: dotColor,
                        boxShadow: `0 0 10px ${dotColor}55`
                    }}
                />

                <Typography
                    variant="body1"
                    fontWeight={600}
                >
                    {name}
                </Typography>
            </Box>

            <Chip
                label={status.label}
                color={status.color}
                size="small"
                sx={{
                    justifySelf: {
                        xs: "start",
                        sm: "center"
                    },
                    minWidth: 105,
                    fontWeight: 600
                }}
            />

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    fontVariantNumeric: "tabular-nums"
                }}
            >
                {hours}
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    textAlign: {
                        xs: "left",
                        sm: "right"
                    }
                }}
            >
                {market}
            </Typography>
        </Box>
    );
}

export default function TradingSessions() {
    const [now, setNow] = useState(() => new Date());
    const [displayTimeZone, setDisplayTimeZone] = useState(
        DEFAULT_DISPLAY_TIME_ZONE
    );

    useEffect(() => {
        let isMounted = true;

        async function fetchDisplayTimeZone() {
            try {
                const userSettings = await loadSettings();

                if (
                    isMounted &&
                    typeof userSettings?.timezone === "string" &&
                    userSettings.timezone.trim()
                ) {
                    setDisplayTimeZone(userSettings.timezone);
                }
            } catch {
                if (isMounted) {
                    setDisplayTimeZone(DEFAULT_DISPLAY_TIME_ZONE);
                }
            }
        }

        fetchDisplayTimeZone();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setNow(new Date());
        }, 30000);

        return () => {
            window.clearInterval(timer);
        };
    }, []);

    const sessions = useMemo(() => {
        const standardSessions = SESSION_DEFINITIONS.map(
            (session) => ({
                ...session,
                hours: getDisplayHours(session, now, displayTimeZone),
                status: getSessionStatus(session, now)
            })
        );

        return [
            ...standardSessions,
            getOverlap(now, displayTimeZone)
        ];
    }, [now, displayTimeZone]);

    return (
        <Paper
            sx={{
                p: {
                    xs: 2,
                    md: 3
                },
                overflow: "hidden"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1.25,
                    alignItems: "center",
                    mb: 2
                }}
            >
                <PublicIcon color="primary" />

                <Typography
                    variant="h6"
                    fontWeight={700}
                >
                    Trading Sessions
                </Typography>
            </Box>

            <Box
                sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                    overflow: "hidden"
                }}
            >
                {sessions.map((session, index) => (
                    <Box key={session.id}>
                        {index > 0 && <Divider />}

                        <SessionRow
                            name={session.name}
                            market={session.market}
                            hours={session.hours}
                            status={session.status}
                            dotColor={session.dotColor}
                        />
                    </Box>
                ))}
            </Box>

            <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                    display: "block",
                    mt: 1.5
                }}
            >
                Οι ώρες εμφανίζονται αυτόματα στη ζώνη ώρας {displayTimeZone}, προσαρμόζονται στη θερινή ώρα και κλείνουν βάσει του εβδομαδιαίου ωραρίου Forex.
            </Typography>
        </Paper>
    );
}