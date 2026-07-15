import { useState, useEffect } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Grid,
    Box,
    Chip,
    Link,
    Divider,
    Paper,
    Stack
} from "@mui/material";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { evaluateTrade } from "../services/ruleEngineService";
import TradeScoreCard from "./TradeScoreCard";


const API_BASE_URL = "http://127.0.0.1:8000";

const psychologyMap = {
    1: "Ήρεμος",
    2: "Σίγουρος",
    3: "Συγκεντρωμένος",
    4: "Αγχωμένος",
    5: "FOMO",
    6: "Revenge Trading",
    7: "Κουρασμένος",
    8: "Βιαστικός"
};

const systemMap = {
    1: "SMC",
    2: "Price Trap",
    3: "ICT",
    4: "Liquidity Grab",
    5: "Breakout",
    6: "Trend Following",
    7: "Scalping"
};

function InfoBox({ label, value }) {
    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
                {label}
            </Typography>

            <Typography variant="h6">
                {value ?? "-"}
            </Typography>
        </Paper>
    );
}

export default function TradeDetailsDialog({
    open,
    onClose,
    trade
}) {
    const [zoomOpen, setZoomOpen] = useState(false);
    const [scoreData, setScoreData] = useState(null);

    useEffect(() => {

        if (!trade) {
            return;
        }

        evaluateTrade(trade.id)
            .then((res) => {
                setScoreData(res.data);
            })
            .catch(console.error);

    }, [trade]);

    if (!trade) {
        return null;
    }

    const isWin = trade.is_win === 1;
    const profitColor = isWin ? "success.main" : "error.main";

    const rrColor =
        trade.risk_reward >= 2
            ? "success"
            : trade.risk_reward >= 1
                ? "warning"
                : "error";

    const screenshotUrl = trade.screenshot_path
        ? `${API_BASE_URL}${trade.screenshot_path}`
        : null;

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="lg"
                fullWidth
            >
                <DialogTitle>
                        <Stack
                           direction="row"
                           sx={{
                               justifyContent: "space-between",
                               alignItems: "center"
                           }}
                        >
                        <Box>
                            <Typography variant="h5">
                                {trade.symbol} {trade.direction}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                Trade #{trade.id}
                            </Typography>
                        </Box>

                        <Stack direction="row" spacing={1}>
                            <Chip
                                icon={
                                    trade.direction === "BUY"
                                        ? <TrendingUpIcon />
                                        : <TrendingDownIcon />
                                }
                                label={trade.direction}
                                color={trade.direction === "BUY" ? "success" : "error"}
                            />

                            <Chip
                                label={isWin ? "WIN" : "LOSS"}
                                color={isWin ? "success" : "error"}
                            />
                        </Stack>
                    </Stack>
                </DialogTitle>

                <DialogContent>
                    <Box mb={3}>
                        <Typography
                            variant="h3"
                            sx={{ color: profitColor }}
                        >
                            {trade.profit_money ?? 0} €
                        </Typography>

                        <Typography color="text.secondary">
                             {trade.movement_value ?? trade.profit_pips ?? 0}{" "}
                             {trade.movement_unit ?? "pips"}
                        </Typography>
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <InfoBox label="Entry" value={trade.entry_price} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <InfoBox label="Exit" value={trade.exit_price} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <InfoBox label="Stop Loss" value={trade.stop_loss} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <InfoBox label="Take Profit" value={trade.take_profit} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <InfoBox label="Lot Size" value={trade.lot_size} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Risk Reward
                                </Typography>

                                <Chip
                                    label={`RR ${trade.risk_reward ?? 0}`}
                                    color={rrColor}
                                    sx={{ mt: 1 }}
                                />
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <InfoBox
                                label="Duration"
                                value={`${trade.duration_minutes ?? 0} min`}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <InfoBox label="Session" value={trade.session_name} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InfoBox
                                label="Trading System"
                                value={systemMap[trade.trading_system_id] || "-"}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InfoBox
                                label="Psychology"
                                value={psychologyMap[trade.psychology_state_id] || "-"}
                            />
                        </Grid>
                    </Grid>
                    <TradeScoreCard scoreData={scoreData} />
                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" mb={1}>
                        Notes
                    </Typography>

                    <Paper sx={{ p: 2, mb: 3 }}>
                        <Typography>
                            {trade.notes || "No notes"}
                        </Typography>
                    </Paper>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6" mb={1}>
                                    TradingView
                                </Typography>

                                {trade.tradingview_link ? (
                                    <Button
                                        variant="contained"
                                        startIcon={<OpenInNewIcon />}
                                        component={Link}
                                        href={trade.tradingview_link}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Open Chart
                                    </Button>
                                ) : (
                                    <Typography color="text.secondary">
                                        No TradingView link
                                    </Typography>
                                )}
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6" mb={1}>
                                    Screenshot
                                </Typography>

                                {screenshotUrl ? (
                                    <Box>
                                        <Box
                                            component="img"
                                            src={screenshotUrl}
                                            alt="Trade screenshot"
                                            onClick={() => setZoomOpen(true)}
                                            sx={{
                                                width: "100%",
                                                maxHeight: 280,
                                                objectFit: "cover",
                                                borderRadius: 2,
                                                cursor: "pointer",
                                                border: "1px solid rgba(255,255,255,0.15)"
                                            }}
                                        />

                                        <Button
                                            sx={{ mt: 1 }}
                                            startIcon={<ZoomInIcon />}
                                            onClick={() => setZoomOpen(true)}
                                        >
                                            Click to Zoom
                                        </Button>
                                    </Box>
                                ) : (
                                    <Typography color="text.secondary">
                                        No screenshot
                                    </Typography>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={zoomOpen}
                onClose={() => setZoomOpen(false)}
                maxWidth="xl"
                fullWidth
            >
                <DialogContent>
                    {screenshotUrl && (
                        <Box
                            component="img"
                            src={screenshotUrl}
                            alt="Trade screenshot zoom"
                            sx={{
                                width: "100%",
                                maxHeight: "85vh",
                                objectFit: "contain"
                            }}
                        />
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setZoomOpen(false)}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}