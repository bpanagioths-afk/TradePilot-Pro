import { Box, Typography } from "@mui/material";

export default function PageHeader({
    title,
    subtitle,
    actions
}) {
    return (
        <Box
            sx={{
                mb: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 2,
                flexWrap: "wrap"
            }}
        >
            <Box>
                <Typography
                    variant="h4"
                    fontWeight={700}
                    gutterBottom
                >
                    {title}
                </Typography>

                {subtitle && (
                    <Typography
                        variant="body1"
                        color="text.secondary"
                    >
                        {subtitle}
                    </Typography>
                )}
            </Box>

            {actions && (
                <Box>
                    {actions}
                </Box>
            )}
        </Box>
    );
}