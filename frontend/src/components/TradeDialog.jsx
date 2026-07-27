import { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid,
    MenuItem,
    Box,
    Typography,
    Paper,
    Stack
} from "@mui/material";

import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const emptyTrade = {
    symbol: "",
    direction: "BUY",
    entry_price: "",
    stop_loss: "",
    take_profit: "",
    exit_price: "",
    lot_size: "",
    profit_money: "",
    session_name: "",
    trading_system_id: "",
    psychology_state_id: "",
    tradingview_link: "",
    screenshot_path: "",
    notes: ""
};

export default function TradeDialog({
    open,
    onClose,
    onSave,
    trade
}) {
    const [form, setForm] = useState(emptyTrade);
    const [screenshotFile, setScreenshotFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (trade) {
            setForm({
                ...emptyTrade,
                ...trade
            });
        } else {
            setForm(emptyTrade);
        }

        setScreenshotFile(null);
        setPreviewUrl(null);
    }, [trade, open]);

    const handleDialogClose = (event, reason) => {
        if (reason === "backdropClick") {
            return;
        }

        onClose();
    };

    const handleChange = (field, value) => {
        setForm({
            ...form,
            [field]: value
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        setScreenshotFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const cleanNumber = (value) => {
        if (value === "" || value === null || value === undefined) {
            return null;
        }

        return Number(value);
    };

    const handleSubmit = () => {
        const payload = {
            symbol: form.symbol,
            direction: form.direction,
            entry_price: cleanNumber(form.entry_price),
            stop_loss: cleanNumber(form.stop_loss),
            take_profit: cleanNumber(form.take_profit),
            exit_price: cleanNumber(form.exit_price),
            lot_size: cleanNumber(form.lot_size),
            profit_money: cleanNumber(form.profit_money),
            session_name: form.session_name || null,
            trading_system_id: cleanNumber(form.trading_system_id),
            psychology_state_id: cleanNumber(form.psychology_state_id),
            tradingview_link: form.tradingview_link || null,
            screenshot_path: form.screenshot_path || null,
            notes: form.notes || null
        };

        onSave(payload, screenshotFile);
    };

    return (
        <Dialog
            open={open}
            onClose={handleDialogClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>
                {trade ? "Edit Trade" : "New Trade"}
            </DialogTitle>

            <DialogContent>
                <Grid container spacing={2} mt={1}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            label="Pair"
                            fullWidth
                            value={form.symbol}
                            onChange={(e) => handleChange("symbol", e.target.value)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            select
                            label="Direction"
                            fullWidth
                            value={form.direction}
                            onChange={(e) => handleChange("direction", e.target.value)}
                        >
                            <MenuItem value="BUY">BUY</MenuItem>
                            <MenuItem value="SELL">SELL</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            label="Session"
                            fullWidth
                            value={form.session_name ?? ""}
                            onChange={(e) => handleChange("session_name", e.target.value)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            label="Entry"
                            type="number"
                            fullWidth
                            value={form.entry_price ?? ""}
                            onChange={(e) => handleChange("entry_price", e.target.value)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            label="SL"
                            type="number"
                            fullWidth
                            value={form.stop_loss ?? ""}
                            onChange={(e) => handleChange("stop_loss", e.target.value)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            label="TP"
                            type="number"
                            fullWidth
                            value={form.take_profit ?? ""}
                            onChange={(e) => handleChange("take_profit", e.target.value)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            label="Exit"
                            type="number"
                            fullWidth
                            value={form.exit_price ?? ""}
                            onChange={(e) => handleChange("exit_price", e.target.value)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            label="Lot Size"
                            type="number"
                            fullWidth
                            value={form.lot_size ?? ""}
                            onChange={(e) => handleChange("lot_size", e.target.value)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            label="Profit Money"
                            type="number"
                            fullWidth
                            value={form.profit_money ?? ""}
                            onChange={(e) => handleChange("profit_money", e.target.value)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            label="Trading System ID"
                            type="number"
                            fullWidth
                            value={form.trading_system_id ?? ""}
                            onChange={(e) => handleChange("trading_system_id", e.target.value)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            label="Psychology ID"
                            type="number"
                            fullWidth
                            value={form.psychology_state_id ?? ""}
                            onChange={(e) => handleChange("psychology_state_id", e.target.value)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 8 }}>
                        <TextField
                            label="TradingView Link"
                            fullWidth
                            value={form.tradingview_link ?? ""}
                            onChange={(e) => handleChange("tradingview_link", e.target.value)}
                        />
                    </Grid>

                    <Grid size={12}>
                        <Paper sx={{ p: 2 }}>
                            <Stack spacing={2}>
                                <Typography variant="h6">
                                    Screenshot
                                </Typography>

                                <Button
                                    component="label"
                                    variant="outlined"
                                    startIcon={<PhotoCameraIcon />}
                                >
                                    Choose Screenshot
                                    <input
                                        hidden
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </Button>

                                {screenshotFile && (
                                    <Typography color="success.main">
                                        Selected: {screenshotFile.name}
                                    </Typography>
                                )}

                                {previewUrl && (
                                    <Box
                                        component="img"
                                        src={previewUrl}
                                        alt="Screenshot preview"
                                        sx={{
                                            width: "100%",
                                            maxHeight: 260,
                                            objectFit: "contain",
                                            borderRadius: 2,
                                            border: "1px solid rgba(255,255,255,0.15)"
                                        }}
                                    />
                                )}

                                {!previewUrl && form.screenshot_path && (
                                    <Typography color="text.secondary">
                                        Existing screenshot: {form.screenshot_path}
                                    </Typography>
                                )}
                            </Stack>
                        </Paper>
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            label="Notes"
                            fullWidth
                            multiline
                            rows={4}
                            value={form.notes ?? ""}
                            onChange={(e) => handleChange("notes", e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Save Trade
                </Button>
            </DialogActions>
        </Dialog>
    );
}