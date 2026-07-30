import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    Alert,
    Box,
    Chip,
    CircularProgress,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Typography
} from "@mui/material";

import WarningIcon from "@mui/icons-material/Warning";
import EventIcon from "@mui/icons-material/Event";

import {
    loadMarketAlerts
} from "../../services/marketAlertsService";


const IMPACT_OPTIONS = [
    {
        value: "ALL",
        label: "Όλες"
    },
    {
        value: "HIGH",
        label: "High"
    },
    {
        value: "MEDIUM",
        label: "Medium"
    },
    {
        value: "LOW",
        label: "Low"
    }
];

const IMPACT_COLOR = {
    HIGH: "error",
    MEDIUM: "warning",
    LOW: "success"
};


function getDateFormatOptions(dateFormat) {
    if (dateFormat === "MM/DD/YYYY") {
        return {
            month: "2-digit",
            day: "2-digit",
            year: "numeric"
        };
    }

    if (dateFormat === "YYYY-MM-DD") {
        return {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        };
    }

    return {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    };
}


function formatEventDate(
    value,
    timezone,
    dateFormat,
    timeFormat
) {
    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
        return value;
    }

    const datePart = new Intl.DateTimeFormat(
        "el-GR",
        {
            ...getDateFormatOptions(dateFormat),
            timeZone: timezone
        }
    ).format(parsedDate);

    const timePart = new Intl.DateTimeFormat(
        "el-GR",
        {
            hour: "2-digit",
            minute: "2-digit",
            hourCycle:
                timeFormat === "12h"
                    ? "h12"
                    : "h23",
            timeZone: timezone
        }
    ).format(parsedDate);

    return `${datePart} · ${timePart}`;
}


function ValueCell({
    label,
    value
}) {
    return (
        <Box>
            <Typography
                variant="caption"
                color="text.secondary"
            >
                {label}
            </Typography>

            <Typography
                variant="body2"
                fontWeight={600}
                sx={{
                    fontVariantNumeric: "tabular-nums"
                }}
            >
                {value || "—"}
            </Typography>
        </Box>
    );
}


function MarketAlertRow({
    alert,
    timezone,
    dateFormat,
    timeFormat
}) {
    return (
        <Box sx={{ px: 2, py: 1.75 }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        sm: "row"
                    },
                    gap: 1.5,
                    justifyContent: "space-between",
                    alignItems: {
                        xs: "flex-start",
                        sm: "center"
                    }
                }}
            >
                <Box sx={{ minWidth: 0 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 1,
                            alignItems: "center",
                            flexWrap: "wrap"
                        }}
                    >
                        <Chip
                            label={alert.impact}
                            size="small"
                            color={
                                IMPACT_COLOR[alert.impact]
                                || "default"
                            }
                            sx={{ fontWeight: 700 }}
                        />

                        <Chip
                            label={alert.currency}
                            size="small"
                            variant="outlined"
                        />

                        <Typography
                            variant="subtitle2"
                            fontWeight={700}
                        >
                            {alert.event}
                        </Typography>
                    </Box>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.75 }}
                    >
                        {alert.country}
                        {" · "}
                        {alert.category}
                        {" · "}
                        {formatEventDate(
                            alert.date,
                            timezone,
                            dateFormat,
                            timeFormat
                        )}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(3, minmax(70px, 1fr))",
                        gap: 2,
                        width: {
                            xs: "100%",
                            sm: "auto"
                        },
                        minWidth: {
                            sm: 260
                        }
                    }}
                >
                    <ValueCell
                        label="Previous"
                        value={alert.previous}
                    />

                    <ValueCell
                        label="Forecast"
                        value={alert.forecast}
                    />

                    <ValueCell
                        label="Actual"
                        value={alert.actual}
                    />
                </Box>
            </Box>
        </Box>
    );
}


export default function MarketAlerts() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [currency, setCurrency] = useState("ALL");
    const [impact, setImpact] = useState("ALL");
    const [category, setCategory] = useState("ALL");

