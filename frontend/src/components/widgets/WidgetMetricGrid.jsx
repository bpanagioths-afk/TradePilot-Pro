import { Box } from "@mui/material";

export default function WidgetMetricGrid({
    children,
    columns = 2,
    gap = 2,
    mt = 0
}) {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                gap,
                mt
            }}
        >
            {children}
        </Box>
    );
}