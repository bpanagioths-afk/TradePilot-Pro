import {
    Paper,
    Typography,
    Stack,
    Chip
} from "@mui/material";

import PublicIcon from "@mui/icons-material/Public";

const sessions = [
    {
        name: "Asia",
        status: "Open",
        color: "success"
    },
    {
        name: "London",
        status: "Opens soon",
        color: "warning"
    },
    {
        name: "New York",
        status: "Closed",
        color: "default"
    },
    {
        name: "London / New York Overlap",
        status: "Later today",
        color: "primary"
    }
];

export default function TradingSessions() {
    return (
        <Paper sx={{ p: 3 }}>
            <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: "center", mb: 2 }}
            >
                <PublicIcon color="primary" />

                <Typography variant="h6">
                    Trading Sessions
                </Typography>
            </Stack>

            <Stack spacing={1}>
                {sessions.map((session) => (
                    <Chip
                        key={session.name}
                        label={`${session.name}: ${session.status}`}
                        color={session.color}
                    />
                ))}
            </Stack>
        </Paper>
    );
}