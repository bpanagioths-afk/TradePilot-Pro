import {
    WidgetLoading,
    WidgetErrorState,
    WidgetEmptyState
} from "../components/widgets";

import {
    usePortfolio,
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
        <>
            <PortfolioStatisticsCard
                statistics={portfolio.statistics}
            />

            <PortfolioAllocationCard
                allocation={portfolio.allocation}
            />
        </>
    );
}