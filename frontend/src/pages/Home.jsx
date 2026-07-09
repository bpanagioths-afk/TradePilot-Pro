import {
    Box,
    Typography,
    Paper,
    Stack,
    Chip,
    Button
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import TodayMission from "../components/home/TodayMission";
import TradingSessions from "../components/home/TradingSessions";
import MarketAlerts from "../components/home/MarketAlerts";

export default function Home() {
    const navigate = useNavigate();

    return (
        <Box>
            <Typography variant="h4" mb={1}>
                Welcome to TradePilot Pro
            </Typography>

            <Typography color="text.secondary" mb={3}>
                Professional trading platform for MT5 sync, portfolio tracking, analytics and trading discipline.
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "2fr 1fr"
                    },
                    gap: 3
                }}
            >
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" mb={2}>
                        Platform Overview
                    </Typography>

                    <Typography color="text.secondary" mb={2}>
                        TradePilot Pro is being built as a multi-user trading platform. Future versions will include secure login, subscriptions and personal trader workspaces.
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            flexWrap: "wrap",
                            gap: 1
                        }}
                    >
                        <Chip label="MT5 Sync" color="primary" />
                        <Chip label="Portfolio Tracking" color="primary" />
                        <Chip label="Analytics" color="primary" />
                        <Chip label="Reports" color="primary" />
                        <Chip label="Psychology" color="primary" />
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            mt: 3,
                            flexWrap: "wrap"
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={() => navigate("/dashboard")}
                        >
                            Open Dashboard
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() => navigate("/mt5")}
                        >
                            Open MT5 Center
                        </Button>
                    </Stack>
                </Paper>

                <MarketAlerts />

                <TradingSessions />

                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" mb={2}>
                        Version 0.8 Focus
                    </Typography>

                    <Stack spacing={1}>
                        <Typography color="text.secondary">
                            Core platform foundation
                        </Typography>

                        <Typography color="text.secondary">
                            MT5 Trading Center
                        </Typography>

                        <Typography color="text.secondary">
                            Portfolio and performance overview
                        </Typography>

                        <Typography color="text.secondary">
                            Analytics foundation
                        </Typography>
                    </Stack>
                </Paper>

                <Box
                    sx={{
                        gridColumn: {
                            xs: "auto",
                            md: "1 / -1"
                        }
                    }}
                >
                    <TodayMission />
                </Box>
            </Box>
        </Box>
    );
}