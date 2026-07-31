import { useEffect, useMemo, useState } from "react";

import {
    Alert,
    Box,
    CircularProgress,
    Stack,
    Typography
} from "@mui/material";

import PsychologyIcon from "@mui/icons-material/Psychology";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";

import { getPsychologyStats } from "../../../services/dashboardService";

import {
    WidgetContainer,
    WidgetHeader,
    WidgetMetric,
    WidgetMetricGrid
} from "../../widgets";

import {
    normalizePsychologyRows
} from "../../../features/psychology/psychologyUtils";


function getPerformanceStatus(value) {
    const numericValue = Number(value);

    if (numericValue > 0) {
        return "success";
    }

    if (numericValue < 0) {
        return "error";
    }

    return "default";
}


function formatNumber(value, decimals = 1) {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return "—";
    }

    return numericValue.toFixed(decimals);
}


export default function PsychologyWidget() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadPsychologyStats() {
            try {
                setLoading(true);
                setError("");

                const response = await getPsychologyStats();

                if (!active) {
                    return;
                }

                setData(
                    normalizePsychologyRows(response.data)
                );
            } catch (requestError) {
                console.error(requestError);

                if (active) {
                    setError(
                        "Δεν ήταν δυνατή η φόρτωση των δεδομένων ψυχολογίας."
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadPsychologyStats();

        return () => {
            active = false;
        };
    }, []);

    const summary = useMemo(() => {
        if (data.length === 0) {
            return null;
        }

        const bestState = [...data].sort(
            (first, second) =>
                Number(second.value) - Number(first.value)
        )[0];

        const totalTrades = data.reduce(
            (total, item) =>
                total + Number(item.trades || 0),
            0
        );

        return {
            bestState,
            totalTrades,
            statesCount: data.length
        };
    }, [data]);

    return (
        <WidgetContainer>
            <WidgetHeader
                title="Psychology Widget"
                subtitle="Performance by emotional and mental state."
            />

            {loading && (
                <Box
                    sx={{
                        minHeight: 120,
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

            {!loading && !error && !summary && (
                <Stack
                    spacing={1}
                    sx={{
                        minHeight: 120,
                        justifyContent: "center"
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Δεν υπάρχουν ακόμη trades με καταγεγραμμένη
                        ψυχολογική κατάσταση.
                    </Typography>
                </Stack>
            )}

            {!loading && !error && summary && (
                <WidgetMetricGrid
                    columns={1}
                    gap={2}
                    mt={1}
                >
                    <WidgetMetric
                        title="Best Psychology State"
                        value={summary.bestState.name}
                        helperText={
                            `${formatNumber(
                                summary.bestState.value
                            )} ${summary.bestState.unit}`
                        }
                        status={getPerformanceStatus(
                            summary.bestState.value
                        )}
                        trend={
                            <PsychologyIcon fontSize="small" />
                        }
                    />

                    <WidgetMetric
                        title="Psychology Trades"
                        value={summary.totalTrades}
                        helperText={
                            `${summary.statesCount} recorded states`
                        }
                        status="info"
                        trend={
                            <CandlestickChartIcon fontSize="small" />
                        }
                    />

                    <WidgetMetric
                        title="Average Performance"
                        value={
                            `${formatNumber(
                                summary.bestState.average
                            )} ${summary.bestState.unit}`
                        }
                        helperText="Average for the best state"
                        status={getPerformanceStatus(
                            summary.bestState.average
                        )}
                        trend={
                            <TrendingUpIcon fontSize="small" />
                        }
                    />
                </WidgetMetricGrid>
            )}
        </WidgetContainer>
    );
}