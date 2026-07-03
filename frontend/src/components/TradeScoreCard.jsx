import {
    Paper,
    Typography,
    Stack,
    Chip,
    LinearProgress,
    Divider
} from "@mui/material";

export default function TradeScoreCard({ scoreData }) {
    if (!scoreData) {
        return null;
    }

    const score = scoreData.score ?? 0;

    let color = "error";

    if (score >= 80) {
        color = "success";
    } else if (score >= 60) {
        color = "warning";
    }

    return (
        <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" mb={2}>
                Trade Score
            </Typography>

            <Typography variant="h4" color={`${color}.main`}>
                {score} / 100
            </Typography>

            <LinearProgress
                variant="determinate"
                value={score}
                color={color}
                sx={{ my: 2 }}
            />

            <Chip
                label={scoreData.passed ? "PASSED" : "FAILED"}
                color={scoreData.passed ? "success" : "error"}
                sx={{ mb: 2 }}
            />

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1}>
                <Typography variant="subtitle2">
                    Violations
                </Typography>

                {(scoreData.violations || []).map((item) => (
                    <Chip
                        key={item}
                        label={`❌ ${item}`}
                        color="error"
                        size="small"
                    />
                ))}

                <Typography variant="subtitle2" mt={2}>
                    Warnings
                </Typography>

                {(scoreData.warnings || []).map((item) => (
                    <Chip
                        key={item}
                        label={`⚠️ ${item}`}
                        color="warning"
                        size="small"
                    />
                ))}

                <Typography variant="subtitle2" mt={2}>
                    Successes
                </Typography>

                {(scoreData.successes || []).map((item) => (
                    <Chip
                        key={item}
                        label={`✅ ${item}`}
                        color="success"
                        size="small"
                    />
                ))}
            </Stack>
        </Paper>
    );
}