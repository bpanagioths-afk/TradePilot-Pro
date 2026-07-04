import { Box, Typography } from "@mui/material";

export default function SectionHeader({
    title,
    subtitle,
    action,
    sx = {},
}) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                mb: 2,
                ...sx,
            }}
        >
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {title}
                </Typography>

                {subtitle && (
                    <Typography variant="body2" color="text.secondary">
                        {subtitle}
                    </Typography>
                )}
            </Box>

            {action && <Box>{action}</Box>}
        </Box>
    );
}