import { Box, Typography } from "@mui/material";
import {
    ResponsiveContainer,
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

function hasChartData(items) {
    return Array.isArray(items) && items.length > 0;
}

export default function PortfolioChartsCard({ equity, drawdown }) {
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
                    <Box sx={{ height: 360 }}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                            Equity Curve
                        </Typography>

                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={equityCurve}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="trade" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="equity"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                )}

                {hasChartData(drawdownCurve) && (
                    <Box sx={{ height: 360 }}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                            Drawdown
                        </Typography>

                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={drawdownCurve}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="trade" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="drawdown" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                )}
            </Box>
        </WidgetContainer>
    );
}