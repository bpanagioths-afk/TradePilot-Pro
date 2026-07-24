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
import { getMT5ConnectionHealth } from "../../../api/mt5AccountsApi";

const REFRESH_INTERVAL_MS = 10000;

export default function ConnectionHealthWidget({ accountId }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        const load = async () => {
            try {
                const response = await getMT5ConnectionHealth(accountId);
                if (active) {
                    setData(response);
                    setError("");
                }
            } catch (loadError) {
                if (active) {
                    setError(
                        loadError.response?.data?.detail ||
                        "Unable to load MT5 connection status."
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
        return <WidgetLoading title="Connection Health" subtitle="Loading MT5 connection status..." />;
    }

    if (error) {
        return <WidgetErrorState title="Connection Health" subtitle="Unable to load MT5 connection status." message={error} />;
    }

    if (!data?.connected) {
        return <WidgetEmptyState title="Connection Health" subtitle="MT5 is not connected." message={data?.message} />;
    }

    return (
        <WidgetContainer>
            <WidgetHeader
                title="Connection Health"
                subtitle="Live MT5 terminal status."
                action={<StatusBadge label="Connected" status="connected" />}
            />
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: 2 }}>
                <WidgetMetric title="Terminal" value={data.terminal_connected ? "Online" : "Offline"} status={data.terminal_connected ? "success" : "error"} />
                <WidgetMetric title="Trading" value={data.trade_allowed ? "Allowed" : "Disabled"} status={data.trade_allowed ? "success" : "error"} />
                <WidgetMetric title="Build" value={data.terminal_build} />
                <WidgetMetric title="Version" value={data.terminal_version} />
                <WidgetMetric title="Server" value={data.account_server} />
                <WidgetMetric title="Company" value={data.account_company} />
            </Box>
        </WidgetContainer>
    );
}
