import { useEffect, useMemo, useState } from "react";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Paper,
    Typography
} from "@mui/material";

import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import PublicIcon from "@mui/icons-material/Public";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useNavigate } from "react-router-dom";

import { getTradingPlans } from "../../services/tradingPlanService";

function MissionMetric({
    icon,
    label,
    value,
    helper
}) {
    return (
        <Box
            sx={{
                minHeight: 118,
                p: 2,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.default"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1.25,
                    alignItems: "center",
                    mb: 1.5
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        placeItems: "center",
                        width: 34,
                        height: 34,
                        borderRadius: 1.5,
                        bgcolor: "action.hover",
                        color: "primary.main"
                    }}
                >
                    {icon}
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={600}
                >
                    {label}
                </Typography>
            </Box>

            <Typography
                variant="h5"
                fontWeight={800}
                sx={{
                    lineHeight: 1.1,
                    mb: 0.75
                }}
            >
                {value}
            </Typography>

            <Typography
                variant="caption"
                color="text.secondary"
            >
                {helper}
            </Typography>
        </Box>
    );
}

function getAllowedMarkets(plan) {
    const markets = [];

    if (plan.allow_forex) {
        markets.push("Forex");
    }

    if (plan.allow_metals) {
        markets.push("Metals");
    }

    if (plan.allow_indices) {
        markets.push("Indices");
    }

    if (plan.allow_crypto) {
        markets.push("Crypto");
    }

    return markets;
}

function getAllowedSessions(plan) {
    const sessions = [];

    if (plan.session_asia) {
        sessions.push("Asia");
    }

    if (plan.session_london) {
        sessions.push("London");
    }

    if (plan.session_newyork) {
        sessions.push("New York");
    }

    if (plan.session_overlap) {
        sessions.push("Overlap");
    }

    return sessions;
}

export default function TodayMission() {
    const navigate = useNavigate();

    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadTradingPlan() {
            try {
                setLoading(true);
                setError("");

                const response = await getTradingPlans();

                if (!active) {
                    return;
                }

                const plans = Array.isArray(response.data)
                    ? response.data
                    : [];

                setPlan(plans[0] ?? null);
            } catch (requestError) {
                console.error(
                    "Failed to load trading plan:",
                    requestError
                );

                if (active) {
                    setError(
                        "Δεν ήταν δυνατή η φόρτωση του Trading Plan."
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadTradingPlan();

        return () => {
            active = false;
        };
    }, []);

    const allowedMarkets = useMemo(
        () => (
            plan
                ? getAllowedMarkets(plan)
                : []
        ),
        [plan]
    );

    const allowedSessions = useMemo(
        () => (
            plan
                ? getAllowedSessions(plan)
                : []
        ),
        [plan]
    );

    return (
        <Paper
            sx={{
                p: {
                    xs: 2,
                    md: 3
                }
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        sm: "row"
                    },
                    justifyContent: "space-between",
                    alignItems: {
                        xs: "flex-start",
                        sm: "center"
                    },
                    gap: 2,
                    mb: 2.5
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1.25,
                        alignItems: "center"
                    }}
                >
                    <TrackChangesIcon color="primary" />

                    <Box>
                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >
                            Today&apos;s Mission
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Οι πραγματικοί κανόνες του προσωπικού σου Trading Plan.
                        </Typography>
                    </Box>
                </Box>

                <Button
                    variant="outlined"
                    size="small"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate("/trading-plan")}
                >
                    Open Trading Plan
                </Button>
            </Box>

            {loading && (
                <Box
                    sx={{
                        minHeight: 160,
                        display: "grid",
                        placeItems: "center"
                    }}
                >
                    <CircularProgress size={32} />
                </Box>
            )}

            {!loading && error && (
                <Alert severity="error">
                    {error}
                </Alert>
            )}

            {!loading && !error && !plan && (
                <Alert
                    severity="info"
                    action={
                        <Button
                            color="inherit"
                            size="small"
                            onClick={() =>
                                navigate("/trading-plan")
                            }
                        >
                            Create
                        </Button>
                    }
                >
                    Δεν υπάρχει αποθηκευμένο Trading Plan.
                </Alert>
            )}

            {!loading && !error && plan && (
                <>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(2, minmax(0, 1fr))",
                                lg: "repeat(4, minmax(0, 1fr))"
                            },
                            gap: 2
                        }}
                    >
                        <MissionMetric
                            icon={
                                <ShieldOutlinedIcon fontSize="small" />
                            }
                            label="Risk per Trade"
                            value={`${plan.risk_per_trade ?? 0}%`}
                            helper={`Daily loss limit: ${plan.maximum_daily_loss ?? 0}%`}
                        />

                        <MissionMetric
                            icon={
                                <TrendingUpIcon fontSize="small" />
                            }
                            label="Minimum Risk / Reward"
                            value={`1 : ${plan.minimum_rr ?? 0}`}
                            helper="Μην αποδέχεσαι setup κάτω από αυτό το όριο."
                        />

                        <MissionMetric
                            icon={
                                <FormatListNumberedIcon fontSize="small" />
                            }
                            label="Maximum Trades Today"
                            value={plan.maximum_trades_day ?? 0}
                            helper={`Weekly limit: ${plan.maximum_trades_week ?? 0}`}
                        />

                        <MissionMetric
                            icon={
                                <PublicIcon fontSize="small" />
                            }
                            label="Allowed Sessions"
                            value={
                                allowedSessions.length > 0
                                    ? allowedSessions.length
                                    : "None"
                            }
                            helper={
                                allowedSessions.length > 0
                                    ? allowedSessions.join(" · ")
                                    : "Δεν έχει επιλεγεί session."
                            }
                        />
                    </Box>

                    <Box
                        sx={{
                            mt: 2,
                            p: 2,
                            borderRadius: 2,
                            border: 1,
                            borderColor: "divider",
                            bgcolor: "action.hover"
                        }}
                    >
                        <Typography
                            variant="body2"
                            fontWeight={700}
                            mb={0.5}
                        >
                            Επιτρεπόμενες αγορές σήμερα
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {allowedMarkets.length > 0
                                ? allowedMarkets.join(" · ")
                                : "Δεν έχει επιλεγεί καμία αγορά στο Trading Plan."}
                        </Typography>
                    </Box>
                </>
            )}
        </Paper>
    );
}