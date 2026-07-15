import { Box } from "@mui/material";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PercentIcon from "@mui/icons-material/Percent";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import TimelineIcon from "@mui/icons-material/Timeline";

import {
    WidgetContainer,
    WidgetHeader,
    WidgetMetric,
    WidgetMetricGrid
} from "../../widgets";

import EquityChart from "../../EquityChart";


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


function formatNumber(value, decimals = 2) {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return "—";
    }

    return numericValue.toFixed(decimals);
}


export default function DashboardSummaryWidget({ summary, equity }) {
    const totalProfit = Number(summary?.total_profit);
    const totalPips = Number(summary?.total_pips);
    const averagePips = Number(summary?.average_pips);
    const totalPoints = Number(summary?.total_points);
    const averagePoints = Number(summary?.average_points);

    const hasPips = Number(summary?.pips_trades) > 0;
    const hasPoints = Number(summary?.points_trades) > 0;

    return (
        <Box
            sx={{
                display: "grid",
                gap: 3
            }}
        >
            <WidgetContainer>
                <WidgetHeader
                    title="Performance Overview"
                    subtitle="Key trading performance metrics."
                />

                <WidgetMetricGrid
                    columns={hasPips && hasPoints ? 5 : 4}
                    gap={2}
                    mt={1}
                >
                    <WidgetMetric
                        title="Total Profit"
                        value={`${formatNumber(totalProfit)} €`}
                        helperText="All imported trades"
                        status={getPerformanceStatus(totalProfit)}
                        trend={<AccountBalanceWalletIcon fontSize="small" />}
                    />

                    <WidgetMetric
                        title="Win Rate"
                        value={`${formatNumber(summary?.win_rate)}%`}
                        helperText={`${summary?.wins ?? 0} wins / ${summary?.losses ?? 0} losses`}
                        status="info"
                        trend={<PercentIcon fontSize="small" />}
                    />

                    <WidgetMetric
                        title="Total Trades"
                        value={summary?.total_trades ?? 0}
                        helperText="Manual + MT5 trades"
                        status="warning"
                        trend={<CandlestickChartIcon fontSize="small" />}
                    />

                    {hasPips && (
                        <WidgetMetric
                            title="Forex Pips"
                            value={formatNumber(totalPips, 1)}
                            helperText={`Average: ${formatNumber(averagePips, 1)} · ${summary?.pips_trades ?? 0} trades`}
                            status={getPerformanceStatus(totalPips)}
                            trend={<TimelineIcon fontSize="small" />}
                        />
                    )}

                    {hasPoints && (
                        <WidgetMetric
                            title="Non-Forex Points"
                            value={formatNumber(totalPoints, 2)}
                            helperText={`Average: ${formatNumber(averagePoints, 2)} · ${summary?.points_trades ?? 0} trades`}
                            status={getPerformanceStatus(totalPoints)}
                            trend={<TimelineIcon fontSize="small" />}
                        />
                    )}
                </WidgetMetricGrid>
            </WidgetContainer>

            <WidgetContainer>
                <WidgetHeader
                    title="Equity Curve"
                    subtitle="Cumulative account performance."
                />

                <EquityChart data={equity} />
            </WidgetContainer>
        </Box>
    );
}