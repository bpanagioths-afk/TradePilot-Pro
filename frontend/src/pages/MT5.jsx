import { useState } from "react";

import {
    Box,
    Typography,
    Paper,
    Button,
    Stack,
    Chip,
    Alert
} from "@mui/material";

import SyncIcon from "@mui/icons-material/Sync";
import StorageIcon from "@mui/icons-material/Storage";

import api from "../api/api";

export default function MT5() {

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const syncMt5 = () => {
        setLoading(true);
        setResult(null);
        setError(null);

        api
            .post("/mt5/sync")
            .then((res) => {
                setResult(res.data);
            })
            .catch((err) => {
                console.error(err);
                setError("MT5 sync failed. Check that MetaTrader 5 is open and logged in.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Box>
            <Typography variant="h4" mb={3}>
                MT5 Sync
            </Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Stack spacing={2}>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ alignItems: "center" }}
                    >
                        <StorageIcon color="primary" />

                        <Typography variant="h6">
                            MetaTrader 5 Connection
                        </Typography>

                        <Chip
                            label="Service Ready"
                            color="success"
                        />
                    </Stack>

                    <Typography color="text.secondary">
                        Keep MetaTrader 5 open and logged in. Then press Sync Now to import closed trades from your account history.
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<SyncIcon />}
                        onClick={syncMt5}
                        disabled={loading}
                        sx={{ width: 180 }}
                    >
                        {loading ? "Syncing..." : "Sync Now"}
                    </Button>
                </Stack>
            </Paper>

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

            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" mb={2}>
                    How it works
                </Typography>

                <Stack spacing={1}>
                    <Typography color="text.secondary">
                        1. Open MetaTrader 5.
                    </Typography>

                    <Typography color="text.secondary">
                        2. Login to your trading account.
                    </Typography>

                    <Typography color="text.secondary">
                        3. Make sure your closed trades appear in Account History.
                    </Typography>

                    <Typography color="text.secondary">
                        4. Press Sync Now.
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
}