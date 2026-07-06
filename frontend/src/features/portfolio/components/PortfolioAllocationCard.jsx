import { Box, Typography, LinearProgress } from "@mui/material";

import {
    WidgetContainer,
    WidgetHeader,
    WidgetEmptyState
} from "../../../components/widgets";

function AllocationRow({ item }) {
    return (
        <Box sx={{ mb: 1.5 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 0.5
                }}
            >
                <Typography variant="body2">
                    {item.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {item.percentage}%
                </Typography>
            </Box>

            <LinearProgress
                variant="determinate"
                value={Math.min(Math.abs(item.percentage), 100)}
            />
        </Box>
    );
}

export default function PortfolioAllocationCard({ allocation }) {
    const symbols = allocation?.by_symbol || [];
    const directions = allocation?.by_direction || [];

    const hasData = symbols.length > 0 || directions.length > 0;

    if (!hasData) {
        return (
            <WidgetEmptyState
                title="Portfolio Allocation"
                subtitle="No allocation data available."
                message="Allocation metrics will appear after trades exist."
            />
        );
    }

    return (
        <WidgetContainer>
            <WidgetHeader
                title="Portfolio Allocation"
                subtitle="Exposure by symbol and trade direction"
            />

            <Box sx={{ mt: 1 }}>
                {symbols.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                        >
                            By Symbol
                        </Typography>

                        {symbols.map((item) => (
                            <AllocationRow
                                key={`symbol-${item.name}`}
                                item={item}
                            />
                        ))}
                    </Box>
                )}

                {directions.length > 0 && (
                    <Box>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                        >
                            By Direction
                        </Typography>

                        {directions.map((item) => (
                            <AllocationRow
                                key={`direction-${item.name}`}
                                item={item}
                            />
                        ))}
                    </Box>
                )}
            </Box>
        </WidgetContainer>
    );
}