
import { Paper, Typography } from "@mui/material";

export default function WidgetMetric({ title, value }) {
    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2
            }}
        >
            <Typography variant="body2" color="text.secondary">
                {title}
            </Typography>

            <Typography variant="h5">
                {value}
            </Typography>
        </Paper>
    );
}