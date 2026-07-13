import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Paper,
    Typography
} from "@mui/material";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

import useAnalytics from "../features/analytics/hooks/useAnalytics";

function BarChartCard({ title, data, xKey, barKey }) {
    return (
        <Paper sx={{ p: 3, height: 380 }}>
            <Typography variant="h6" mb={2}>
                {title}
            </Typography>

            <ResponsiveContainer width="100%" height="85%">
                <BarChart data={data}>
                    <CartesianGrid />
                    <XAxis dataKey={xKey} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey={barKey} />
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
}

function LineChartCard({ title, data, xKey, lineKey }) {
    return (
        <Paper sx={{ p: 3, height: 380 }}>
            <Typography variant="h6" mb={2}>
                {title}
            </Typography>

            <ResponsiveContainer width="100%" height="85%">
                <LineChart data={data}>
                    <CartesianGrid />
                    <XAxis dataKey={xKey} />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey={lineKey}
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    );
}

function MetricCard({ title, value, suffix = "" }) {
    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">
                {title}
            </Typography>

            <Typography variant="h5">
                {value ?? "—"}
                {value !== null && value !== undefined ? suffix : ""}
            </Typography>
        </Paper>
    );
}

export default function Analytics() {
    const {
        analytics,
        loading,
        error,
        refresh
    } = useAnalytics();

    const {
        pairs,
        hours,
        systems,
        psychology,
        summary,
        performance,
        risk,
        equity,
        drawdown,
        equityCurve,
        drawdownCurve
    } = analytics;

    const hasData =
        pairs.length > 0 ||
        hours.length > 0 ||
        systems.length > 0 ||
        psychology.length > 0 ||
        equityCurve.length > 0 ||
        drawdownCurve.length > 0 ||
        summary ||
        performance ||
        risk ||
        equity ||
        drawdown;

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box>
                <Typography variant="h4" mb={3}>
                    Analytics
                </Typography>

                <Alert
                    severity="error"
                    action={
                        <Button
                            color="inherit"
                            size="small"
                            onClick={refresh}
                        >
                            Retry
                        </Button>
                    }
                >
                    Unable to load analytics data.
                </Alert>
            </Box>
        );
    }

    if (!hasData) {
        return (
            <Box>
                <Typography variant="h4" mb={3}>
                    Analytics
                </Typography>

                <Alert severity="info">
                    No analytics data is available yet.
                </Alert>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4" mb={3}>
                Analytics
            </Typography>

            <Typography variant="h6" mb={2}>
                Summary
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        lg: "repeat(4, 1fr)"
                    },
                    gap: 2,
                    mb: 4
                }}
            >
                <MetricCard
                    title="Total Trades"
                    value={summary?.total_trades}
                />

                <MetricCard
                    title="Winning Trades"
                    value={summary?.winning_trades}
                />

                <MetricCard
                    title="Losing Trades"
                    value={summary?.losing_trades}
                />

                <MetricCard
                    title="Win Rate"
                    value={summary?.win_rate}
                    suffix="%"
                />
            </Box>

            <Typography variant="h6" mb={2}>
                Performance
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        lg: "repeat(4, 1fr)"
                    },
                    gap: 2,
                    mb: 4
                }}
            >
                <MetricCard
                    title="Total Profit"
                    value={performance?.total_profit}
                />

                <MetricCard
                    title="Total Loss"
                    value={performance?.total_loss}
                />

                <MetricCard
                    title="Net Profit"
                    value={performance?.net_profit}
                />

                <MetricCard
                    title="Profit Factor"
                    value={performance?.profit_factor}
                />
            </Box>

            <Typography variant="h6" mb={2}>
                Risk
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        lg: "repeat(4, 1fr)"
                    },
                    gap: 2,
                    mb: 4
                }}
            >
                <MetricCard
                    title="Average Win"
                    value={risk?.average_win}
                />

                <MetricCard
                    title="Average Loss"
                    value={risk?.average_loss}
                />

                <MetricCard
                    title="Average RR"
                    value={risk?.average_rr}
                />

                <MetricCard
                    title="Average Pips"
                    value={risk?.average_pips}
                />

                <MetricCard
                    title="Average Duration"
                    value={risk?.average_duration}
                />

                <MetricCard
                    title="Largest Win"
                    value={risk?.largest_win}
                />

                <MetricCard
                    title="Largest Loss"
                    value={risk?.largest_loss}
                />
            </Box>

            <Typography variant="h6" mb={2}>
                Equity & Drawdown
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        lg: "repeat(4, 1fr)"
                    },
                    gap: 2,
                    mb: 4
                }}
            >
                <MetricCard
                    title="Current Equity"
                    value={equity?.current_equity}
                />

                <MetricCard
                    title="Peak Equity"
                    value={equity?.peak_equity}
                />

                <MetricCard
                    title="Maximum Drawdown"
                    value={drawdown?.max_drawdown}
                />

                <MetricCard
                    title="Current Drawdown"
                    value={drawdown?.current_drawdown}
                />
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "1fr 1fr"
                    },
                    gap: 3,
                    mb: 4
                }}
            >
                <LineChartCard
                    title="Equity Curve"
                    data={equityCurve}
                    xKey="trade"
                    lineKey="equity"
                />

                <LineChartCard
                    title="Drawdown Curve"
                    data={drawdownCurve}
                    xKey="trade"
                    lineKey="drawdown"
                />
            </Box>

            <Typography variant="h6" mb={2}>
                Performance Charts
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "1fr 1fr"
                    },
                    gap: 3
                }}
            >
                <BarChartCard
                    title="Pair Performance"
                    data={pairs}
                    xKey="symbol"
                    barKey="total_pips"
                />

                <BarChartCard
                    title="Hourly Performance"
                    data={hours}
                    xKey="hour"
                    barKey="avg_pips"
                />

                <BarChartCard
                    title="System Performance"
                    data={systems}
                    xKey="trading_system_id"
                    barKey="total_pips"
                />

                <BarChartCard
                    title="Psychology Performance"
                    data={psychology}
                    xKey="psychology_state_id"
                    barKey="total_pips"
                />
            </Box>
        </Box>
    );
}