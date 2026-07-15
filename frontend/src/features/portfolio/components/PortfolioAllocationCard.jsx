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
                    {item.asset_class
    ? item.asset_class.charAt(0).toUpperCase() +
      item.asset_class.slice(1)
    : item.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {item.allocation_percentage ?? item.percentage}%
                </Typography>
            </Box>

            <LinearProgress
                variant="determinate"
                value={Math.min(
    Math.abs(
        item.allocation_percentage ??
        item.percentage
    ),
    100
)}
            />
        </Box>
    );
}

export default function PortfolioAllocationCard({ allocation }) {
 const symbols = Array.isArray(allocation)
    ? allocation
    : allocation?.by_symbol || [];

const hasData = symbols.length > 0;
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
                subtitle="Exposure by asset class"
            />

            <Box sx={{ mt: 1 }}>
                {symbols.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                        >
                            By Asset Class
                        </Typography>

                        {symbols.map((item) => (
                            <AllocationRow
                                key={`asset-${item.asset_class ?? item.name}`}
                                item={item}
                            />
                        ))}
                    </Box>
                )}
            </Box>
        </WidgetContainer>
    );
}