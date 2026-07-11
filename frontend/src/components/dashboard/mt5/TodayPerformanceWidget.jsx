import { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";

import StatusBadge from "../../common/StatusBadge";

import {
    WidgetContainer,
    WidgetHeader,
    WidgetMetric,
    WidgetLoading,
    WidgetErrorState,
    WidgetEmptyState
} from "../../widgets";

import {
    getMT5TodayPerformance
} from "../../../api/mt5AccountsApi";

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

const formatPercent = (value) => {
    if (value === null || value === undefined) {
        return "—";
    }

    return `${Number(value).toFixed(2)}%`;
};

const formatLots = (value) => {
    if (value === null || value === undefined) {
        return "—";
    }

    return Number(value).toFixed(2);
};

export default function TodayPerformanceWidget() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const loadTodayPerformance = async () => {
        try {
            setError(false);

            const response = await getMT5TodayPerformance();
            setData(response);
        } catch (loadError) {
            console.error(
                "Failed to load MT5 today performance",
                loadError
            );

            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTodayPerformance();

        const intervalId = window.setInterval(
            loadTodayPerformance,
            REFRESH_INTERVAL_MS
        );

        return () => {
            window.clearInterval(intervalId);
        };
    }, []);

    if (loading) {
        return (
            <WidgetLoading
                title="Today's Performance"
                subtitle="Loading today's MT5 trading performance..."
            />
        );
    }

    if (error) {
        return (
            <WidgetErrorState
                title="Today's Performance"
                subtitle="Could not load today's MT5 performance."
                message="Check backend connection and MT5 terminal status."
            />
        );
    }

    if (!data || !data.connected) {
        return (
            <WidgetEmptyState
                title="Today's Performance"
                subtitle="MT5 is not connected."
                message={
                    data?.message ||
                    "Today's trading performance will appear when MT5 is connected."
                }
            />
        );
    }

    const profitToday = data.profit_today ?? 0;
    const commissionToday = data.commission_today ?? 0;
    const swapToday = data.swap_today ?? 0;

    return (
        <WidgetContainer>
            <WidgetHeader
                title="Today's Performance"
                subtitle="Closed MT5 trading activity for the current day."
                action={
                    <StatusBadge
                        label="Live"
                        status="connected"
                    />
                }
            />

            <Divider sx={{ mb: 2 }} />

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        md: "1fr 1fr 1fr"
                    },
                    gap: 2
                }}
            >
                <WidgetMetric
                    title="Profit Today"
                    value={formatMoney(profitToday)}
                    status={
                        profitToday >= 0
                            ? "success"
                            : "error"
                    }
                />

                <WidgetMetric
                    title="Trades Today"
                    value={data.trades_today ?? 0}
                />

                <WidgetMetric
                    title="Win Rate Today"
                    value={formatPercent(
                        data.win_rate_today
                    )}
                />

                <WidgetMetric
                    title="Lots Today"
                    value={formatLots(
                        data.lots_today
                    )}
                />

                <WidgetMetric
                    title="Commission"
                    value={formatMoney(
                        commissionToday
                    )}
                    status={
                        commissionToday < 0
                            ? "error"
                            : undefined
                    }
                />

                <WidgetMetric
                    title="Swap"
                    value={formatMoney(swapToday)}
                    status={
                        swapToday < 0
                            ? "error"
                            : undefined
                    }
                />
            </Box>
        </WidgetContainer>
    );
}