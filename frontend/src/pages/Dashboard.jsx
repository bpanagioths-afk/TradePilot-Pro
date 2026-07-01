import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Paper
} from "@mui/material";

import { getFullDashboard } from "../services/dashboardService";

import KPICard from "../components/KPICard";
import EquityChart from "../components/EquityChart";

export default function Dashboard() {

    const [summary, setSummary] = useState(null);
    const [equity, setEquity] = useState([]);

useEffect(() => {

    getFullDashboard()
        .then((res) => {
            setSummary(res.data.summary);
            setEquity(res.data.equity);
        })
        .catch(console.error);

}, []);

    if (!summary) {
        return (
            <Typography variant="h5">
                Loading dashboard...
            </Typography>
        );
    }

    return (
        <Box>

            <Typography variant="h4" mb={3}>
                Dashboard
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        md: "repeat(4, 1fr)"
                    },
                    gap: 2,
                    mb: 3
                }}
            >
                <KPICard
                    title="Total Profit"
                    value={`${summary.total_profit} €`}
                    subtitle="All imported trades"
                    color="success.main"
                />

                <KPICard
                    title="Win Rate"
                    value={`${summary.win_rate}%`}
                    subtitle={`${summary.wins} wins / ${summary.losses} losses`}
                    color="primary.main"
                />

                <KPICard
                    title="Total Trades"
                    value={summary.total_trades}
                    subtitle="Manual + MT5 trades"
                    color="warning.main"
                />

                <KPICard
                    title="Total Pips"
                    value={summary.total_pips}
                    subtitle={`Average: ${summary.average_pips}`}
                    color="secondary.main"
                />
            </Box>

            <Paper
                sx={{
                    p: 3,
                    mb: 3
                }}
            >
                <Typography variant="h6" mb={2}>
                    Equity Curve
                </Typography>

                <EquityChart data={equity} />
            </Paper>

        </Box>
    );
}