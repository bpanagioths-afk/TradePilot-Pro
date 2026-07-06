import { Box } from "@mui/material";

import {
    WidgetContainer,
    WidgetHeader,
    WidgetFooter,
    WidgetLoading,
    WidgetErrorState,
    WidgetEmptyState
} from "../../widgets";

import StatusBadge from "../../common/StatusBadge";
import TradePilotButton from "../../common/TradePilotButton";

import {
    usePortfolio,
    PortfolioSummaryMetrics,
    PortfolioPerformanceMetrics
} from "../../../features/portfolio";

export default function PortfolioWidget() {
    const { portfolio, loading, error } = usePortfolio();

    if (loading) {
        return (
            <WidgetLoading
                title="Portfolio"
                subtitle="Loading portfolio overview..."
            />
        );
    }

    if (error) {
        return (
            <WidgetErrorState
                title="Portfolio"
                subtitle="Could not load portfolio data."
                message="Check backend connection or portfolio API."
            />
        );
    }

    if (!portfolio) {
        return (
            <WidgetEmptyState
                title="Portfolio"
                subtitle="No portfolio data available."
                message="Portfolio metrics will appear after trades or accounts exist."
            />
        );
    }

    const { summary, performance } = portfolio;

    return (
        <WidgetContainer>
            <WidgetHeader
                title="Portfolio"
                subtitle="Account and trade performance overview"
                action={<StatusBadge label="Live" status="connected" />}
            />

            <Box sx={{ mt: 1 }}>
                <PortfolioSummaryMetrics summary={summary} />
                <PortfolioPerformanceMetrics performance={performance} />
            </Box>

            <WidgetFooter>
                <TradePilotButton variant="secondary">
                    View Portfolio
                </TradePilotButton>
            </WidgetFooter>
        </WidgetContainer>
    );
}