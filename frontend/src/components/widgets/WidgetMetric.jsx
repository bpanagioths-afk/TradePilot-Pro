import { Box, Paper, Typography } from "@mui/material";

export default function WidgetMetric({
    title,
    value,
    helperText,
    trend,
    status = "default"
}) {

    const statusColorMap = {
        default: "text.primary",
        success: "success.main",
        warning: "warning.main",
        error: "error.main",
        info: "info.main"
    };

    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2,
                height: "100%"
            }}
        >
            <Typography variant="body2" color="text.secondary">
                {title}
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 1,
                    mt: 0.5
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        color: statusColorMap[status] || "text.primary",
                        fontWeight: 700
                    }}
                >
                    {value}
                </Typography>

                {trend && (
                    <Typography
                        variant="caption"
                        color={statusColorMap[status] || "text.secondary"}
                    >
                        {trend}
                    </Typography>
                )}
            </Box>

            {helperText && (
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                        display: "block",
                        mt: 0.5
                    }}
                >
                    {helperText}
                </Typography>
            )}
        </Paper>
    );
}