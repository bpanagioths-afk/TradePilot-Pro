import {
    Box,
    Typography,
    Paper,
    Stack,
    Chip
} from "@mui/material";

import WarningIcon from "@mui/icons-material/Warning";
import TodayMission from "../components/home/TodayMission";
import TradingSessions from "../components/home/TradingSessions";
import MarketAlerts from "../components/home/MarketAlerts";
import PsychologyIcon from "@mui/icons-material/Psychology";
import PublicIcon from "@mui/icons-material/Public";

export default function Home() {
    return (
        <Box>
            <Typography variant="h4" mb={1}>
                Καλημέρα Παναγιώτη 👋
            </Typography>

            <Typography color="text.secondary" mb={3}>
                TradePilot Pro Command Center
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
                        Today Snapshot
                    </Typography>

                    <Stack spacing={2}>
                        <Chip label="Today P/L: +184 €" color="success" />
                        <Chip label="Trades Today: 3" color="primary" />
                        <Chip label="Win Rate Today: 66%" color="success" />
                        <Chip label="Daily Risk: Safe" color="success" />
                    </Stack>
                </Paper>

                <MarketAlerts />

                <TradingSessions />

                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" mb={2}>
                        Latest Trades
                    </Typography>

                    <Stack spacing={1}>
                        <Typography>EURUSD +84 €</Typography>
                        <Typography>XAUUSD -26 €</Typography>
                        <Typography>GBPJPY +142 €</Typography>
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