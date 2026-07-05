import { useEffect, useState } from "react";

import {
    Box,
    Typography,
} from "@mui/material";

import DashboardLayout from "../components/dashboard/DashboardLayout";


import { getFullDashboard } from "../services/dashboardService";


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
            <Typography variant="h5" mb={2}>
                Professional Command Center
            </Typography>

            <DashboardLayout summary={summary} equity={equity} />       
        </Box>
    );
}