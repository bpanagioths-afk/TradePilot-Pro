import { Box, Typography } from "@mui/material";

export default function MetricCard({
    label,
    value,
    helper,
    valueColor = "text.primary",
}) {
    return (
        <Box
            sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.default",
                minHeight: 96,
            }}
        >
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                {label}
            </Typography>

            <Typography
                variant="h6"
                sx={{
                    mt: 0.5,
                    fontWeight: 800,
                    lineHeight: 1.2,
                    color: valueColor,
                }}
            >
                {value}
            </Typography>

            {helper && (
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                    {helper}
                </Typography>
            )}
        </Box>
    );
}