import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Paper,
    Stack,
    Chip
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

import api from "../api/api";

import {
    ChartContainer,
    ChartTooltip
} from "../components/charts";

function formatAssetClass(value) {
    if (!value) {
        return "Other";
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildMovementChartData(items = [], valueKey = "total") {
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
            value: Number(movement[valueKey] ?? 0),
            total: Number(movement.total ?? 0),
            average: Number(movement.average ?? 0),
            unit: movement.unit ?? "",
            assetClass: movement.asset_class ?? "other",
            trades: Number(movement.trades ?? item.trades ?? 0)
        }));
    });
}

function ReportsChartTooltip({
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
        <Paper
            elevation={6}
            sx={{
                minWidth: 170,
                p: 1.5,
                border: 1,
                borderColor: "divider"
            }}
        >
            <Typography
                variant="subtitle2"
                sx={{ mb: 0.5 }}
            >
                {item.groupLabel}
            </Typography>

            <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                    display: "block",
                    mb: 1
                }}
            >
                {formatAssetClass(item.assetClass)}
            </Typography>

            <Typography variant="body2">
                Value: {item.value.toFixed(2)} {item.unit}
            </Typography>

            <Typography variant="body2">
                Total: {item.total.toFixed(2)} {item.unit}
            </Typography>

            <Typography variant="body2">
                Average: {item.average.toFixed(2)} {item.unit}
            </Typography>

            <Typography variant="body2">
                Trades: {item.trades}
            </Typography>
        </Paper>
    );
}

export default function Reports() {
    const theme = useTheme();

    const [summary, setSummary] = useState(null);
    const [pairs, setPairs] = useState([]);
    const [hours, setHours] = useState([]);

    useEffect(() => {
        api.get("/dashboard/summary")
            .then((res) => setSummary(res.data))
            .catch(console.error);

        api.get("/dashboard/pairs")
            .then((res) => setPairs(res.data))
            .catch(console.error);

        api.get("/dashboard/hours")
            .then((res) => setHours(res.data))
            .catch(console.error);
    }, []);

    if (!summary) {
        return (
            <Typography variant="h5">
                Loading reports...
            </Typography>
        );
    }

    const winLossData = [
        {
            name: "Wins",
            value: summary.wins
        },
        {
            name: "Losses",
            value: summary.losses
        }
    ];

    const pairChartData = buildMovementChartData(
        pairs,
        "total"
    );

    const hourlyChartData = buildMovementChartData(
        hours,
        "average"
    );

    return (
        <Box>
            <Typography variant="h4" mb={3}>
                Reports
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "repeat(4, 1fr)"
                    },
                    gap: 2,
                    mb: 3
                }}
            >
                <Paper sx={{ p: 2 }}>
                    <Typography color="text.secondary">
                        Total Profit
                    </Typography>

                    <Typography
                        variant="h4"
                        color={
                            summary.total_profit >= 0
                                ? "success.main"
                                : "error.main"
                        }
                    >
                        {summary.total_profit} €
                    </Typography>
                </Paper>

                <Paper sx={{ p: 2 }}>
                    <Typography color="text.secondary">
                        Win Rate
                    </Typography>

                    <Typography variant="h4">
                        {summary.win_rate}%
                    </Typography>
                </Paper>

                <Paper sx={{ p: 2 }}>
                    <Typography color="text.secondary">
                        Trades
                    </Typography>

                    <Typography variant="h4">
                        {summary.total_trades}
                    </Typography>
                </Paper>

                <Paper sx={{ p: 2 }}>
                    <Typography color="text.secondary">
                        Best Pair
                    </Typography>

                    <Typography variant="h4">
                        {summary.best_pair || "-"}
                    </Typography>
                </Paper>
            </Box>

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
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" mb={2}>
                        Win / Loss Ratio
                    </Typography>

                    <ChartContainer height={320}>
                        <PieChart>
                            <Pie
                                data={winLossData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={110}
                                label
                            >
                                <Cell
                                    fill={theme.palette.success.main}
                                />
                                <Cell
                                    fill={theme.palette.error.main}
                                />
                            </Pie>

                            <Tooltip
                                content={<ChartTooltip />}
                            />
                        </PieChart>
                    </ChartContainer>
                </Paper>

                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" mb={2}>
                        Pair Performance
                    </Typography>

                    <ChartContainer height={320}>
                        <BarChart data={pairChartData}>
                            <CartesianGrid
                                stroke={theme.palette.divider}
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="label"
                                tick={{
                                    fill: theme.palette.text.secondary
                                }}
                            />

                            <YAxis
                                tick={{
                                    fill: theme.palette.text.secondary
                                }}
                            />

                            <Tooltip
                                content={<ReportsChartTooltip />}
                            />

                            <Bar dataKey="value">
                                {pairChartData.map((item, index) => (
                                    <Cell
                                        key={`pair-${item.label}-${index}`}
                                        fill={
                                            item.value >= 0
                                                ? theme.palette.success.main
                                                : theme.palette.error.main
                                        }
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </Paper>

                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" mb={2}>
                        Hourly Performance
                    </Typography>

                    <ChartContainer height={320}>
                        <BarChart data={hourlyChartData}>
                            <CartesianGrid
                                stroke={theme.palette.divider}
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="label"
                                tick={{
                                    fill: theme.palette.text.secondary
                                }}
                            />

                            <YAxis
                                tick={{
                                    fill: theme.palette.text.secondary
                                }}
                            />

                            <Tooltip
                                content={<ReportsChartTooltip />}
                            />

                            <Bar dataKey="value">
                                {hourlyChartData.map((item, index) => (
                                    <Cell
                                        key={`hour-${item.label}-${index}`}
                                        fill={
                                            item.value >= 0
                                                ? theme.palette.success.main
                                                : theme.palette.error.main
                                        }
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </Paper>

                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" mb={2}>
                        Summary
                    </Typography>

                    <Stack spacing={2}>
                        <Chip
                            label={`Wins: ${summary.wins}`}
                            color="success"
                        />

                        <Chip
                            label={`Losses: ${summary.losses}`}
                            color="error"
                        />

                        <Chip
                            label={`Forex Pips: ${summary.total_pips}`}
                            color="primary"
                        />

                        {summary.points_trades > 0 && (
                            <Chip
                                label={`Non-Forex Points: ${summary.total_points}`}
                                color="warning"
                            />
                        )}

                        <Chip
                            label={`Average Forex Pips: ${summary.average_pips}`}
                            color="secondary"
                        />
                    </Stack>
                </Paper>
            </Box>
        </Box>
    );
}
