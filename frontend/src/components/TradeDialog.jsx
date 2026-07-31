import { useEffect, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import {
    psychologyStateOptions,
    tradingSystemOptions
} from "../features/trades/tradeOptions";


const emptyTrade = {
    symbol: "",
    direction: "BUY",
    entry_price: "",
    stop_loss: "",
    take_profit: "",
    exit_price: "",
    lot_size: "",
    profit_money: "",
    open_time: "",
    close_time: "",
    session_name: "",
    trading_system_id: "",
    psychology_state_id: "",
    tradingview_link: "",
    screenshot_path: "",
    notes: "",
    mt5_position_id: ""
};


function toDateTimeLocalValue(value) {
    if (!value) {
        return "";
    }

    return String(value).slice(0, 16);
}


export default function TradeDialog({
    open,
    onClose,
    onSave,
    trade,
    saveError = "",
    saving = false
}) {
    const [form, setForm] = useState(
        emptyTrade
    );

    const [
        screenshotFile,
        setScreenshotFile
    ] = useState(null);

    const [
        previewUrl,
        setPreviewUrl
    ] = useState(null);

    const [
        submitted,
        setSubmitted
    ] = useState(false);


    useEffect(() => {
        if (trade) {
            setForm({
                ...emptyTrade,
                ...trade,
                open_time:
                    toDateTimeLocalValue(
                        trade.open_time
                    ),
                close_time:
                    toDateTimeLocalValue(
                        trade.close_time
                    )
            });
        } else {
            setForm(emptyTrade);
        }

        setScreenshotFile(null);
        setPreviewUrl(null);
        setSubmitted(false);
    }, [trade, open]);


    const handleDialogClose = (
        event,
        reason
    ) => {
        if (reason === "backdropClick") {
            return;
        }

        onClose();
    };


    const handleChange = (
        field,
        value
    ) => {
        setForm((currentForm) => ({
            ...currentForm,
            [field]: value
        }));
    };


    const handleFileChange = (
        event
    ) => {
        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        setScreenshotFile(file);

        setPreviewUrl(
            URL.createObjectURL(file)
        );
    };


    const cleanNumber = (value) => {
        if (
            value === ""
            || value === null
            || value === undefined
        ) {
            return null;
        }

        return Number(value);
    };


    const cleanDateTime = (value) => {
        if (!value) {
            return null;
        }

        return value;
    };


    const hasMt5PositionId =
        String(
            form.mt5_position_id ?? ""
        ).trim() !== ""
        && Number(
            form.mt5_position_id
        ) > 0;


    const hasInvalidTradePeriod =
        Boolean(form.open_time)
        && Boolean(form.close_time)
        && new Date(form.close_time)
            < new Date(form.open_time);


    const handleSubmit = () => {
        setSubmitted(true);

        if (
            !hasMt5PositionId
            || hasInvalidTradePeriod
        ) {
            return;
        }

        const payload = {
            symbol: form.symbol,
            direction: form.direction,

            entry_price: cleanNumber(
                form.entry_price
            ),

            stop_loss: cleanNumber(
                form.stop_loss
            ),

            take_profit: cleanNumber(
                form.take_profit
            ),

            exit_price: cleanNumber(
                form.exit_price
            ),

            lot_size: cleanNumber(
                form.lot_size
            ),

            profit_money: cleanNumber(
                form.profit_money
            ),

            open_time: cleanDateTime(
                form.open_time
            ),

            close_time: cleanDateTime(
                form.close_time
            ),

            session_name:
                form.session_name
                || null,

            trading_system_id:
                cleanNumber(
                    form.trading_system_id
                ),

            psychology_state_id:
                cleanNumber(
                    form.psychology_state_id
                ),

            tradingview_link:
                form.tradingview_link
                || null,

            screenshot_path:
                form.screenshot_path
                || null,

            notes:
                form.notes
                || null,

            mt5_position_id:
                cleanNumber(
                    form.mt5_position_id
                )
        };

        onSave(
            payload,
            screenshotFile
        );
    };


    return (
        <Dialog
            open={open}
            onClose={handleDialogClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>
                {trade
                    ? "Edit Trade"
                    : "New Trade"}
            </DialogTitle>

            <DialogContent>
                <Grid
                    container
                    spacing={2}
                    mt={1}
                >
                    {saveError && (
                        <Grid size={12}>
                            <Alert severity="error">
                                {saveError}
                            </Alert>
                        </Grid>
                    )}

                    {submitted
                        && !hasMt5PositionId
                        && (
                            <Grid size={12}>
                                <Alert severity="error">
                                    Το MT5 Εισιτήριο είναι
                                    υποχρεωτικό. Χωρίς αυτό
                                    μπορεί να δημιουργηθεί
                                    διπλοεγγραφή στο επόμενο
                                    MT5 Sync.
                                </Alert>
                            </Grid>
                        )}

                    {submitted
                        && hasInvalidTradePeriod
                        && (
                            <Grid size={12}>
                                <Alert severity="error">
                                    Η ημερομηνία κλεισίματος
                                    δεν μπορεί να είναι πριν
                                    από την ημερομηνία
                                    ανοίγματος.
                                </Alert>
                            </Grid>
                        )}

                    <Grid
                        size={{
                            xs: 12,
                            md: 4
                        }}
                    >
                        <TextField
                            label="Pair"
                            required
                            fullWidth
                            value={form.symbol}
                            onChange={(event) =>
                                handleChange(
                                    "symbol",
                                    event.target.value
                                )
                            }
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 4
                        }}
                    >
                        <TextField
                            select
                            label="Direction"
                            required
                            fullWidth
                            value={form.direction}
                            onChange={(event) =>
                                handleChange(
                                    "direction",
                                    event.target.value
                                )
                            }
                        >
                            <MenuItem value="BUY">
                                BUY
                            </MenuItem>

                            <MenuItem value="SELL">
                                SELL
                            </MenuItem>
                        </TextField>
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 4
                        }}
                    >
                        <TextField
                            label="Session"
                            fullWidth
                            value={
                                form.session_name
                                ?? ""
                            }
                            onChange={(event) =>
                                handleChange(
                                    "session_name",
                                    event.target.value
                                )
                            }
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            label="MT5 Εισιτήριο"
                            type="number"
                            required
                            fullWidth
                            error={
                                submitted
                                && !hasMt5PositionId
                            }
                            value={
                                form.mt5_position_id
                                ?? ""
                            }
                            onChange={(event) =>
                                handleChange(
                                    "mt5_position_id",
                                    event.target.value
                                )
                            }
                            helperText={
                                hasMt5PositionId
                                    ? (
                                        "Το εισιτήριο θα χρησιμοποιηθεί για ασφαλή σύνδεση με το MT5."
                                    )
                                    : (
                                        "Υποχρεωτικό: βάλε το Εισιτήριο της θέσης ή εντολής από το MT5 για να αποφευχθεί διπλοεγγραφή."
                                    )
                            }
                            FormHelperTextProps={{
                                sx: {
                                    color:
                                        hasMt5PositionId
                                            ? "common.white"
                                            : "error.main",
                                    fontWeight: 700,
                                    fontSize: "0.82rem",
                                    opacity: 1
                                }
                            }}
                            inputProps={{
                                step: "1",
                                min: "1"
                            }}
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 3
                        }}
                    >
                        <TextField
                            label="Entry"
                            type="number"
                            required
                            fullWidth
                            value={
                                form.entry_price
                                ?? ""
                            }
                            onChange={(event) =>
                                handleChange(
                                    "entry_price",
                                    event.target.value
                                )
                            }
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 3
                        }}
                    >
                        <TextField
                            label="SL"
                            type="number"
                            fullWidth
                            value={
                                form.stop_loss
                                ?? ""
                            }
                            onChange={(event) =>
                                handleChange(
                                    "stop_loss",
                                    event.target.value
                                )
                            }
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 3
                        }}
                    >
                        <TextField
                            label="TP"
                            type="number"
                            fullWidth
                            value={
                                form.take_profit
                                ?? ""
                            }
                            onChange={(event) =>
                                handleChange(
                                    "take_profit",
                                    event.target.value
                                )
                            }
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 3
                        }}
                    >
                        <TextField
                            label="Exit"
                            type="number"
                            fullWidth
                            value={
                                form.exit_price
                                ?? ""
                            }
                            onChange={(event) =>
                                handleChange(
                                    "exit_price",
                                    event.target.value
                                )
                            }
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >
                        <TextField
                            label="Open Time"
                            type="datetime-local"
                            fullWidth
                            value={
                                form.open_time
                                ?? ""
                            }
                            onChange={(event) =>
                                handleChange(
                                    "open_time",
                                    event.target.value
                                )
                            }
                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                }
                            }}
                            helperText={
                                "Πότε ενεργοποιήθηκε και άνοιξε πραγματικά η θέση."
                            }
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >
                        <TextField
                            label="Close Time"
                            type="datetime-local"
                            fullWidth
                            error={
                                submitted
                                && hasInvalidTradePeriod
                            }
                            value={
                                form.close_time
                                ?? ""
                            }
                            onChange={(event) =>
                                handleChange(
                                    "close_time",
                                    event.target.value
                                )
                            }
                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                }
                            }}
                            helperText={
                                "Συμπλήρωσέ το όταν το trade έχει κλείσει, ώστε να εμφανίζεται στο Portfolio."
                            }
                            FormHelperTextProps={{
                                sx: {
                                    color:
                                        form.close_time
                                            ? "common.white"
                                            : "warning.main",
                                    fontWeight: 700,
                                    opacity: 1
                                }
                            }}
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 4
                        }}
                    >
                        <TextField
                            label="Lot Size"
                            type="number"
                            fullWidth
                            value={
                                form.lot_size
                                ?? ""
                            }
                            onChange={(event) =>
                                handleChange(
                                    "lot_size",
                                    event.target.value
                                )
                            }
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 4
                        }}
                    >
                        <TextField
                            label="Profit Money"
                            type="number"
                            fullWidth
                            value={
                                form.profit_money
                                ?? ""
                            }
                            onChange={(event) =>
                                handleChange(
                                    "profit_money",
                                    event.target.value
                                )
                            }
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 4
                        }}
                    >
                        <TextField
                            select
                            label="Trading System"
                            fullWidth
                            value={
                                form.trading_system_id
                                ?? ""
                            }
                            onChange={(event) =>
                                handleChange(
                                    "trading_system_id",
                                    event.target.value
                                )
                            }
                        >
                            <MenuItem value="">
                                Κανένα
                            </MenuItem>

                            {tradingSystemOptions.map(
                                (option) => (
                                    <MenuItem
                                        key={option.id}
                                        value={option.id}
                                    >
                                        {option.label}
                                    </MenuItem>
                                )
                            )}
                        </TextField>
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 4
                        }}
                    >
                        <TextField
                            select
                            label="Psychology"
                            fullWidth
                            value={
                                form.psychology_state_id
                                ?? ""
                            }
                            onChange={(event) =>
                                handleChange(
                                    "psychology_state_id",
                                    event.target.value
                                )
                            }
                        >
                            <MenuItem value="">
                                Καμία επιλογή
                            </MenuItem>

                            {psychologyStateOptions.map(
                                (option) => (
                                    <MenuItem
                                        key={option.id}
                                        value={option.id}
                                    >
                                        {option.label}
                                    </MenuItem>
                                )
                            )}
                        </TextField>
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 8
                        }}
                    >
                        <TextField
                            label="TradingView Link"
                            fullWidth
                            value={
                                form.tradingview_link
                                ?? ""
                            }
                            onChange={(event) =>
                                handleChange(
                                    "tradingview_link",
                                    event.target.value
                                )
                            }
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
                                    startIcon={
                                        <PhotoCameraIcon />
                                    }
                                >
                                    Choose Screenshot

                                    <input
                                        hidden
                                        type="file"
                                        accept="image/*"
                                        onChange={
                                            handleFileChange
                                        }
                                    />
                                </Button>

                                {screenshotFile && (
                                    <Typography
                                        color="success.main"
                                    >
                                        Selected:{" "}
                                        {screenshotFile.name}
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
                                            border:
                                                "1px solid rgba(255,255,255,0.15)"
                                        }}
                                    />
                                )}

                                {!previewUrl
                                    && form.screenshot_path
                                    && (
                                        <Typography
                                            color="text.secondary"
                                        >
                                            Existing screenshot:{" "}
                                            {
                                                form.screenshot_path
                                            }
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
                            value={
                                form.notes
                                ?? ""
                            }
                            onChange={(event) =>
                                handleChange(
                                    "notes",
                                    event.target.value
                                )
                            }
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={onClose}
                    disabled={saving}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={saving}
                >
                    {saving
                        ? "Saving..."
                        : "Save Trade"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}