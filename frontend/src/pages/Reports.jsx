import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Paper,
    Stack,
    Divider
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

    return (
        value.charAt(0).toUpperCase()
        + value.slice(1)
    );
}


function formatNumber(value, decimals = 2) {
    const numberValue = Number(value ?? 0);

    return numberValue.toLocaleString(
        "el-GR",
        {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }
    );
}


function buildMovementChartData(
    items = [],
    valueKey = "total"
) {
    return items.flatMap((item) => {
        const breakdown =
            Array.isArray(
                item.movement_breakdown
            )
                ? item.movement_breakdown
                : [];

        return breakdown.map(
            (movement) => ({
                label:
                    breakdown.length > 1
                        ? `${item.label} · ${formatAssetClass(
                            movement.asset_class
                        )}`
                        : String(item.label),
                groupLabel:
                    String(item.label),
                value:
                    Number(
                        movement[valueKey]
                        ?? 0
                    ),
                total:
                    Number(
                        movement.total
                        ?? 0
                    ),
                average:
                    Number(
                        movement.average
                        ?? 0
                    ),
                unit:
                    movement.unit
                    ?? "",
                assetClass:
                    movement.asset_class
                    ?? "other",
                trades:
                    Number(
                        movement.trades
                        ?? item.trades
                        ?? 0
                    )
            })
        );
    });
}


function ReportsChartTooltip({
    active,
    payload
}) {
    if (
        !active
        || !payload?.length
    ) {
        return null;
    }

    const item =
        payload[0]?.payload;

    if (!item) {
        return null;
    }

    return (
        <Paper
            elevation={6}
            sx={{
                minWidth: 190,
                p: 1.75,
                border: 1,
                borderColor: "divider",
                borderRadius: 2
            }}
        >
            <Typography
                variant="subtitle2"
                fontWeight={800}
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
                {formatAssetClass(
                    item.assetClass
                )}
            </Typography>

            <Typography variant="body2">
                Value:{" "}
                {formatNumber(item.value)}{" "}
                {item.unit}
            </Typography>

            <Typography variant="body2">
                Total:{" "}
                {formatNumber(item.total)}{" "}
                {item.unit}
            </Typography>

            <Typography variant="body2">
                Average:{" "}
                {formatNumber(item.average)}{" "}
                {item.unit}
            </Typography>

            <Typography variant="body2">
                Trades: {item.trades}
            </Typography>
        </Paper>
    );
}

function SummaryRow({
    label,
    value,
    valueColor = "text.primary"
}) {
    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{
                minHeight: 44,
                px: 1.5,
                py: 1,
                borderRadius: 2,
                backgroundColor: "action.hover",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <Typography
                variant="body2"
                color="text.secondary"
            >
                {label}
            </Typography>

            <Typography
                fontWeight={800}
                color={valueColor}
                sx={{
                    textAlign: "right"
                }}
            >
                {value}
            </Typography>
        </Stack>
    );
}


