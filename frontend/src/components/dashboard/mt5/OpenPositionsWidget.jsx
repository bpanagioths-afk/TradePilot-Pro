import { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";

import StatusBadge from "../../common/StatusBadge";

import {
    WidgetContainer,
    WidgetHeader,
    WidgetMetric,
    WidgetLoading,
    WidgetErrorState,
    WidgetEmptyState
} from "../../widgets";

import { getMT5OpenPositions } from "../../../api/mt5AccountsApi";

const REFRESH_INTERVAL_MS = 10000;

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

const formatPrice = (value) => {
    if (value === null || value === undefined) {
        return "—";
    }

    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 5
    }).format(value);
};

const formatVolume = (value) => {
    if (value === null || value === undefined) {
        return "—";
    }

    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2
    }).format(value);
};

function PositionRow({ position }) {
    const isProfit = position.profit >= 0;

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "1.2fr 0.8fr 0.8fr 1fr 1fr 1fr"
                },
                gap: 1.5,
                py: 1.5,
                borderBottom: "1px solid",
                borderColor: "divider"
            }}
        >
            <Box>
                <Typography variant="body2" fontWeight={700}>
                    {position.symbol}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    Ticket #{position.ticket}
                </Typography>
            </Box>

            <Box>
                <Typography variant="caption" color="text.secondary">
                    Type
                </Typography>

                <Typography
                    variant="body2"
                    fontWeight={700}
                    color={position.type === "BUY" ? "success.main" : "error.main"}
                >
                    {position.type}
                </Typography>
            </Box>

            <Box>
                <Typography variant="caption" color="text.secondary">
                    Volume
                </Typography>

                <Typography variant="body2" fontWeight={700}>
                    {formatVolume(position.volume)}
                </Typography>
            </Box>

            <Box>
                <Typography variant="caption" color="text.secondary">
                    Open
                </Typography>

                <Typography variant="body2" fontWeight={700}>
                    {formatPrice(position.price_open)}
                </Typography>
            </Box>

            <Box>
                <Typography variant="caption" color="text.secondary">
                    Current
                </Typography>

                <Typography variant="body2" fontWeight={700}>
                    {formatPrice(position.price_current)}
                </Typography>
            </Box>

            <Box>
                <Typography variant="caption" color="text.secondary">
                    Profit
                </Typography>

                <Typography
                    variant="body2"
                    fontWeight={700}
                    color={isProfit ? "success.main" : "error.main"}
                >
                    {formatMoney(position.profit)}
                </Typography>
            </Box>
        </Box>
    );
}

export default function OpenPositionsWidget() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const loadOpenPositions = async () => {
        try {
            setError(false);

            const response = await getMT5OpenPositions();
            setData(response);
        } catch (loadError) {
            console.error("Failed to load MT5 open positions", loadError);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOpenPositions();

        const intervalId = window.setInterval(
            loadOpenPositions,
            REFRESH_INTERVAL_MS
        );

        return () => {
            window.clearInterval(intervalId);
        };
    }, []);

    if (loading) {
        return (
            <WidgetLoading
                title="Open Positions"
                subtitle="Loading live MT5 positions..."
            />
        );
    }

    if (error) {
        return (
            <WidgetErrorState
                title="Open Positions"
                subtitle="Could not load live MT5 positions."
                message="Check backend connection and MT5 terminal status."
            />
        );
    }

    if (!data || !data.connected) {
        return (
            <WidgetEmptyState
                title="Open Positions"
                subtitle="MT5 is not connected."
                message={data?.message || "Open positions will appear when MT5 is connected."}
            />
        );
    }

    const positions = data.positions || [];
    const hasPositions = positions.length > 0;
    const floatingProfitLoss = data.floating_profit_loss || 0;

    return (
        <WidgetContainer>
            <WidgetHeader
                title="Open Positions"
                subtitle="Live MT5 exposure with automatic refresh."
                action={<StatusBadge label="Live" status="connected" />}
            />

            <Divider sx={{ mb: 2 }} />

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr"
                    },
                    gap: 2,
                    mb: 2
                }}
            >
                <WidgetMetric
                    title="Total Positions"
                    value={data.total_positions}
                />

                <WidgetMetric
                    title="Floating P/L"
                    value={formatMoney(floatingProfitLoss)}
                    status={floatingProfitLoss >= 0 ? "success" : "error"}
                />
            </Box>

            {!hasPositions && (
                <Typography variant="body2" color="text.secondary">
                    No open MT5 positions right now.
                </Typography>
            )}

            {hasPositions && (
                <Box>
                    {positions.map((position) => (
                        <PositionRow
                            key={position.ticket}
                            position={position}
                        />
                    ))}
                </Box>
            )}

            <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                    display: "block",
                    mt: 2
                }}
            >
                Auto refresh every 10 seconds.
            </Typography>
        </WidgetContainer>
    );
}