import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar
} from "recharts";

import {
    WidgetContainer,
    WidgetHeader,
    WidgetEmptyState
} from "../../../components/widgets";

import {
    ChartContainer,
    ChartTooltip
} from "../../../components/charts";

function hasChartData(items) {
    return Array.isArray(items) && items.length > 0;
}

export default function PortfolioChartsCard({ equity, drawdown }) {
    const theme = useTheme();

    const equityCurve = equity?.equity_curve || [];
    const drawdownCurve = drawdown?.drawdown_curve || [];

    if (!hasChartData(equityCurve) && !hasChartData(drawdownCurve)) {
        return (
            <WidgetEmptyState
                title="Portfolio Charts"
                subtitle="No chart data available."
                message="Equity and drawdown charts will appear after trades exist."
            />
        );
    }

    return (
        <WidgetContainer>
            <WidgetHeader
                title="Portfolio Charts"
                subtitle="Equity curve and drawdown overview"
            />

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        xl: "2fr 1fr"
                    },
                    gap: 2,
                    mt: 2
                }}
            >
                {hasChartData(equityCurve) && (
                    <Box>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                        >
                            Equity Curve
                        </Typography>

                        <ChartContainer height={360}>
                            <LineChart data={equityCurve}>
                                <CartesianGrid
                                    stroke={theme.palette.divider}
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="trade"
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
                                    content={
                                        <ChartTooltip
                                            nameFormatter={() => "Equity"}
                                        />
                                    }
                                />

                                <Line
                                    type="monotone"
                                    dataKey="equity"
                                    name="Equity"
                                    stroke={theme.palette.primary.main}
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{
                                        r: 4
                                    }}
                                />
                            </LineChart>
                        </ChartContainer>
                    </Box>
                )}

                {hasChartData(drawdownCurve) && (
                    <Box>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                        >
                            Drawdown
                        </Typography>

                        <ChartContainer height={360}>
                            <BarChart data={drawdownCurve}>
                                <CartesianGrid
                                    stroke={theme.palette.divider}
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="trade"
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
                                    content={
                                        <ChartTooltip
                                            nameFormatter={() => "Drawdown"}
                                        />
                                    }
                                />

                                <Bar
                                    dataKey="drawdown"
                                    name="Drawdown"
                                    fill={theme.palette.error.main}
                                />
                            </BarChart>
                        </ChartContainer>
                    </Box>
                )}
            </Box>
        </WidgetContainer>
    );
}
