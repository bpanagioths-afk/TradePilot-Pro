import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    Alert,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Divider,
    FormControlLabel,
    IconButton,
    Paper,
    Snackbar,
    Stack,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteIcon from "@mui/icons-material/Delete";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import SaveIcon from "@mui/icons-material/Save";

import NumericField from "../components/NumericField";

import {
    createTradingPlan,
    getTradingPlans,
    updateTradingPlan
} from "../services/tradingPlanService";


const initialPlan = {
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
};


function buildDefaultRules(plan) {
    return [
        `Never risk more than ${plan.risk_per_trade}% per trade.`,
        `Only take trades with Risk Reward ≥ ${plan.minimum_rr}.`,
        plan.avoid_news_before
            ? "Do not trade 30 minutes before HIGH impact news."
            : "Follow the configured news-risk rules.",
        `Maximum ${plan.maximum_trades_day} trades per day.`,
        `Stop trading after reaching the ${plan.maximum_daily_loss}% daily loss limit.`
    ];
}


function parseConstitution(value, plan) {
    const storedRules = String(value || "")
        .split("\n")
        .map((rule) => rule.trim())
        .filter(Boolean);

    if (storedRules.length > 0) {
        return storedRules;
    }

    return buildDefaultRules(plan);
}


function resolveErrorMessage(error) {
    const detail =
        error?.response?.data?.detail;

    if (typeof detail === "string") {
        return detail;
    }

    if (Array.isArray(detail)) {
        return detail
            .map((item) => item?.msg)
            .filter(Boolean)
            .join(" ");
    }

    return (
        "Δεν ήταν δυνατή η αποθήκευση "
        + "του Trading Plan."
    );
}


