import { Box, Paper, Typography } from "@mui/material";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PercentIcon from "@mui/icons-material/Percent";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import TimelineIcon from "@mui/icons-material/Timeline";

import KPICard from "../../KPICard";
import EquityChart from "../../EquityChart";

export default function DashboardSummaryWidget({ summary, equity }) {
    return (
        <Box>
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
                    icon={<AccountBalanceWalletIcon />}
                />

                <KPICard
                    title="Win Rate"
                    value={`${summary.win_rate}%`}
                    subtitle={`${summary.wins} wins / ${summary.losses} losses`}
                    color="primary.main"
                    icon={<PercentIcon />}
                />

                <KPICard
                    title="Total Trades"
                    value={summary.total_trades}
                    subtitle="Manual + MT5 trades"
                    color="warning.main"
                    icon={<CandlestickChartIcon />}
                />

                <KPICard
                    title="Total Pips"
                    value={summary.total_pips}
                    subtitle={`Average: ${summary.average_pips}`}
                    color="secondary.main"
                    icon={<TimelineIcon />}
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