import { useEffect, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Chip,
    Paper,
    Stack,
    Typography
} from "@mui/material";

import SyncIcon from "@mui/icons-material/Sync";
import StorageIcon from "@mui/icons-material/Storage";

import OpenPositionsWidget from "../components/dashboard/mt5/OpenPositionsWidget";
import TodayPerformanceWidget from "../components/dashboard/mt5/TodayPerformanceWidget";
import ConnectionHealthWidget from "../components/dashboard/mt5/ConnectionHealthWidget";
import PendingOrdersWidget from "../components/dashboard/mt5/PendingOrdersWidget";
import AccountHealthWidget from "../components/dashboard/mt5/AccountHealthWidget";

import {
    getMT5Accounts,
    syncMT5Account
} from "../api/mt5AccountsApi";

export default function MT5() {
    const [accounts, setAccounts] = useState([]);
    const [loadingAccounts, setLoadingAccounts] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getMT5Accounts()
            .then((data) => {
                setAccounts(data || []);
            })
            .catch((loadError) => {
                console.error(loadError);
                setError("Failed to load MT5 accounts.");
            })
            .finally(() => {
                setLoadingAccounts(false);
            });
    }, []);

    const activeAccount = accounts.find((account) => account.is_active);

    const syncMt5 = () => {
        if (!activeAccount) {
            setError("No active MT5 account found. Activate an account before syncing.");
            return;
        }

        setSyncing(true);
        setResult(null);
        setError(null);

        syncMT5Account(activeAccount.id)
            .then((data) => {
                setResult(data);
            })
            .catch((syncError) => {
                console.error(syncError);
                setError("MT5 sync failed. Check that MetaTrader 5 is open and logged in.");
            })
            .finally(() => {
                setSyncing(false);
            });
    };

    return (
        <Box>
            <Typography variant="h4" mb={1}>
                MT5 Trading Center
            </Typography>

            <Typography color="text.secondary" mb={3}>
                Live MetaTrader 5 trading overview, open positions, pending orders and account sync.
            </Typography>

<Box
    sx={{
        display: "grid",
        gridTemplateColumns: {
            xs: "1fr",
            lg: "1.15fr 1fr"
        },
        gap: 3,
        mb: 3,
        alignItems: "stretch"
    }}
>
    <Paper
        sx={{
            p: 2,
            height: "100%"
        }}
    >
        <Stack spacing={1.5}>
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    alignItems: "center",
                    flexWrap: "wrap"
                }}
            >
                <StorageIcon color="primary" />

                <Typography variant="h6">
                    MetaTrader 5 Connection
                </Typography>

                <Chip
                    label={
                        activeAccount
                            ? "Active Account Ready"
                            : "No Active Account"
                    }
                    color={
                        activeAccount
                            ? "success"
                            : "warning"
                    }
                />
            </Stack>

            <Typography color="text.secondary">
                Keep MetaTrader 5 open and logged in. Use Sync Now
                to import closed trades from the active MT5 account
                history.
            </Typography>

            {activeAccount && (
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Active account: {activeAccount.account_name} /{" "}
                    {activeAccount.broker}
                </Typography>
            )}

            <Button
                variant="contained"
                startIcon={<SyncIcon />}
                onClick={syncMt5}
                disabled={
                    syncing ||
                    loadingAccounts ||
                    !activeAccount
                }
                sx={{ width: 180 }}
            >
                {syncing ? "Syncing..." : "Sync Now"}
            </Button>
        </Stack>
    </Paper>

    <ConnectionHealthWidget />
</Box>
            {result && (
                <Alert severity={result.success ? "success" : "warning"} sx={{ mb: 3 }}>
                    Sync result: imported {result.imported ?? 0}, skipped {result.skipped ?? 0}
                </Alert>
            )}

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                   {error}
                </Alert>
            )}

            <Box sx={{ mb: 3 }}>
                <AccountHealthWidget />
            </Box>

            <Box sx={{ mb: 3 }}>
                <OpenPositionsWidget /> 
            </Box>

            <Box sx={{ mb: 3 }}>
                <AccountHealthWidget />
            </Box>

            <Box sx={{ mb: 3 }}>
                <TodayPerformanceWidget />
            </Box>

            <Box sx={{ mb: 3 }}>
                <OpenPositionsWidget />
            </Box>

            <Box sx={{ mb: 3 }}>
                <PendingOrdersWidget />
            </Box>

        </Box>
    );
}