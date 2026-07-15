import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Paper,
    Stack,
    Chip
} from "@mui/material";

import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

import api from "../api/api";

export default function Reports() {

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
                        color={summary.total_profit >= 0 ? "success.main" : "error.main"}
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
                <Paper sx={{ p: 3, height: 380 }}>
                    <Typography variant="h6" mb={2}>
                        Win / Loss Ratio
                    </Typography>

                    <ResponsiveContainer width="100%" height="85%">
                        <PieChart>
                            <Pie
                                data={winLossData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={110}
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Paper>

                <Paper sx={{ p: 3, height: 380 }}>
                    <Typography variant="h6" mb={2}>
                        Pair Performance
                    </Typography>

                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={pairs}>
                            <CartesianGrid />
                            <XAxis dataKey="label" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" />
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>

                <Paper sx={{ p: 3, height: 380 }}>
                    <Typography variant="h6" mb={2}>
                        Hourly Performance
                    </Typography>

                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={hours}>
                            <CartesianGrid />
                            <XAxis dataKey="label" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="average" />
                        </BarChart>
                    </ResponsiveContainer>
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