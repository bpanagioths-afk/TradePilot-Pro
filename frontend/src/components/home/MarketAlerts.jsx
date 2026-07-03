import {
    Paper,
    Typography,
    Stack,
    Chip
} from "@mui/material";

import WarningIcon from "@mui/icons-material/Warning";

const alerts = [
    {
        currency: "USD",
        impact: "HIGH",
        event: "Non Farm Payrolls",
        time: "15:30",
        color: "error"
    },
    {
        currency: "EUR",
        impact: "MEDIUM",
        event: "ECB Speech",
        time: "12:00",
        color: "warning"
    },
    {
        currency: "GBP",
        impact: "LOW",
        event: "PMI Tomorrow",
        time: "Tomorrow",
        color: "default"
    }
];

export default function MarketAlerts() {
    return (
        <Paper sx={{ p: 3 }}>
            <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: "center", mb: 2 }}
            >
                <WarningIcon color="warning" />

                <Typography variant="h6">
                    Market Alerts
                </Typography>
            </Stack>

            <Stack spacing={1}>
                {alerts.map((alert) => (
                    <Chip
                        key={`${alert.currency}-${alert.event}`}
                        label={`${alert.impact} ${alert.currency} - ${alert.event} ${alert.time}`}
                        color={alert.color}
                    />
                ))}
            </Stack>
        </Paper>
    );
}