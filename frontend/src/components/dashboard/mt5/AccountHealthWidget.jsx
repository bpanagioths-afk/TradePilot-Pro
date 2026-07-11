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

import { getMT5AccountHealth } from "../../../api/mt5AccountsApi";

const REFRESH_INTERVAL_MS = 10000;

const formatMoney = (value, currency = "USD") => {
    if (value === null || value === undefined) {
        return "—";
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 2
    }).format(value);
};

const formatPercent = (value) => {
    if (value === null || value === undefined) {
        return "—";
    }

    return `${Number(value).toFixed(2)}%`;
};

export default function AccountHealthWidget() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const loadAccountHealth = async () => {
        try {
            setError(false);

            const response = await getMT5AccountHealth();
            setData(response);
        } catch (loadError) {
            console.error("Failed to load MT5 account health", loadError);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAccountHealth();

        const intervalId = window.setInterval(
            loadAccountHealth,
            REFRESH_INTERVAL_MS
        );

        return () => {
            window.clearInterval(intervalId);
        };
    }, []);

    if (loading) {
        return (
            <WidgetLoading
                title="Account Health"
                subtitle="Loading MT5 account health..."
            />
        );
    }

    if (error) {
        return (
            <WidgetErrorState
                title="Account Health"
                subtitle="Could not load MT5 account health."
                message="Check backend connection and MT5 terminal status."
            />
        );
    }

    if (!data || !data.connected) {
        return (
            <WidgetEmptyState
                title="Account Health"
                subtitle="MT5 is not connected."
                message={data?.message || "Account health will appear when MT5 is connected."}
            />
        );
    }

    const currency = data.currency || "USD";

    return (
        <WidgetContainer>
            <WidgetHeader
                title="Account Health"
                subtitle={`${data.company || "MT5 Broker"} / ${data.server || "Server unavailable"}`}
                action={<StatusBadge label="Live" status="connected" />}
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
                    title="Balance"
                    value={formatMoney(data.balance, currency)}
                />

                <WidgetMetric
                    title="Equity"
                    value={formatMoney(data.equity, currency)}
                />

                <WidgetMetric
                    title="Margin"
                    value={formatMoney(data.margin, currency)}
                />

                <WidgetMetric
                    title="Free Margin"
                    value={formatMoney(data.free_margin, currency)}
                />

                <WidgetMetric
                    title="Margin Level"
                    value={formatPercent(data.margin_level)}
                    status={data.margin_level >= 100 ? "success" : "error"}
                />

                <WidgetMetric
                    title="Leverage"
                    value={data.leverage ? `1:${data.leverage}` : "—"}
                />

                <WidgetMetric
                    title="Currency"
                    value={currency}
                />

                <WidgetMetric
                    title="Login"
                    value={data.login || "—"}
                />

                <WidgetMetric
                    title="Connection"
                    value="Connected"
                    status="success"
                />
            </Box>
        </WidgetContainer>
    );
}