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

import { getMT5PendingOrders } from "../../../api/mt5AccountsApi";

const REFRESH_INTERVAL_MS = 10000;

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

function PendingOrderRow({ order }) {
    const isBuyOrder = order.type.includes("BUY");

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "1.2fr 1fr 0.8fr 1fr 1fr 1fr"
                },
                gap: 1.5,
                py: 1.5,
                borderBottom: "1px solid",
                borderColor: "divider"
            }}
        >
            <Box>
                <Typography variant="body2" fontWeight={700}>
                    {order.symbol}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    Ticket #{order.ticket}
                </Typography>
            </Box>

            <Box>
                <Typography variant="caption" color="text.secondary">
                    Type
                </Typography>

                <Typography
                    variant="body2"
                    fontWeight={700}
                    color={isBuyOrder ? "success.main" : "error.main"}
                >
                    {order.type}
                </Typography>
            </Box>

            <Box>
                <Typography variant="caption" color="text.secondary">
                    Volume
                </Typography>

                <Typography variant="body2" fontWeight={700}>
                    {formatVolume(order.volume_current)}
                </Typography>
            </Box>

            <Box>
                <Typography variant="caption" color="text.secondary">
                    Entry
                </Typography>

                <Typography variant="body2" fontWeight={700}>
                    {formatPrice(order.price_open)}
                </Typography>
            </Box>

            <Box>
                <Typography variant="caption" color="text.secondary">
                    Stop Loss
                </Typography>

                <Typography variant="body2" fontWeight={700}>
                    {formatPrice(order.stop_loss)}
                </Typography>
            </Box>

            <Box>
                <Typography variant="caption" color="text.secondary">
                    Take Profit
                </Typography>

                <Typography variant="body2" fontWeight={700}>
                    {formatPrice(order.take_profit)}
                </Typography>
            </Box>
        </Box>
    );
}

export default function PendingOrdersWidget() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const loadPendingOrders = async () => {
        try {
            setError(false);

            const response = await getMT5PendingOrders();
            setData(response);
        } catch (loadError) {
            console.error("Failed to load MT5 pending orders", loadError);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPendingOrders();

        const intervalId = window.setInterval(
            loadPendingOrders,
            REFRESH_INTERVAL_MS
        );

        return () => {
            window.clearInterval(intervalId);
        };
    }, []);

    if (loading) {
        return (
            <WidgetLoading
                title="Pending Orders"
                subtitle="Loading live MT5 pending orders..."
            />
        );
    }

    if (error) {
        return (
            <WidgetErrorState
                title="Pending Orders"
                subtitle="Could not load pending MT5 orders."
                message="Check backend connection and MT5 terminal status."
            />
        );
    }

    if (!data || !data.connected) {
        return (
            <WidgetEmptyState
                title="Pending Orders"
                subtitle="MT5 is not connected."
                message={data?.message || "Pending orders will appear when MT5 is connected."}
            />
        );
    }

    const orders = data.orders || [];
    const hasOrders = orders.length > 0;

    return (
        <WidgetContainer>
            <WidgetHeader
                title="Pending Orders"
                subtitle="Live MT5 pending orders with automatic refresh."
                action={<StatusBadge label="Live" status="connected" />}
            />

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ mb: 2 }}>
                <WidgetMetric
                    title="Total Pending Orders"
                    value={data.total_orders}
                />
            </Box>

            {!hasOrders && (
                <Typography variant="body2" color="text.secondary">
                    No pending MT5 orders right now.
                </Typography>
            )}

            {hasOrders && (
                <Box>
                    {orders.map((order) => (
                        <PendingOrderRow
                            key={order.ticket}
                            order={order}
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