export default function TradingPlan() {
    const [planId, setPlanId] =
        useState(null);

    const [plan, setPlan] =
        useState(initialPlan);

    const [
        constitutionRules,
        setConstitutionRules
    ] = useState(
        buildDefaultRules(initialPlan)
    );

    const [newRule, setNewRule] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [saved, setSaved] =
        useState(false);

    const [error, setError] =
        useState("");


    useEffect(() => {
        getTradingPlans()
            .then((response) => {
                const existingPlan =
                    response.data?.[0];

                if (!existingPlan) {
                    setPlan(initialPlan);
                    setConstitutionRules(
                        buildDefaultRules(
                            initialPlan
                        )
                    );
                    return;
                }

                const normalizedPlan = {
                    ...initialPlan,
                    ...existingPlan
                };

                setPlanId(existingPlan.id);
                setPlan(normalizedPlan);

                setConstitutionRules(
                    parseConstitution(
                        existingPlan.constitution,
                        normalizedPlan
                    )
                );
            })
            .catch((requestError) => {
                console.error(requestError);

                setError(
                    "Δεν ήταν δυνατή η φόρτωση "
                    + "του Trading Plan."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    const constitutionText =
        useMemo(
            () =>
                constitutionRules
                    .map((rule) =>
                        rule.trim()
                    )
                    .filter(Boolean)
                    .join("\n"),
            [constitutionRules]
        );


    const handleChange = (
        field,
        value
    ) => {
        setPlan((currentPlan) => ({
            ...currentPlan,
            [field]: value
        }));
    };


    const handleCheckbox = (
        field,
        checked
    ) => {
        setPlan((currentPlan) => ({
            ...currentPlan,
            [field]: checked
        }));
    };


    const updateRule = (
        index,
        value
    ) => {
        setConstitutionRules(
            (currentRules) =>
                currentRules.map(
                    (rule, ruleIndex) =>
                        ruleIndex === index
                            ? value
                            : rule
                )
        );
    };


    const addRule = () => {
        const cleanedRule =
            newRule.trim();

        if (!cleanedRule) {
            return;
        }

        setConstitutionRules(
            (currentRules) => [
                ...currentRules,
                cleanedRule
            ]
        );

        setNewRule("");
    };


    const deleteRule = (index) => {
        setConstitutionRules(
            (currentRules) =>
                currentRules.filter(
                    (_, ruleIndex) =>
                        ruleIndex !== index
                )
        );
    };


    const moveRule = (
        index,
        direction
    ) => {
        setConstitutionRules(
            (currentRules) => {
                const targetIndex =
                    index + direction;

                if (
                    targetIndex < 0
                    || targetIndex
                        >= currentRules.length
                ) {
                    return currentRules;
                }

                const reorderedRules = [
                    ...currentRules
                ];

                [
                    reorderedRules[index],
                    reorderedRules[targetIndex]
                ] = [
                    reorderedRules[targetIndex],
                    reorderedRules[index]
                ];

                return reorderedRules;
            }
        );
    };


    const rebuildDefaultRules = () => {
        setConstitutionRules(
            buildDefaultRules(plan)
        );
    };


    const saveTradingPlan =
        async () => {
            setSaving(true);
            setError("");

            const payload = {
                ...plan,
                constitution:
                    constitutionText
            };

            try {
                const response = planId
                    ? await updateTradingPlan(
                        planId,
                        payload
                    )
                    : await createTradingPlan(
                        payload
                    );

                const savedPlan =
                    response.data || payload;

                if (savedPlan.id) {
                    setPlanId(
                        savedPlan.id
                    );
                }

                setPlan((currentPlan) => ({
                    ...currentPlan,
                    ...savedPlan,
                    constitution:
                        constitutionText
                }));

                setSaved(true);
            } catch (requestError) {
                console.error(requestError);

                setError(
                    resolveErrorMessage(
                        requestError
                    )
                );
            } finally {
                setSaving(false);
            }
        };


    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <CircularProgress />
            </Box>
        );
    }


    return (
        <Box>
            <Typography
                variant="h4"
                mb={1}
            >
                Trading Plan
            </Typography>

            <Typography
                color="text.secondary"
                mb={3}
            >
                Το προσωπικό σου πλάνο
                πειθαρχίας και διαχείρισης
                ρίσκου.
            </Typography>

            {error && (
                <Alert
                    severity="error"
                    sx={{ mb: 3 }}
                    onClose={() =>
                        setError("")
                    }
                >
                    {error}
                </Alert>
            )}

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "1fr 1fr"
                    },
                    gap: 3
                }}
            >
                <Stack spacing={3}>
                    <Paper sx={{ p: 3 }}>
                        <Typography
                            variant="h6"
                            mb={2}
                        >
                            Markets
                        </Typography>

                        <Stack>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            Boolean(
                                                plan.allow_forex
                                            )
                                        }
                                        onChange={
                                            (event) =>
                                                handleCheckbox(
                                                    "allow_forex",
                                                    event
                                                        .target
                                                        .checked
                                                )
                                        }
                                    />
                                }
                                label="Forex"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            Boolean(
                                                plan.allow_metals
                                            )
                                        }
                                        onChange={
                                            (event) =>
                                                handleCheckbox(
                                                    "allow_metals",
                                                    event
                                                        .target
                                                        .checked
                                                )
                                        }
                                    />
                                }
                                label="Gold / Metals"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            Boolean(
                                                plan.allow_crypto
                                            )
                                        }
                                        onChange={
                                            (event) =>
                                                handleCheckbox(
                                                    "allow_crypto",
                                                    event
                                                        .target
                                                        .checked
                                                )
                                        }
                                    />
                                }
                                label="Crypto"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            Boolean(
                                                plan.allow_indices
                                            )
                                        }
                                        onChange={
                                            (event) =>
                                                handleCheckbox(
                                                    "allow_indices",
                                                    event
                                                        .target
                                                        .checked
                                                )
                                        }
                                    />
                                }
                                label="Indices"
                            />
                        </Stack>
                    </Paper>

                    <Paper sx={{ p: 3 }}>
                        <Typography
                            variant="h6"
                            mb={2}
                        >
                            Risk Rules
                        </Typography>

                        <Stack spacing={2}>
                            <NumericField
                                label={
                                    "Risk per Trade (%)"
                                }
                                value={
                                    plan.risk_per_trade
                                }
                                onChange={
                                    (value) =>
                                        handleChange(
                                            "risk_per_trade",
                                            value
                                        )
                                }
                            />

                            <NumericField
                                label={
                                    "Maximum Daily Loss (%)"
                                }
                                value={
                                    plan.maximum_daily_loss
                                }
                                onChange={
                                    (value) =>
                                        handleChange(
                                            "maximum_daily_loss",
                                            value
                                        )
                                }
                            />

                            <NumericField
                                label={
                                    "Maximum Weekly Loss (%)"
                                }
                                value={
                                    plan.maximum_weekly_loss
                                }
                                onChange={
                                    (value) =>
                                        handleChange(
                                            "maximum_weekly_loss",
                                            value
                                        )
                                }
                            />

                            <NumericField
                                label={
                                    "Minimum Risk Reward"
                                }
                                value={
                                    plan.minimum_rr
                                }
                                onChange={
                                    (value) =>
                                        handleChange(
                                            "minimum_rr",
                                            value
                                        )
                                }
                            />
                        </Stack>
                    </Paper>

                    <Paper sx={{ p: 3 }}>
                        <Typography
                            variant="h6"
                            mb={2}
                        >
                            Trading Frequency
                        </Typography>

                        <Stack spacing={2}>
                            <NumericField
                                label={
                                    "Maximum Trades per Day"
                                }
                                value={
                                    plan.maximum_trades_day
                                }
                                onChange={
                                    (value) =>
                                        handleChange(
                                            "maximum_trades_day",
                                            value
                                        )
                                }
                            />

                            <NumericField
                                label={
                                    "Maximum Trades per Week"
                                }
                                value={
                                    plan.maximum_trades_week
                                }
                                onChange={
                                    (value) =>
                                        handleChange(
                                            "maximum_trades_week",
                                            value
                                        )
                                }
                            />
                        </Stack>
                    </Paper>
                </Stack>

                <Stack spacing={3}>
                    <Paper sx={{ p: 3 }}>
                        <Typography
                            variant="h6"
                            mb={2}
                        >
                            Sessions
                        </Typography>

                        <Stack>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            Boolean(
                                                plan.session_asia
                                            )
                                        }
                                        onChange={
                                            (event) =>
                                                handleCheckbox(
                                                    "session_asia",
                                                    event
                                                        .target
                                                        .checked
                                                )
                                        }
                                    />
                                }
                                label="Asia"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            Boolean(
                                                plan.session_london
                                            )
                                        }
                                        onChange={
                                            (event) =>
                                                handleCheckbox(
                                                    "session_london",
                                                    event
                                                        .target
                                                        .checked
                                                )
                                        }
                                    />
                                }
                                label="London"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            Boolean(
                                                plan.session_newyork
                                            )
                                        }
                                        onChange={
                                            (event) =>
                                                handleCheckbox(
                                                    "session_newyork",
                                                    event
                                                        .target
                                                        .checked
                                                )
                                        }
                                    />
                                }
                                label="New York"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            Boolean(
                                                plan.session_overlap
                                            )
                                        }
                                        onChange={
                                            (event) =>
                                                handleCheckbox(
                                                    "session_overlap",
                                                    event
                                                        .target
                                                        .checked
                                                )
                                        }
                                    />
                                }
                                label={
                                    "London / New York Overlap"
                                }
                            />
                        </Stack>
                    </Paper>

                    <Paper sx={{ p: 3 }}>
                        <Typography
                            variant="h6"
                            mb={2}
                        >
                            News Rules
                        </Typography>

                        <Stack>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            Boolean(
                                                plan.avoid_news_before
                                            )
                                        }
                                        onChange={
                                            (event) =>
                                                handleCheckbox(
                                                    "avoid_news_before",
                                                    event
                                                        .target
                                                        .checked
                                                )
                                        }
                                    />
                                }
                                label={
                                    "Avoid trading 30 minutes before HIGH impact news"
                                }
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            Boolean(
                                                plan.avoid_news_after
                                            )
                                        }
                                        onChange={
                                            (event) =>
                                                handleCheckbox(
                                                    "avoid_news_after",
                                                    event
                                                        .target
                                                        .checked
                                                )
                                        }
                                    />
                                }
                                label={
                                    "Avoid trading 15 minutes after HIGH impact news"
                                }
                            />
                        </Stack>
                    </Paper>

                    <Paper sx={{ p: 3 }}>
                        <Stack
                            direction={{
                                xs: "column",
                                sm: "row"
                            }}
                            spacing={2}
                            sx={{
                                justifyContent:"space-between",
                                alignItems: {
                                   xs: "flex-start",
                                   sm: "center"
                                }
                            }}
                        >
                            <Box>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{   
                                       alignItems: "center"
                                    }}
                                >
                                    <GavelRoundedIcon
                                        color="primary"
                                    />

                                    <Typography
                                        variant="h6"
                                    >
                                        Trading Constitution
                                    </Typography>
                                </Stack>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 0.75 }}
                                >
                                    Πρόσθεσε, άλλαξε,
                                    διέγραψε ή μετακίνησε
                                    τους προσωπικούς σου
                                    κανόνες.
                                </Typography>
                            </Box>

                            <Button
                                variant="outlined"
                                size="small"
                                onClick={
                                    rebuildDefaultRules
                                }
                            >
                                Ενημέρωση από το πλάνο
                            </Button>
                        </Stack>

                        <Divider sx={{ my: 2.5 }} />

                        <Stack spacing={1.5}>
                            {constitutionRules.map(
                                (rule, index) => (
                                    <Paper
                                        key={`rule-${index}`}
                                        variant="outlined"
                                        sx={{
                                            p: 1.5,
                                            borderRadius: 2
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            sx={{
                                              alignItems:"center"
                                            }}
                                        >
                                            <Typography
                                                color="primary.main"
                                                fontWeight={800}
                                                sx={{
                                                    minWidth: 28
                                                }}
                                            >
                                                {index + 1}.
                                            </Typography>

                                            <TextField
                                                value={rule}
                                                onChange={
                                                    (event) =>
                                                        updateRule(
                                                            index,
                                                            event
                                                                .target
                                                                .value
                                                        )
                                                }
                                                size="small"
                                                fullWidth
                                            />

                                            <Stack
                                                direction="row"
                                                spacing={0.25}
                                            >
                                                <Tooltip title="Μετακίνηση πάνω">
                                                    <span>
                                                        <IconButton
                                                            size="small"
                                                            disabled={
                                                                index
                                                                === 0
                                                            }
                                                            onClick={() =>
                                                                moveRule(
                                                                    index,
                                                                    -1
                                                                )
                                                            }
                                                        >
                                                            <ArrowUpwardIcon
                                                                fontSize="small"
                                                            />
                                                        </IconButton>
                                                    </span>
                                                </Tooltip>

                                                <Tooltip title="Μετακίνηση κάτω">
                                                    <span>
                                                        <IconButton
                                                            size="small"
                                                            disabled={
                                                                index
                                                                === constitutionRules.length
                                                                - 1
                                                            }
                                                            onClick={() =>
                                                                moveRule(
                                                                    index,
                                                                    1
                                                                )
                                                            }
                                                        >
                                                            <ArrowDownwardIcon
                                                                fontSize="small"
                                                            />
                                                        </IconButton>
                                                    </span>
                                                </Tooltip>

                                                <Tooltip title="Διαγραφή κανόνα">
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() =>
                                                            deleteRule(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon
                                                            fontSize="small"
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </Stack>
                                    </Paper>
                                )
                            )}

                            {constitutionRules.length
                                === 0 && (
                                <Alert severity="info">
                                    Δεν υπάρχουν κανόνες
                                    στο Trading Constitution.
                                </Alert>
                            )}
                        </Stack>

                        <Stack
                            direction={{
                                xs: "column",
                                sm: "row"
                            }}
                            spacing={1.5}
                            sx={{ mt: 2.5 }}
                        >
                            <TextField
                                label="Νέος κανόνας"
                                placeholder={
                                    "π.χ. Stop after two consecutive losses"
                                }
                                value={newRule}
                                onChange={
                                    (event) =>
                                        setNewRule(
                                            event.target.value
                                        )
                                }
                                onKeyDown={
                                    (event) => {
                                        if (
                                            event.key
                                            === "Enter"
                                        ) {
                                            event
                                                .preventDefault();

                                            addRule();
                                        }
                                    }
                                }
                                fullWidth
                            />

                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={addRule}
                                disabled={
                                    !newRule.trim()
                                }
                                sx={{
                                    minWidth: 150
                                }}
                            >
                                Add Rule
                            </Button>
                        </Stack>

                        <Divider sx={{ my: 3 }} />

                        <Button
                            variant="contained"
                            onClick={
                                saveTradingPlan
                            }
                            startIcon={
                                saving
                                    ? (
                                        <CircularProgress
                                            size={18}
                                            color="inherit"
                                        />
                                    )
                                    : <SaveIcon />
                            }
                            disabled={saving}
                            size="large"
                        >
                            {saving
                                ? "Saving..."
                                : "Save Trading Plan"}
                        </Button>
                    </Paper>
                </Stack>
            </Box>

            <Snackbar
                open={saved}
                autoHideDuration={3000}
                onClose={() =>
                    setSaved(false)
                }
            >
                <Alert
                    severity="success"
                    onClose={() =>
                        setSaved(false)
                    }
                >
                    Trading Plan Saved
                </Alert>
            </Snackbar>
        </Box>
    );
}