import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import PageLayout from "../components/layout/PageLayout";
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
        <PageLayout
            title="Dashboard"
            subtitle="Your trading cockpit and performance overview."
        >
            <DashboardLayout
                summary={summary}
                equity={equity}
            />
        </PageLayout>
    );
}