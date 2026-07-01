import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

export default function EquityChart({ data }) {

    return (
        <ResponsiveContainer
            width="100%"
            height={400}
        >
            <LineChart data={data}>

                <CartesianGrid />

                <XAxis dataKey="trade_id" />

                <YAxis />

                <Tooltip />

                <Line
                    type="monotone"
                    dataKey="equity"
                />

            </LineChart>
        </ResponsiveContainer>
    );
}