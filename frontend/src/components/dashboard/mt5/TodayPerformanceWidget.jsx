import { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";

import StatusBadge from "../../common/StatusBadge";
import {
    WidgetContainer,
    WidgetEmptyState,
    WidgetErrorState,
    WidgetHeader,
    WidgetLoading,
    WidgetMetric
} from "../../widgets";
import { getMT5TodayPerformance } from "../../../api/mt5AccountsApi";

const REFRESH_INTERVAL_MS = 10000;

const formatMoney = (value) =>
    value === null || value === undefined
        ? "—"
        : new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2
        }).format(value);

export default function TodayPerformanceWidget({ accountId }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        const load = async () => {
            try {
                const response = await getMT5TodayPerformance(accountId);
                if (active) {
                    setData(response);
                    setError("");
                }
            } catch (loadError) {
                if (active) {
                    setError(
                        loadError.response?.data?.detail ||
                        "Could not load today's MT5 performance."
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
        return <WidgetLoading title="Today's Performance" subtitle="Loading today's MT5 trading performance..." />;
    }

    if (error) {
        return <WidgetErrorState title="Today's Performance" subtitle="Could not load today's MT5 performance." message={error} />;
    }

    if (!data?.connected) {
        return <WidgetEmptyState title="Today's Performance" subtitle="MT5 is not connected." message={data?.message} />;
    }

    const profit = data.profit_today ?? 0;
    const commission = data.commission_today ?? 0;
    const swap = data.swap_today ?? 0;

    return (
        <WidgetContainer>
            <WidgetHeader
                title="Today's Performance"
                subtitle="Closed MT5 trading activity for the current day."
                action={<StatusBadge label="Live" status="connected" />}
            />
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: 2 }}>
                <WidgetMetric title="Profit Today" value={formatMoney(profit)} status={profit >= 0 ? "success" : "error"} />
                <WidgetMetric title="Trades Today" value={data.trades_today ?? 0} />
                <WidgetMetric title="Win Rate Today" value={`${Number(data.win_rate_today ?? 0).toFixed(2)}%`} />
                <WidgetMetric title="Lots Today" value={Number(data.lots_today ?? 0).toFixed(2)} />
                <WidgetMetric title="Commission" value={formatMoney(commission)} status={commission < 0 ? "error" : undefined} />
                <WidgetMetric title="Swap" value={formatMoney(swap)} status={swap < 0 ? "error" : undefined} />
            </Box>
        </WidgetContainer>
    );
}
