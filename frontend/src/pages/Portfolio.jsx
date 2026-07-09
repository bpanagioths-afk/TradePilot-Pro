import { Box } from "@mui/material";

import PageLayout from "../components/layout/PageLayout";

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
    PortfolioAllocationCard,
    PortfolioChartsCard
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
        <PageLayout
            title="Portfolio"
            subtitle="Portfolio performance, allocation and risk overview."
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "1fr 1fr"
                    },
                    gap: 2
                }}
            >
                <PortfolioSummaryMetrics summary={portfolio.summary} />

                <PortfolioPerformanceMetrics performance={portfolio.performance} />
            </Box>

            <PortfolioChartsCard
                equity={portfolio.equity}
                drawdown={portfolio.drawdown}
            />

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "1fr 1fr"
                    },
                    gap: 2
                }}
            >
                <PortfolioAllocationCard allocation={portfolio.allocation} />

                <PortfolioStatisticsCard
                    performance={portfolio.performance}
                    risk={portfolio.risk}
                />
            </Box>
        </PageLayout>
    );
}