import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
    WidgetContainer,
    WidgetHeader,
    WidgetFooter,
    WidgetLoading,
    WidgetErrorState,
    WidgetEmptyState,
    WidgetMetric
} from "../../widgets";

import StatusBadge from "../../common/StatusBadge";
import TradePilotButton from "../../common/TradePilotButton";

import {
    usePortfolio
} from "../../../features/portfolio";

const formatMoney = (value) => {
    if (value === null || value === undefined) {
        return "—";
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2
    }).format(value);
};

export default function PortfolioWidget() {
    const navigate = useNavigate();
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

    const { summary } = portfolio;
    const netProfit = portfolio?.performance?.net_profit ?? 0;

    return (
        <WidgetContainer>
            <WidgetHeader
                title="Portfolio"
                subtitle="Quick portfolio overview."
                action={<StatusBadge label="Live" status="connected" />}
            />

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr"
                    },
                    gap: 2,
                    mt: 1
                }}
            >
                <WidgetMetric
                    title="Total Trades"
                    value={summary?.total_trades ?? 0}
                />

                <WidgetMetric
                    title="Net Profit"
                    value={formatMoney(netProfit)}
                    status={netProfit >= 0 ? "success" : "error"}
                />
            </Box>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2 }}
            >
                Full allocation, risk and performance analysis is available in the Portfolio page.
            </Typography>

            <WidgetFooter>
                <TradePilotButton
                    variant="secondary"
                    onClick={() => navigate("/portfolio")}
                >
                    View Portfolio
                </TradePilotButton>
            </WidgetFooter>
        </WidgetContainer>
    );
}