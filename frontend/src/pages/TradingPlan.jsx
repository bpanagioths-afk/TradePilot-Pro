import {
    Box,
    Typography,
    Paper,
    TextField,
    Stack,
    Button,
    FormControlLabel,
    Checkbox,
    Divider,
    Snackbar,
    Alert
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";

import { useEffect, useState } from "react";

import NumericField from "../components/NumericField";

import {
    getTradingPlans,
    updateTradingPlan
} from "../services/tradingPlanService";

export default function TradingPlan() {

    const [planId, setPlanId] = useState(null);

    const [plan, setPlan] = useState({
         name: "",
         description: "",
         risk_per_trade: 0.5,
         maximum_daily_loss: 2,
         maximum_weekly_loss: 4,
         minimum_rr: 2,
         maximum_trades_day: 2,
         maximum_trades_week: 5,
         allow_forex: true,
         allow_metals: true,
         allow_crypto: false,
         allow_indices: false,
         session_asia: false,
         session_london: true,
         session_newyork: true,
         session_overlap: true,
         avoid_news_before: true,
         avoid_news_after: true,
         constitution: ""
    });
    const [saved, setSaved] = useState(false);

useEffect(() => {

    getTradingPlans()
        .then((res) => {

            if (res.data.length === 0) {
                return;
            }

            setPlanId(res.data[0].id);
            setPlan(res.data[0]);

        })
        .catch(console.error);

}, []);

const handleChange = (field, value) => {
    setPlan({
        ...plan,
        [field]: value
    });
};

const saveTradingPlan = () => {

    if (!planId) {
        return;
    }

    updateTradingPlan(planId, plan)
        .then(() => {
            setSaved(true);
        })
        .catch(console.error);

};

const handleCheckbox = (field, value) => {
    setPlan({
        ...plan,
        [field]: value
    });
};

    return (
        <Box>
            <Typography variant="h4" mb={1}>
                Trading Plan
            </Typography>

            <Typography color="text.secondary" mb={3}>
                Το προσωπικό σου πλάνο πειθαρχίας και διαχείρισης ρίσκου.
            </Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" mb={2}>
                    Markets
                </Typography>

                <Stack>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={plan.allow_forex}
                                onChange={(e) =>
                                    handleCheckbox("allow_forex", e.target.checked)
                                }
                            />
                        }
                        label="Forex"
                    />
                    <FormControlLabel 
                        control={
                            <Checkbox
                                checked={plan.allow_metals}
                                onChange={(e) =>
                                    handleCheckbox("allow_metals", e.target.checked)
                                }
                            />
                        } 
                        label="Gold / Metals" 
                    />
                    <FormControlLabel 
                        control={
                            <Checkbox
                                checked={plan.allow_crypto}
                                onChange={(e) =>
                                    handleCheckbox("allow_crypto", e.target.checked)
                                }
                            />
                        }
                        label="Crypto" 
                    />
                    <FormControlLabel 
                        control={
                            <Checkbox
                                checked={plan.allow_indices}
                                onChange={(e) =>
                                    handleCheckbox("allow_indices", e.target.checked)
                                }
                            />
                        }
                        label="Indices" 
                    />

                </Stack>
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" mb={2}>
                    Risk Rules
                </Typography>

                <Stack spacing={2}>
                    <NumericField
                        label="Risk per Trade (%)"
                        value={plan.risk_per_trade}
                        onChange={(value) =>
                            handleChange("risk_per_trade", value)
                        }
                    />
                    <NumericField
                        label="Maximum Daily Loss (%)"
                        value={plan.maximum_daily_loss}
                        onChange={(value) =>
                            handleChange("maximum_daily_loss", value)
                        }
                    />
                    <NumericField
                        label="Maximum Weekly Loss (%)"
                        value={plan.maximum_weekly_loss}
                        onChange={(value) =>
                            handleChange("maximum_weekly_loss", value)
                        }
                    />
                    <NumericField
                        label="Minimum Risk Reward"
                        value={plan.minimum_rr}
                        onChange={(value) =>
                            handleChange("minimum_rr", value)
                        }
                    />

                </Stack>
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" mb={2}>
                    Trading Frequency
                </Typography>

                <Stack spacing={2}>
                    <NumericField
                        label="Maximum Trades per Day"
                        value={plan.maximum_trades_day}
                        onChange={(value) =>
                            handleChange("maximum_trades_day", value)
                        }
                    />
                    <NumericField
                        label="Maximum Trades per Week"
                        value={plan.maximum_trades_week}
                        onChange={(value) =>
                            handleChange("maximum_trades_week", value)
                        }
                    />
                </Stack>
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" mb={2}>
                    Sessions
                </Typography>

                <Stack>
                    <FormControlLabel control={<Checkbox />} label="Asia" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="London" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="New York" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="London / New York Overlap" />
                </Stack>
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" mb={2}>
                    News Rules
                </Typography>

                <Stack>
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Avoid trading 30 minutes before HIGH impact news"
                    />

                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Avoid trading 15 minutes after HIGH impact news"
                    />
                </Stack>
            </Paper>

            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" mb={2}>
                    Trading Constitution
                </Typography>

                <Stack spacing={1}>
                    <Typography>Rule #1 — Never risk more than 0.5% per trade.</Typography>
                    <Typography>Rule #2 — Only take trades with RR ≥ 2.</Typography>
                    <Typography>Rule #3 — Do not trade before high impact news.</Typography>
                    <Typography>Rule #4 — Maximum 2 trades per day.</Typography>
                    <Typography>Rule #5 — Stop trading after daily loss limit.</Typography>
                </Stack>

                <Divider sx={{ my: 3 }} />

                <Button
                    variant="contained"
                    onClick={saveTradingPlan}
                    startIcon={<SaveIcon />}
                >
                    Save Trading Plan
                </Button>
            </Paper>
            <Snackbar
                   open={saved}
                   autoHideDuration={3000}
                   onClose={() => setSaved(false)}
            >
                   <Alert
                          severity="success"
                          onClose={() => setSaved(false)}
                   >
                          Trading Plan Saved
                  </Alert>
            </Snackbar>
        </Box>
    );
}