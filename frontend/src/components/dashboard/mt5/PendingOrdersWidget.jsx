import { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";

import StatusBadge from "../../common/StatusBadge";
import {
    WidgetContainer,
    WidgetEmptyState,
    WidgetErrorState,
    WidgetHeader,
    WidgetLoading,
    WidgetMetric
} from "../../widgets";
import { getMT5PendingOrders } from "../../../api/mt5AccountsApi";

const REFRESH_INTERVAL_MS = 10000;

const formatNumber = (value, digits = 5) =>
    value === null || value === undefined
        ? "—"
        : new Intl.NumberFormat("en-US", {
            maximumFractionDigits: digits
        }).format(value);

function PendingOrderRow({ order }) {
    const isBuy = order.type.includes("BUY");

    return (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr 0.8fr 1fr 1fr 1fr" }, gap: 1.5, py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}>
            <Box><Typography variant="body2" fontWeight={700}>{order.symbol}</Typography><Typography variant="caption" color="text.secondary">Ticket #{order.ticket}</Typography></Box>
            <Box><Typography variant="caption" color="text.secondary">Type</Typography><Typography variant="body2" fontWeight={700} color={isBuy ? "success.main" : "error.main"}>{order.type}</Typography></Box>
            <Box><Typography variant="caption" color="text.secondary">Volume</Typography><Typography variant="body2" fontWeight={700}>{formatNumber(order.volume_current, 2)}</Typography></Box>
            <Box><Typography variant="caption" color="text.secondary">Entry</Typography><Typography variant="body2" fontWeight={700}>{formatNumber(order.price_open)}</Typography></Box>
            <Box><Typography variant="caption" color="text.secondary">Stop Loss</Typography><Typography variant="body2" fontWeight={700}>{formatNumber(order.stop_loss)}</Typography></Box>
            <Box><Typography variant="caption" color="text.secondary">Take Profit</Typography><Typography variant="body2" fontWeight={700}>{formatNumber(order.take_profit)}</Typography></Box>
        </Box>
    );
}

export default function PendingOrdersWidget({ accountId }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        const load = async () => {
            try {
                const response = await getMT5PendingOrders(accountId);
                if (active) {
                    setData(response);
                    setError("");
                }
            } catch (loadError) {
                if (active) {
                    setError(
                        loadError.response?.data?.detail ||
                        "Could not load pending MT5 orders."
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        load();
        const intervalId = window.setInterval(load, REFRESH_INTERVAL_MS);

        return () => {
            active = false;
            window.clearInterval(intervalId);
        };
    }, [accountId]);

    if (loading) {
        return <WidgetLoading title="Pending Orders" subtitle="Loading live MT5 pending orders..." />;
    }

    if (error) {
        return <WidgetErrorState title="Pending Orders" subtitle="Could not load pending MT5 orders." message={error} />;
    }

    if (!data?.connected) {
        return <WidgetEmptyState title="Pending Orders" subtitle="MT5 is not connected." message={data?.message} />;
    }

    const orders = data.orders || [];

    return (
        <WidgetContainer>
            <WidgetHeader title="Pending Orders" subtitle="Live MT5 pending orders with automatic refresh." action={<StatusBadge label="Live" status="connected" />} />
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mb: 2 }}>
                <WidgetMetric title="Total Pending Orders" value={data.total_orders} />
            </Box>
            {orders.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No pending MT5 orders right now.</Typography>
            ) : (
                orders.map((order) => <PendingOrderRow key={order.ticket} order={order} />)
            )}
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>Auto refresh every 10 seconds.</Typography>
        </WidgetContainer>
    );
}
