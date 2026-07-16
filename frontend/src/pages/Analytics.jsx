import { Box, useTheme } from "@mui/material";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

import PageLayout from "../components/layout/PageLayout";

import {
    WidgetContainer,
    WidgetHeader,
    WidgetMetric,
    WidgetLoading,
    WidgetErrorState,
    WidgetEmptyState
} from "../components/widgets";

import useAnalytics from "../features/analytics/hooks/useAnalytics";
import { ChartContainer, ChartTooltip } from "../components/charts";


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


function getPerformanceColor(theme, value) {
    const status = getPerformanceStatus(value);

    const colorMap = {
        success: theme.palette.success.main,
        error: theme.palette.error.main,
        default: theme.palette.text.secondary
    };

    return colorMap[status];
}


function formatNumber(value, decimals = 2) {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return "—";
    }

    return numericValue.toFixed(decimals);
}

function buildChartData(data = []) {
    return data.flatMap((item) => {
        const breakdown = item.movement_breakdown ?? [];

        return breakdown.map((movement) => ({
            label: item.label,
            value: movement.total,
            average: movement.average,
            unit: movement.unit,
            assetClass: movement.asset_class,
            trades: movement.trades,
        }));
    });
}


function formatAssetClass(value) {
    if (!value) {
        return "Other";
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
}


function buildMovementChartData(items = []) {
    return items.flatMap((item) => {
        const breakdown = Array.isArray(item.movement_breakdown)
            ? item.movement_breakdown
            : [];

        return breakdown.map((movement) => ({
            label:
                breakdown.length > 1
                    ? `${item.label} · ${formatAssetClass(
                        movement.asset_class
                    )}`
                    : String(item.label),
            groupLabel: String(item.label),
            value: Number(movement.total ?? 0),
            average: Number(movement.average ?? 0),
            unit: movement.unit ?? "",
            assetClass: movement.asset_class ?? "other",
            trades: Number(movement.trades ?? 0)
        }));
    });
}


function MovementTooltip({
    active,
    payload
}) {
    if (!active || !payload?.length) {
        return null;
    }

    const item = payload[0]?.payload;

    if (!item) {
        return null;
    }

    return (
        <Box
            sx={{
                bgcolor: "background.paper",
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                p: 1.5,
                boxShadow: 3
            }}
        >
            <Box sx={{ fontWeight: 700 }}>
                {item.groupLabel}
            </Box>

            <Box sx={{ color: "text.secondary" }}>
                {formatAssetClass(item.assetClass)}
            </Box>

            <Box>
                Total: {formatNumber(item.value)} {item.unit}
            </Box>

            <Box>
                Average: {formatNumber(item.average)} {item.unit}
            </Box>

            <Box>
                Trades: {item.trades}
            </Box>
        </Box>
    );
}


function MetricGrid({ children }) {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                    lg: "repeat(4, minmax(0, 1fr))"
                },
                gap: 2
            }}
        >
            {children}
        </Box>
    );
}


