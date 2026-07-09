import { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

import StatusBadge from "../../common/StatusBadge";
import TradePilotButton from "../../common/TradePilotButton";

import {
    WidgetContainer,
    WidgetHeader,
    WidgetFooter,
    WidgetMetric
} from "../../widgets";

import {
    getMT5Accounts,
    getMT5AccountSummary,
    syncMT5Account
} from "../../../api/mt5AccountsApi";

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

const formatNumber = (value) => {
    if (value === null || value === undefined) {
        return "—";
    }

    return new Intl.NumberFormat("en-US").format(value);
};

function DetailRow({ label, value }) {
    return (
        <>
            <Box sx={{ color: "text.secondary", fontSize: 14 }}>
                {label}
            </Box>

            <Box sx={{ fontWeight: 600, fontSize: 14 }}>
                {value}
            </Box>
        </>
    );
}

export default function MT5Widget() {
    const navigate = useNavigate();

    const [account, setAccount] = useState(null);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);

    const loadMT5Data = async () => {
        try {
            setLoading(true);

            const accounts = await getMT5Accounts();
            const activeAccount =
                accounts.find((item) => item.is_active) || accounts[0] || null;

            setAccount(activeAccount);

            if (activeAccount) {
                const accountSummary = await getMT5AccountSummary(activeAccount.id);
                setSummary(accountSummary);
            }
        } catch (error) {
            console.error("Failed to load MT5 dashboard widget", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSync = async () => {
        if (!account) {
            return;
        }

        try {
            setSyncing(true);
            await syncMT5Account(account.id);
            await loadMT5Data();
        } catch (error) {
            console.error("Failed to sync MT5 account from dashboard", error);
        } finally {
            setSyncing(false);
        }
    };

    useEffect(() => {
        loadMT5Data();
    }, []);

    const connectionStatus =
        summary?.connection_status === "connected"
            ? "connected"
            : account?.is_active
                ? "active"
                : "disabled";

    const connectionLabel =
        loading
            ? "Loading"
            : summary?.connection_status === "connected"
                ? "Connected"
                : account?.is_active
                    ? "Active"
                    : "No Active Account";

    return (
        <WidgetContainer>
            <WidgetHeader
                title="MT5 Trading Widget"
                subtitle="Live account status and sync overview."
                action={
                    <StatusBadge
                        label={connectionLabel}
                        status={connectionStatus}
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
                        md: "repeat(4, 1fr)"
                    },
                    gap: 2,
                    mb: 3
                }}
            >
                <WidgetMetric
                    title="Balance"
                    value={formatMoney(summary?.balance)}
                />

                <WidgetMetric
                    title="Equity"
                    value={formatMoney(summary?.equity)}
                />

                <WidgetMetric
                    title="Floating P/L"
                    value={formatMoney(summary?.floating_profit_loss)}
                    status={
                        (summary?.floating_profit_loss ?? 0) >= 0
                            ? "success"
                            : "error"
                    }
                />

                <WidgetMetric
                    title="Open Positions"
                    value={formatNumber(summary?.open_positions)}
                />
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "140px 1fr"
                    },
                    rowGap: 1,
                    columnGap: 2,
                    mb: 3,
                    alignItems: "center"
                }}
            >
                <DetailRow
                    label="Connection"
                    value={connectionLabel}
                />

                <DetailRow
                    label="Account"
                    value={account?.account_name || "No account selected"}
                />

                <DetailRow
                    label="Broker"
                    value={account?.broker || "—"}
                />

                <DetailRow
                    label="Server"
                    value={account?.server || "—"}
                />
            </Box>

            <WidgetFooter>
                <TradePilotButton
                    variant="secondary"
                    onClick={() => navigate("/mt5")}
                >
                    View MT5
                </TradePilotButton>

                <TradePilotButton
                    loading={syncing}
                    disabled={!account}
                    onClick={handleSync}
                >
                    Sync Now
                </TradePilotButton>
            </WidgetFooter>
        </WidgetContainer>
    );
}