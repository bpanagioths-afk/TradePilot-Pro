import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Paper
} from "@mui/material";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

import api from "../api/api";

function ChartCard({ title, data, xKey, barKey }) {
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

export default function Analytics() {

    const [pairs, setPairs] = useState([]);
    const [hours, setHours] = useState([]);
    const [systems, setSystems] = useState([]);
    const [psychology, setPsychology] = useState([]);

    useEffect(() => {
        api
            .get("/dashboard/pairs")
            .then((res) => setPairs(res.data))
            .catch(console.error);

        api
            .get("/dashboard/hours")
            .then((res) => setHours(res.data))
            .catch(console.error);

        api
            .get("/dashboard/systems")
            .then((res) => setSystems(res.data))
            .catch(console.error);

        api
            .get("/dashboard/psychology")
            .then((res) => setPsychology(res.data))
            .catch(console.error);
    }, []);

    return (
        <Box>
            <Typography variant="h4" mb={3}>
                Analytics
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
                <ChartCard
                    title="Pair Performance"
                    data={pairs}
                    xKey="symbol"
                    barKey="total_pips"
                />

                <ChartCard
                    title="Hourly Performance"
                    data={hours}
                    xKey="hour"
                    barKey="avg_pips"
                />

                <ChartCard
                    title="System Performance"
                    data={systems}
                    xKey="trading_system_id"
                    barKey="total_pips"
                />

                <ChartCard
                    title="Psychology Performance"
                    data={psychology}
                    xKey="psychology_state_id"
                    barKey="total_pips"
                />
            </Box>
        </Box>
    );
}