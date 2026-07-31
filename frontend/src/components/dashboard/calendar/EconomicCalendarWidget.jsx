import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    Stack,
    Typography
} from "@mui/material";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { useNavigate } from "react-router-dom";

import {
    WidgetContainer,
    WidgetHeader
} from "../../widgets";

import {
    loadMarketAlerts
} from "../../../services/marketAlertsService";


const IMPACT_COLOR = {
    HIGH: "error",
    MEDIUM: "warning",
    LOW: "success"
};


function formatEventTime(value, timezone) {
    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
        return "—";
    }

    return new Intl.DateTimeFormat(
        "el-GR",
        {
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23",
            timeZone: timezone || "Europe/Athens"
        }
    ).format(parsedDate);
}


function MarketEventRow({
    event,
    timezone
}) {
    return (
        <Box sx={{ py: 1.5 }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 2
                }}
            >
                <Box sx={{ minWidth: 0 }}>
                     <Stack
                         direction="row"
                         spacing={1}
                         useFlexGap
                         sx={{
                             alignItems: "center",
                             flexWrap: "wrap"
                         }}
                     >
                        <Chip
                            label={event.impact}
                            size="small"
                            color={
                                IMPACT_COLOR[event.impact]
                                || "default"
                            }
                        />

                        <Chip
                            label={event.currency}
                            size="small"
                            variant="outlined"
                        />

                        <Typography
                            variant="body2"
                            fontWeight={700}
                            noWrap
                        >
                            {event.event}
                        </Typography>
                    </Stack>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 0.75, display: "block" }}
                    >
                        {event.country}
                        {" · "}
                        {formatEventTime(
                            event.date,
                            timezone
                        )}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        minWidth: 80,
                        textAlign: "right"
                    }}
                >
                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        Actual
                    </Typography>

                    <Typography
                        variant="body2"
                        fontWeight={700}
                        color={
                            event.actual
                                ? "success.main"
                                : "text.secondary"
                        }
                    >
                        {event.actual || "—"}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}


export default function EconomicCalendarWidget() {
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadEvents() {
            try {
                const response = await loadMarketAlerts({
                    limit: 20
                });

                if (!active) {
                    return;
                }

                setData(response);
                setError("");
            } catch (requestError) {
                console.error(
                    "Dashboard market alerts error:",
                    requestError
                );

                if (active) {
                    setError(
                        "Δεν ήταν δυνατή η φόρτωση των οικονομικών γεγονότων."
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadEvents();

        const timer = window.setInterval(
            loadEvents,
            5 * 60 * 1000
        );

        return () => {
            active = false;
            window.clearInterval(timer);
        };
    }, []);

    const events = useMemo(() => {
        if (!Array.isArray(data?.events)) {
            return [];
        }

        return [...data.events]
            .sort((first, second) => {
                const firstDate = new Date(
                    first.date
                ).getTime();

                const secondDate = new Date(
                    second.date
                ).getTime();

                if (firstDate !== secondDate) {
                    return firstDate - secondDate;
                }

                return (
                    Number(second.importance || 0)
                    - Number(first.importance || 0)
                );
            })
            .slice(0, 3);
    }, [data]);

    return (
        <WidgetContainer>
            <WidgetHeader
                title="Upcoming Market Events"
                subtitle="Next important economic announcements."
                action={
                    <WarningAmberIcon
                        color="warning"
                        fontSize="small"
                    />
                }
            />

            {loading && (
                <Box
                    sx={{
                        minHeight: 140,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <CircularProgress size={28} />
                </Box>
            )}

            {!loading && error && (
                <Alert severity="error">
                    {error}
                </Alert>
            )}

            {!loading && !error && events.length === 0 && (
                <Alert severity="info">
                    Δεν υπάρχουν επερχόμενα οικονομικά γεγονότα.
                </Alert>
            )}

            {!loading && !error && events.length > 0 && (
                <Box>
                    {events.map((event, index) => (
                        <Box key={event.id}>
                            {index > 0 && <Divider />}

                            <MarketEventRow
                                event={event}
                                timezone={data?.timezone}
                            />
                        </Box>
                    ))}

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mt: 1
                        }}
                    >
                        <Button
                            size="small"
                            endIcon={
                                <OpenInNewIcon fontSize="small" />
                            }
                            onClick={() => navigate("/")}
                        >
                            View Market Alerts
                        </Button>
                    </Box>
                </Box>
            )}
        </WidgetContainer>
    );
}