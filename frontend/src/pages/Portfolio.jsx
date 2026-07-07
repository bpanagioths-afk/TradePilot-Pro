import { Box } from "@mui/material";

import {
    WidgetLoading,
    WidgetErrorState,
    WidgetEmptyState
} from "../components/widgets";

import {
    usePortfolio,
    PortfolioSummaryMetrics,
    PortfolioPerformanceMetrics,
    PortfolioStatisticsCard,
    PortfolioAllocationCard
} from "../features/portfolio";

export default function Portfolio() {
    const { portfolio, loading, error } = usePortfolio();

    if (loading) {
        return (
            <WidgetLoading
                title="Portfolio"
                subtitle="Loading portfolio..."
            />
        );
    }

    if (error) {
        return (
            <WidgetErrorState
                title="Portfolio"
                subtitle="Unable to load portfolio."
                message="Check backend connection."
            />
        );
    }

    if (!portfolio) {
        return (
            <WidgetEmptyState
                title="Portfolio"
                subtitle="Portfolio is empty."
                message="No portfolio data available."
            />
        );
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <PortfolioSummaryMetrics summary={portfolio.summary} />

            <PortfolioPerformanceMetrics performance={portfolio.performance} />

            <PortfolioStatisticsCard
                performance={portfolio.performance}
                risk={portfolio.risk}
            />

            <PortfolioAllocationCard allocation={portfolio.allocation} />
        </Box>
    );
}
