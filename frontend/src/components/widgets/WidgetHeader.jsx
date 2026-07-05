import { Box, Typography } from "@mui/material";

export default function WidgetHeader({ title, subtitle, action }) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 2,
                mb: 2
            }}
        >
            <Box>
                <Typography variant="h6">
                    {title}
                </Typography>

                {subtitle && (
                    <Typography variant="body2" color="text.secondary">
                        {subtitle}
                    </Typography>
                )}
            </Box>

            {action}
        </Box>
    );
}