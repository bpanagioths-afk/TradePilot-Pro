import {
    Alert,
    Box,
    CircularProgress,
    Typography
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import BalanceIcon from "@mui/icons-material/Balance";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import {
    WidgetContainer,
    WidgetHeader,
    WidgetMetric,
    WidgetMetricGrid
} from "../../widgets";

import {
    usePortfolio
} from "../../../features/portfolio";


function formatNumber(value, decimals = 2) {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return "—";
    }

    return numericValue.toFixed(decimals);
}


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


export default function RiskWidget() {
    const {
        portfolio,
        loading,
        error
    } = usePortfolio();

    const risk = portfolio?.risk;
    const totalTrades = Number(
        portfolio?.summary?.total_trades ?? 0
    );

    return (
        <WidgetContainer>
            <WidgetHeader
                title="Risk Overview"
                subtitle="Average risk and outcome statistics."
            />

            {loading && (
                <Box
                    sx={{
                        minHeight: 180,
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
                    Δεν ήταν δυνατή η φόρτωση των δεδομένων risk.
                </Alert>
            )}

            {!loading && !error && totalTrades === 0 && (
                <Alert severity="info">
                    Δεν υπάρχουν ακόμη trades διαθέσιμα στο Portfolio
                    για υπολογισμό risk.
                </Alert>
            )}

            {!loading && !error && totalTrades > 0 && risk && (
                <WidgetMetricGrid
                    columns={2}
                    gap={2}
                    mt={1}
                >
                    <WidgetMetric
                        title="Average Win"
                        value={`${formatNumber(risk.average_win)} €`}
                        helperText="Average profitable trade"
                        status={getPerformanceStatus(
                            risk.average_win
                        )}
                        trend={
                            <TrendingUpIcon fontSize="small" />
                        }
                    />

                    <WidgetMetric
                        title="Average Loss"
                        value={`${formatNumber(risk.average_loss)} €`}
                        helperText="Average losing trade"
                        status={
                            Number(risk.average_loss) > 0
                                ? "error"
                                : "default"
                        }
                        trend={
                            <TrendingDownIcon fontSize="small" />
                        }
                    />

                    <WidgetMetric
                        title="Average R:R"
                        value={formatNumber(risk.average_rr)}
                        helperText="Average risk/reward ratio"
                        status={getPerformanceStatus(
                            risk.average_rr
                        )}
                        trend={
                            <BalanceIcon fontSize="small" />
                        }
                    />

                    <WidgetMetric
                        title="Largest Loss"
                        value={`${formatNumber(risk.largest_loss)} €`}
                        helperText="Largest recorded loss"
                        status={
                            Number(risk.largest_loss) > 0
                                ? "error"
                                : "default"
                        }
                        trend={
                            <WarningAmberIcon fontSize="small" />
                        }
                    />
                </WidgetMetricGrid>
            )}

            {!loading
                && !error
                && totalTrades > 0
                && !risk && (
                    <Typography color="text.secondary">
                        Δεν υπάρχουν διαθέσιμα risk calculations.
                    </Typography>
                )}
        </WidgetContainer>
    );
}