function BarChartWidget({
    title,
    subtitle,
    data
}) {
    const theme = useTheme();

    return (
        <WidgetContainer>
            <WidgetHeader
                title={title}
                subtitle={subtitle}
            />

            <Box sx={{ width: "100%", height: 300 }}>
                <ChartContainer height={300}>
                    <BarChart data={data}>
                        <CartesianGrid
                            stroke={theme.palette.divider}
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="label"
                            stroke={theme.palette.text.secondary}
                        />

                        <YAxis
                            stroke={theme.palette.text.secondary}
                        />

                        <Tooltip
                            content={<ChartTooltip />}
                        />

                        <Bar dataKey="value">
                            {data.map((item, index) => (
                                <Cell
                                    key={`${title}-${index}`}
                                    fill={getPerformanceColor(
                                        theme,
                                        item.value
                                    )}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </Box>
        </WidgetContainer>
    );
}
function LineChartWidget({
    title,
    subtitle,
    data,
    xKey,
    valueKey,
    status
}) {
    const theme = useTheme();

    const colorMap = {
        success: theme.palette.success.main,
        error: theme.palette.error.main,
        warning: theme.palette.warning.main,
        info: theme.palette.info.main
    };

    return (
        <WidgetContainer>
            <WidgetHeader
                title={title}
                subtitle={subtitle}
            />

            <Box sx={{ width: "100%", height: 300 }}>
                <ChartContainer height={300}>
                    <LineChart data={data}>
                        <CartesianGrid
                            stroke={theme.palette.divider}
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey={xKey}
                            stroke={theme.palette.text.secondary}
                        />

                        <YAxis
                            stroke={theme.palette.text.secondary}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: theme.palette.background.paper,
                                borderColor: theme.palette.divider,
                                color: theme.palette.text.primary
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey={valueKey}
                            stroke={
                                colorMap[status]
                                || theme.palette.primary.main
                            }
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </Box>
        </WidgetContainer>
    );
}


export default function Analytics() {
    const {
        analytics,
        loading,
        error,
        refresh
    } = useAnalytics();

    if (loading) {
        return (
            <WidgetLoading
                title="Analytics"
                subtitle="Loading historical analysis..."
            />
        );
    }

    if (error) {
        return (
            <WidgetErrorState
                title="Analytics"
                subtitle="Unable to load analytics."
                message="Check the backend connection and try again."
            />
        );
    }

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
        pairs.length > 0
        || hours.length > 0
        || systems.length > 0
        || psychology.length > 0
        || equityCurve.length > 0
        || drawdownCurve.length > 0
        || summary
        || performance
        || risk
        || equity
        || drawdown;

    if (!hasData) {
        return (
            <WidgetEmptyState
                title="Analytics"
                subtitle="No analytics data available."
                message="Analytics will appear after completed trades are synchronized."
            />
        );
    }

    const systemData = systems.map((item) => ({
        ...item,
        system_label:
            item.trading_system_id ?? "Unassigned"
    }));

    const psychologyData = psychology.map((item) => ({
        ...item,
        psychology_label:
            item.psychology_state_id ?? "Unassigned"
    }));

const pairChartData = buildChartData(
    pairs
);

const hourChartData = buildChartData(
    hours
);

const systemChartData = buildChartData(
    systemData
);

const psychologyChartData = buildChartData(
    psychologyData
);

const pairMovementData = buildMovementChartData(
    pairs
);

const hourlyMovementData = buildMovementChartData(
    hours
);

const systemMovementData = buildMovementChartData(
    systemData
);

const psychologyMovementData = buildMovementChartData(
    psychologyData
);


    return (
        <PageLayout
            title="Analytics"
            subtitle="Historical trading performance and behavior analysis."
        >
            <WidgetContainer>
                <WidgetHeader
                    title="Summary"
                    subtitle="Core trading activity metrics."
                />

                <MetricGrid>
                    <WidgetMetric
                        title="Total Trades"
                        value={summary?.total_trades ?? 0}
                        status="info"
                    />

                    <WidgetMetric
                        title="Winning Trades"
                        value={summary?.winning_trades ?? 0}
                        status="success"
                    />

                    <WidgetMetric
                        title="Losing Trades"
                        value={summary?.losing_trades ?? 0}
                        status="error"
                    />

                    <WidgetMetric
                        title="Win Rate"
                        value={`${formatNumber(summary?.win_rate)}%`}
                        status="warning"
                    />
                </MetricGrid>
            </WidgetContainer>

            <WidgetContainer>
                <WidgetHeader
                    title="Performance"
                    subtitle="Profitability and efficiency metrics."
                />

                <MetricGrid>
                    <WidgetMetric
                        title="Total Profit"
                        value={formatNumber(
                            performance?.total_profit
                        )}
                        status="success"
                    />

                    <WidgetMetric
                        title="Total Loss"
                        value={formatNumber(
                            performance?.total_loss
                        )}
                        status="error"
                    />

                    <WidgetMetric
                        title="Net Profit"
                        value={formatNumber(
                            performance?.net_profit
                        )}
                        status={getPerformanceStatus(
                            performance?.net_profit
                        )}
                    />

                    <WidgetMetric
                        title="Profit Factor"
                        value={formatNumber(
                            performance?.profit_factor
                        )}
                        status={
                            Number(performance?.profit_factor) >= 1
                                ? "success"
                                : "error"
                        }
                    />
                </MetricGrid>
            </WidgetContainer>

            <WidgetContainer>
                <WidgetHeader
                    title="Risk"
                    subtitle="Risk, reward and trade quality metrics."
                />

                <MetricGrid>
                    <WidgetMetric
                        title="Average Win"
                        value={formatNumber(risk?.average_win)}
                        status="success"
                    />

                    <WidgetMetric
                        title="Average Loss"
                        value={formatNumber(risk?.average_loss)}
                        status="error"
                    />

                    <WidgetMetric
                        title="Average RR"
                        value={formatNumber(risk?.average_rr)}
                        status="info"
                    />

                    <WidgetMetric
                        title="Average Pips"
                        value={formatNumber(risk?.average_pips)}
                        status={getPerformanceStatus(
                            risk?.average_pips
                        )}
                    />

                    <WidgetMetric
                        title="Average Duration"
                        value={formatNumber(
                            risk?.average_duration
                        )}
                        helperText="Minutes"
                        status="info"
                    />

                    <WidgetMetric
                        title="Largest Win"
                        value={formatNumber(risk?.largest_win)}
                        status="success"
                    />

                    <WidgetMetric
                        title="Largest Loss"
                        value={formatNumber(risk?.largest_loss)}
                        status="error"
                    />
                </MetricGrid>
            </WidgetContainer>

            <WidgetContainer>
                <WidgetHeader
                    title="Equity & Drawdown"
                    subtitle="Account growth and downside exposure."
                />

                <MetricGrid>
                    <WidgetMetric
                        title="Current Equity"
                        value={formatNumber(
                            equity?.current_equity
                        )}
                        status={getPerformanceStatus(
                            equity?.current_equity
                        )}
                    />

                    <WidgetMetric
                        title="Peak Equity"
                        value={formatNumber(
                            equity?.peak_equity
                        )}
                        status="success"
                    />

                    <WidgetMetric
                        title="Maximum Drawdown"
                        value={formatNumber(
                            drawdown?.max_drawdown
                        )}
                        status="error"
                    />

                    <WidgetMetric
                        title="Current Drawdown"
                        value={formatNumber(
                            drawdown?.current_drawdown
                        )}
                        status={
                            Number(drawdown?.current_drawdown) > 0
                                ? "warning"
                                : "success"
                        }
                    />
                </MetricGrid>
            </WidgetContainer>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "1fr 1fr"
                    },
                    gap: 2
                }}
            >
                <LineChartWidget
                    title="Equity Curve"
                    subtitle="Cumulative closed-trade performance."
                    data={equityCurve}
                    xKey="trade"
                    valueKey="equity"
                    status="success"
                />

                <LineChartWidget
                    title="Drawdown Curve"
                    subtitle="Drawdown after each completed trade."
                    data={drawdownCurve}
                    xKey="trade"
                    valueKey="drawdown"
                    status="error"
                />
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "1fr 1fr"
                    },
                    gap: 2
                }}
            >
                <BarChartWidget
                    title="Pair Performance"
                    subtitle="Performance grouped by trading symbol."
                    data={pairChartData}
                    xKey="symbol"
                    valueKey="total_pips"
                />

                <BarChartWidget
                    title="Hourly Performance"
                    subtitle="Average performance by entry hour."
                    data={hourChartData}
                    xKey="hour"
                    valueKey="avg_pips"
                />

                <BarChartWidget
                    title="System Performance"
                    subtitle="Performance grouped by trading system."
                    data={systemChartData}
                    xKey="system_label"
                    valueKey="total_pips"
                />

                <BarChartWidget
                    title="Psychology Performance"
                    subtitle="Performance grouped by psychology state."
                    data={psychologyChartData}
                    xKey="psychology_label"
                    valueKey="total_pips"
                />
            </Box>
        </PageLayout>
    );
}