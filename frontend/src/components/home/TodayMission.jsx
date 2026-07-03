import {
    Paper,
    Typography,
    Stack,
    LinearProgress,
    Chip
} from "@mui/material";

export default function TodayMission() {
    const progress = 60;

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>
                🎯 Today's Mission
            </Typography>

            <Stack spacing={2}>
                <Chip
                    label="Max Risk Today: 1.5%"
                    color="primary"
                />

                <Chip
                    label="Target: +2R"
                    color="success"
                />

                <Typography color="text.secondary">
                    Current Progress
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={progress}
                />

                <Typography variant="h5" color="success.main">
                    +1.2R / +2R
                </Typography>

                <Typography color="text.secondary">
                    Συνέχισε πειθαρχημένα. Μην αυξήσεις το ρίσκο.
                </Typography>
            </Stack>
        </Paper>
    );
}