useEffect(() => {
    let isMounted = true;

    async function fetchAlerts() {
        try {
            const response = await loadMarketAlerts();

            if (isMounted) {
                setData(response);
                setError("");
            }
        } catch (requestError) {
            if (isMounted) {
                setError(
                    requestError.response?.data?.detail ||
                    "Δεν ήταν δυνατή η φόρτωση των οικονομικών γεγονότων."
                );
            }
        } finally {
            if (isMounted) {
                setLoading(false);
            }
        }
    }

    fetchAlerts();

    const timer = window.setInterval(
        fetchAlerts,
        5 * 60 * 1000
    );

    return () => {
        isMounted = false;
        window.clearInterval(timer);
    };
}, []);

    const filteredAlerts = useMemo(() => {
        if (!data?.events) {
            return [];
        }

        return data.events.filter((alert) => {
            const currencyMatches =
                currency === "ALL"
                || alert.currency === currency;

            const impactMatches =
                impact === "ALL"
                || alert.impact === impact;

            const categoryMatches =
                category === "ALL"
                || alert.category === category;

            return (
                currencyMatches
                && impactMatches
                && categoryMatches
            );
        });
    }, [
        data,
        currency,
        impact,
        category
    ]);

    return (
        <Paper
            sx={{
                p: {
                    xs: 2,
                    md: 3
                },
                height: "100%",
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
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
                <WarningIcon color="warning" />

                <Box>
                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        Market Alerts
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        Οικονομικό ημερολόγιο σήμερα και αύριο
                    </Typography>
                </Box>
            </Box>

            {error && (
                <Alert
                    severity="error"
                    sx={{ mb: 2 }}
                >
                    {error}
                </Alert>
            )}

            {loading ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1.5,
                        alignItems: "center",
                        py: 2
                    }}
                >
                    <CircularProgress size={22} />

                    <Typography color="text.secondary">
                        Φόρτωση οικονομικών γεγονότων...
                    </Typography>
                </Box>
            ) : (
                <Box
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(3, minmax(0, 1fr))"
                            },
                            gap: 1.5,
                            mb: 2
                        }}
                    >
                        <FormControl
                            size="small"
                            fullWidth
                        >
                            <InputLabel>
                                Νόμισμα
                            </InputLabel>

                            <Select
                                value={currency}
                                label="Νόμισμα"
                                onChange={(event) =>
                                    setCurrency(event.target.value)
                                }
                            >
                                <MenuItem value="ALL">
                                    Όλα
                                </MenuItem>

                                {(data?.currencies || []).map(
                                    (item) => (
                                        <MenuItem
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>

                        <FormControl
                            size="small"
                            fullWidth
                        >
                            <InputLabel>
                                Σημαντικότητα
                            </InputLabel>

                            <Select
                                value={impact}
                                label="Σημαντικότητα"
                                onChange={(event) =>
                                    setImpact(event.target.value)
                                }
                            >
                                {IMPACT_OPTIONS.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl
                            size="small"
                            fullWidth
                        >
                            <InputLabel>
                                Κατηγορία
                            </InputLabel>

                            <Select
                                value={category}
                                label="Κατηγορία"
                                onChange={(event) =>
                                    setCategory(event.target.value)
                                }
                            >
                                <MenuItem value="ALL">
                                    Όλες
                                </MenuItem>

                                {(data?.categories || []).map(
                                    (item) => (
                                        <MenuItem
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 1,
                            alignItems: "center",
                            mb: 1.5
                        }}
                    >
                        <EventIcon
                            fontSize="small"
                            color="action"
                        />

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {filteredAlerts.length}
                            {" "}
                            γεγονότα ·
                            {" "}
                            {data?.timezone}
                        </Typography>
                    </Box>

                    {filteredAlerts.length === 0 ? (
                        <Alert severity="info">
                            Δεν υπάρχουν γεγονότα για τα επιλεγμένα φίλτρα.
                        </Alert>
                    ) : (
                        <Box
                            sx={{
                                border: 1,
                                borderColor: "divider",
                                borderRadius: 2,
                                flex: 1,
                                minHeight: 0,
                                overflowY: "auto",
                                overflowX: "hidden"
                            }}
                        >
                            {filteredAlerts.map(
                                (alert, index) => (
                                    <Box key={alert.id}>
                                        {index > 0 && <Divider />}

                                        <MarketAlertRow
                                            alert={alert}
                                            timezone={
                                                data.timezone
                                            }
                                            dateFormat={
                                                data.date_format
                                            }
                                            timeFormat={
                                                data.time_format
                                            }
                                        />
                                    </Box>
                                )
                            )}
                        </Box>
                    )}
                </Box>
            )}
        </Paper>
    );
}