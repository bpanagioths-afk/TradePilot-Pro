import { Box, Typography } from "@mui/material";

export default function InfoRow({
    label,
    value,
    icon,
    sx = {},
}) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                py: 0.5,
                ...sx,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    minWidth: 0,
                }}
            >
                {icon}

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ whiteSpace: "nowrap" }}
                >
                    {label}
                </Typography>
            </Box>

            <Typography
                variant="body2"
                sx={{
                    fontWeight: 600,
                    textAlign: "right",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                }}
            >
                {value || "-"}
            </Typography>
        </Box>
    );
}