import { Box } from "@mui/material";
import { ResponsiveContainer } from "recharts";

export default function ChartContainer({
    children,
    height = 360,
    minHeight = 240,
    sx = {}
}) {
    return (
        <Box
            sx={{
                width: "100%",
                height,
                minHeight,
                minWidth: 0,
                ...sx
            }}
        >
            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                {children}
            </ResponsiveContainer>
        </Box>
    );
}