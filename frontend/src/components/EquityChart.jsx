import { useTheme } from "@mui/material/styles";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

import {
    ChartContainer,
    ChartTooltip
} from "./charts";

export default function EquityChart({ data }) {
    const theme = useTheme();

    return (
        <ChartContainer height={400}>
            <LineChart data={data}>
                <CartesianGrid
                    stroke={theme.palette.divider}
                    strokeDasharray="3 3"
                />

                <XAxis
                    dataKey="trade_id"
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
    );
}