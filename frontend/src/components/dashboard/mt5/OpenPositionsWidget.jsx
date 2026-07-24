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
import { getMT5OpenPositions } from "../../../api/mt5AccountsApi";

const REFRESH_INTERVAL_MS = 10000;

const formatMoney = (value) =>
    value === null || value === undefined
        ? "—"
        : new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2
        }).format(value);

const formatNumber = (value, digits = 5) =>
    value === null || value === undefined
        ? "—"
        : new Intl.NumberFormat("en-US", {
            maximumFractionDigits: digits
        }).format(value);

function PositionRow({ position }) {
    return (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr 0.8fr 1fr 1fr 1fr" }, gap: 1.5, py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}>
            <Box><Typography variant="body2" fontWeight={700}>{position.symbol}</Typography><Typography variant="caption" color="text.secondary">Ticket #{position.ticket}</Typography></Box>
            <Box><Typography variant="caption" color="text.secondary">Type</Typography><Typography variant="body2" fontWeight={700} color={position.type === "BUY" ? "success.main" : "error.main"}>{position.type}</Typography></Box>
            <Box><Typography variant="caption" color="text.secondary">Volume</Typography><Typography variant="body2" fontWeight={700}>{formatNumber(position.volume, 2)}</Typography></Box>
            <Box><Typography variant="caption" color="text.secondary">Open</Typography><Typography variant="body2" fontWeight={700}>{formatNumber(position.price_open)}</Typography></Box>
            <Box><Typography variant="caption" color="text.secondary">Current</Typography><Typography variant="body2" fontWeight={700}>{formatNumber(position.price_current)}</Typography></Box>
            <Box><Typography variant="caption" color="text.secondary">Profit</Typography><Typography variant="body2" fontWeight={700} color={position.profit >= 0 ? "success.main" : "error.main"}>{formatMoney(position.profit)}</Typography></Box>
        </Box>
    );
}

export default function OpenPositionsWidget({ accountId }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        const load = async () => {
            try {
                const response = await getMT5OpenPositions(accountId);
                if (active) {
                    setData(response);
                    setError("");
                }
            } catch (loadError) {
                if (active) {
                    setError(
                        loadError.response?.data?.detail ||
                        "Could not load live MT5 positions."
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
        return <WidgetLoading title="Open Positions" subtitle="Loading live MT5 positions..." />;
    }

    if (error) {
        return <WidgetErrorState title="Open Positions" subtitle="Could not load live MT5 positions." message={error} />;
    }

    if (!data?.connected) {
        return <WidgetEmptyState title="Open Positions" subtitle="MT5 is not connected." message={data?.message} />;
    }

    const positions = data.positions || [];
    const floating = data.floating_profit_loss || 0;

    return (
        <WidgetContainer>
            <WidgetHeader title="Open Positions" subtitle="Live MT5 exposure with automatic refresh." action={<StatusBadge label="Live" status="connected" />} />
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mb: 2 }}>
                <WidgetMetric title="Total Positions" value={data.total_positions} />
                <WidgetMetric title="Floating P/L" value={formatMoney(floating)} status={floating >= 0 ? "success" : "error"} />
            </Box>
            {positions.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No open MT5 positions right now.</Typography>
            ) : (
                positions.map((position) => <PositionRow key={position.ticket} position={position} />)
            )}
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>Auto refresh every 10 seconds.</Typography>
        </WidgetContainer>
    );
}
