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
import { getMT5AccountHealth } from "../../../api/mt5AccountsApi";

const REFRESH_INTERVAL_MS = 10000;

const formatMoney = (value, currency = "USD") =>
    value === null || value === undefined
        ? "—"
        : new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
            maximumFractionDigits: 2
        }).format(value);

const formatPercent = (value) =>
    value === null || value === undefined
        ? "—"
        : `${Number(value).toFixed(2)}%`;

export default function AccountHealthWidget({ accountId }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        const load = async () => {
            try {
                const response = await getMT5AccountHealth(accountId);
                if (active) {
                    setData(response);
                    setError("");
                }
            } catch (loadError) {
                if (active) {
                    setError(
                        loadError.response?.data?.detail ||
                        "Could not load MT5 account health."
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
        return <WidgetLoading title="Account Health" subtitle="Loading MT5 account health..." />;
    }

    if (error) {
        return <WidgetErrorState title="Account Health" subtitle="Could not load MT5 account health." message={error} />;
    }

    if (!data?.connected) {
        return <WidgetEmptyState title="Account Health" subtitle="MT5 is not connected." message={data?.message} />;
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
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: 2 }}>
                <WidgetMetric title="Balance" value={formatMoney(data.balance, currency)} />
                <WidgetMetric title="Equity" value={formatMoney(data.equity, currency)} />
                <WidgetMetric title="Margin" value={formatMoney(data.margin, currency)} />
                <WidgetMetric title="Free Margin" value={formatMoney(data.free_margin, currency)} />
                <WidgetMetric title="Margin Level" value={formatPercent(data.margin_level)} status={data.margin_level >= 100 ? "success" : "error"} />
                <WidgetMetric title="Leverage" value={data.leverage ? `1:${data.leverage}` : "—"} />
                <WidgetMetric title="Currency" value={currency} />
                <WidgetMetric title="Login" value={data.login || "—"} />
                <WidgetMetric title="Connection" value="Connected" status="success" />
            </Box>
        </WidgetContainer>
    );
}