export default function Reports() {
    const theme = useTheme();

    const [summary, setSummary] =
        useState(null);

    const [pairs, setPairs] =
        useState([]);

    const [hours, setHours] =
        useState([]);

    useEffect(() => {
        api
            .get("/dashboard/summary")
            .then((res) =>
                setSummary(res.data)
            )
            .catch(console.error);

        api
            .get("/dashboard/pairs")
            .then((res) =>
                setPairs(res.data)
            )
            .catch(console.error);

        api
            .get("/dashboard/hours")
            .then((res) =>
                setHours(res.data)
            )
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

    const pairChartData =
        buildMovementChartData(
            pairs,
            "total"
        );

    const hourlyChartData =
        buildMovementChartData(
            hours,
            "average"
        );

    const totalProfit =
        Number(
            summary.total_profit
            ?? 0
        );

    const winRate =
        Number(
            summary.win_rate
            ?? 0
        );

    return (
        <Box>
            <Typography
                variant="h4"
                mb={3}
            >
                Reports
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
                    mb: 3
                }}
            >
                <Paper sx={{ p: 2.5 }}>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        Total Profit
                    </Typography>

                    <Typography
                        variant="h4"
                        fontWeight={800}
                        color={
                            totalProfit >= 0
                                ? "success.main"
                                : "error.main"
                        }
                        sx={{ mt: 0.75 }}
                    >
                        {formatNumber(
                            totalProfit
                        )}{" "}
                        €
                    </Typography>
                </Paper>

                <Paper sx={{ p: 2.5 }}>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        Win Rate
                    </Typography>

                    <Typography
                        variant="h4"
                        fontWeight={800}
                        sx={{ mt: 0.75 }}
                    >
                        {formatNumber(
                            winRate
                        )}%
                    </Typography>
                </Paper>

                <Paper sx={{ p: 2.5 }}>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        Trades
                    </Typography>

                    <Typography
                        variant="h4"
                        fontWeight={800}
                        sx={{ mt: 0.75 }}
                    >
                        {summary.total_trades}
                    </Typography>
                </Paper>

                <Paper sx={{ p: 2.5 }}>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        Best Pair
                    </Typography>

                    <Typography
                        variant="h4"
                        fontWeight={800}
                        sx={{ mt: 0.75 }}
                    >
                        {summary.best_pair
                            || "—"}
                    </Typography>
                </Paper>
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "1fr 1fr"
                    },
                    gap: 3
                }}
            >
                <Paper sx={{ p: 3 }}>
                    <Typography
                        variant="h6"
                        fontWeight={700}
                        mb={2}
                    >
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
                                    fill={
                                        theme.palette
                                            .success
                                            .main
                                    }
                                />

                                <Cell
                                    fill={
                                        theme.palette
                                            .error
                                            .main
                                    }
                                />
                            </Pie>

                            <Tooltip
                                content={
                                    <ChartTooltip />
                                }
                            />
                        </PieChart>
                    </ChartContainer>
                </Paper>

                <Paper sx={{ p: 3 }}>
                    <Typography
                        variant="h6"
                        fontWeight={700}
                        mb={2}
                    >
                        Pair Performance
                    </Typography>

                    <ChartContainer height={320}>
                        <BarChart
                            data={pairChartData}
                        >
                            <CartesianGrid
                                stroke={
                                    theme.palette
                                        .divider
                                }
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="label"
                                tick={{
                                    fill:
                                        theme.palette
                                            .text
                                            .secondary
                                }}
                            />

                            <YAxis
                                tick={{
                                    fill:
                                        theme.palette
                                            .text
                                            .secondary
                                }}
                            />

                            <Tooltip
                                content={
                                    <ReportsChartTooltip />
                                }
                            />

                            <Bar dataKey="value">
                                {pairChartData.map(
                                    (
                                        item,
                                        index
                                    ) => (
                                        <Cell
                                            key={
                                                `pair-${item.label}-${index}`
                                            }
                                            fill={
                                                item.value
                                                >= 0
                                                    ? theme
                                                        .palette
                                                        .success
                                                        .main
                                                    : theme
                                                        .palette
                                                        .error
                                                        .main
                                            }
                                        />
                                    )
                                )}
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </Paper>

                <Paper sx={{ p: 3 }}>
                    <Typography
                        variant="h6"
                        fontWeight={700}
                        mb={2}
                    >
                        Hourly Performance
                    </Typography>

                    <ChartContainer height={320}>
                        <BarChart
                            data={hourlyChartData}
                        >
                            <CartesianGrid
                                stroke={
                                    theme.palette
                                        .divider
                                }
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="label"
                                tick={{
                                    fill:
                                        theme.palette
                                            .text
                                            .secondary
                                }}
                            />

                            <YAxis
                                tick={{
                                    fill:
                                        theme.palette
                                            .text
                                            .secondary
                                }}
                            />

                            <Tooltip
                                content={
                                    <ReportsChartTooltip />
                                }
                            />

                            <Bar dataKey="value">
                                {hourlyChartData.map(
                                    (
                                        item,
                                        index
                                    ) => (
                                        <Cell
                                            key={
                                                `hour-${item.label}-${index}`
                                            }
                                            fill={
                                                item.value
                                                >= 0
                                                    ? theme
                                                        .palette
                                                        .success
                                                        .main
                                                    : theme
                                                        .palette
                                                        .error
                                                        .main
                                            }
                                        />
                                    )
                                )}
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </Paper>

                <Paper sx={{ p: 3 }}>
                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        Summary
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Συνοπτική εικόνα της
                        απόδοσης των συναλλαγών.
                    </Typography>

                    <Divider sx={{ my: 2.5 }} />

                    <Stack spacing={1.25}>
                        <SummaryRow
                            label="Κερδισμένα Trades"
                            value={summary.wins}
                            valueColor="success.main"
                        />

                        <SummaryRow
                            label="Χαμένα Trades"
                            value={summary.losses}
                            valueColor="error.main"
                        />

                        <SummaryRow
                            label="Win Rate"
                            value={`${formatNumber(
                                winRate
                            )}%`}
                        />

                        <SummaryRow
                            label="Forex Pips"
                            value={formatNumber(
                                summary.total_pips
                            )}
                            valueColor={
                                Number(
                                    summary.total_pips
                                    ?? 0
                                ) >= 0
                                    ? "success.main"
                                    : "error.main"
                            }
                        />

                        <SummaryRow
                            label="Μέσος όρος Forex Pips"
                            value={formatNumber(
                                summary.average_pips
                            )}
                        />

                        {Number(
                            summary.points_trades
                            ?? 0
                        ) > 0 && (
                            <SummaryRow
                                label="Non-Forex Points"
                                value={formatNumber(
                                    summary.total_points
                                )}
                                valueColor={
                                    Number(
                                        summary.total_points
                                        ?? 0
                                    ) >= 0
                                        ? "success.main"
                                        : "error.main"
                                }
                            />
                        )}
                    </Stack>
                </Paper>
            </Box>
        </Box>
    );
}