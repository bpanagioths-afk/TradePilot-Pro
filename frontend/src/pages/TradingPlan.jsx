import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Snackbar,
    Stack,
    Typography
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";

import TradingPlanSaveAsDialog from "../features/trading-plan/components/TradingPlanSaveAsDialog";
import TradingPlanToolbar from "../features/trading-plan/components/TradingPlanToolbar";
import MarketsCard from "../features/trading-plan/components/MarketsCard";
import RiskRulesCard from "../features/trading-plan/components/RiskRulesCard";
import TradingFrequencyCard from "../features/trading-plan/components/TradingFrequencyCard";
import SessionsCard from "../features/trading-plan/components/SessionsCard";
import NewsRulesCard from "../features/trading-plan/components/NewsRulesCard";
import ConstitutionCard from "../features/trading-plan/components/ConstitutionCard";

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
    const [plans, setPlans] =
        useState([]);

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

    const [
        saveAsDialogOpen,
        setSaveAsDialogOpen
    ] = useState(false);

    const [
        saveAsName,
        setSaveAsName
    ] = useState("");

    const [
        saveAsError,
        setSaveAsError
    ] = useState("");

    const loadPlanIntoEditor = (
        selectedPlan
    ) => {
        if (!selectedPlan) {
            setPlanId(null);
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
            ...selectedPlan
        };

        setPlanId(selectedPlan.id);
        setPlan(normalizedPlan);

        setConstitutionRules(
            parseConstitution(
                selectedPlan.constitution,
                normalizedPlan
            )
        );

        setError("");
        setSaved(false);
    };

        useEffect(() => {
        getTradingPlans()
            .then((response) => {
                const loadedPlans =
                    Array.isArray(
                        response.data
                    )
                        ? response.data
                        : [];

                setPlans(loadedPlans);

                const defaultPlan =
                    loadedPlans.find(
                        (item) =>
                            Boolean(
                                item.is_default
                            )
                    );

                loadPlanIntoEditor(
                    defaultPlan
                    || loadedPlans[0]
                    || null
                );
            })
            .catch((requestError) => {
                console.error(requestError);

                setError(
                    "Δεν ήταν δυνατή η φόρτωση "
                    + "των Trading Plans."
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


    const handlePlanSelection = (
        event
    ) => {
        const selectedPlanId =
            Number(event.target.value);

        const selectedPlan =
            plans.find(
                (item) =>
                    item.id
                    === selectedPlanId
            );

        loadPlanIntoEditor(
            selectedPlan || null
        );
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


    const startNewPlan = () => {
        const newPlan = {
            ...initialPlan,
            is_default:
                plans.length === 0
        };

        setPlanId(null);
        setPlan(newPlan);

        setConstitutionRules(
            buildDefaultRules(newPlan)
        );

        setNewRule("");
        setError("");
        setSaved(false);
    };


    const openSaveAsDialog = () => {
        setSaveAsName(
            plan.name || ""
        );

        setSaveAsError("");
        setSaveAsDialogOpen(true);
    };


    const closeSaveAsDialog = () => {
        if (saving) {
            return;
        }

        setSaveAsDialogOpen(false);
        setSaveAsError("");
    };


    const saveTradingPlanAs =
        async () => {
            const cleanedName =
                saveAsName.trim();

            if (!cleanedName) {
                setSaveAsError(
                    "Γράψε όνομα για το νέο Trading Plan."
                );
                return;
            }

            const nameAlreadyExists =
                plans.some(
                    (storedPlan) =>
                        String(
                            storedPlan.name || ""
                        )
                            .trim()
                            .toLowerCase()
                        === cleanedName
                            .toLowerCase()
                );

            if (nameAlreadyExists) {
                setSaveAsError(
                    "Υπάρχει ήδη Trading Plan με αυτό το όνομα."
                );
                return;
            }

            setSaving(true);
            setError("");
            setSaveAsError("");

            const payload = {
                ...plan,
                name: cleanedName,
                is_default:
                    plans.length === 0,
                constitution:
                    constitutionText
            };

            delete payload.id;
            delete payload.user_id;
            delete payload.created_at;
            delete payload.updated_at;

            try {
                const response =
                    await createTradingPlan(
                        payload
                    );

                const createdPlan =
                    response.data;

                setPlans(
                    (currentPlans) => [
                        createdPlan,
                        ...currentPlans.map(
                            (storedPlan) => ({
                                ...storedPlan,
                                is_default:
                                    createdPlan
                                        .is_default
                                        ? false
                                        : storedPlan
                                            .is_default
                            })
                        )
                    ]
                );

                loadPlanIntoEditor(
                    createdPlan
                );

                setSaveAsDialogOpen(false);
                setSaveAsName("");
                setSaved(true);
            } catch (requestError) {
                console.error(requestError);

                setSaveAsError(
                    resolveErrorMessage(
                        requestError
                    )
                );
            } finally {
                setSaving(false);
            }
        };


    const handlePrimarySave = () => {
        if (planId) {
            saveTradingPlan();
            return;
        }

        openSaveAsDialog();
    };


    const setCurrentPlanAsDefault =
        async () => {
            if (!planId || plan.is_default) {
                return;
            }

            setSaving(true);
            setError("");

            const payload = {
                ...plan,
                is_default: true,
                constitution:
                    constitutionText
            };

            delete payload.id;
            delete payload.user_id;
            delete payload.created_at;
            delete payload.updated_at;

            try {
                const response =
                    await updateTradingPlan(
                        planId,
                        payload
                    );

                const updatedPlan =
                    response.data || {
                        ...plan,
                        is_default: true
                    };

                setPlan((currentPlan) => ({
                    ...currentPlan,
                    ...updatedPlan,
                    is_default: true
                }));

                setPlans(
                    (currentPlans) =>
                        currentPlans.map(
                            (storedPlan) => ({
                                ...storedPlan,
                                ...(storedPlan.id
                                    === planId
                                    ? updatedPlan
                                    : {}),
                                is_default:
                                    storedPlan.id
                                    === planId
                            })
                        )
                );

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


    const saveTradingPlan =
        async () => {
            setSaving(true);
            setError("");

            const payload = {
                ...plan,
                constitution:
                    constitutionText
            };

            delete payload.id;
            delete payload.user_id;
            delete payload.created_at;
            delete payload.updated_at;

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

                setPlans(
                    (currentPlans) => {
                        const savedPlanId =
                            savedPlan.id;

                        if (!savedPlanId) {
                            return currentPlans;
                        }

                        const planExists =
                            currentPlans.some(
                                (item) =>
                                    item.id
                                    === savedPlanId
                            );

                        if (!planExists) {
                            return [
                                savedPlan,
                                ...currentPlans
                            ];
                        }

                        return currentPlans.map(
                            (item) =>
                                item.id
                                === savedPlanId
                                    ? {
                                          ...item,
                                          ...savedPlan
                                      }
                                    : item
                        );
                    }
                );

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
            <TradingPlanToolbar
                plans={plans}
                planId={planId}
                isDefault={plan.is_default}
                saving={saving}
                onPlanSelection={handlePlanSelection}
                onNewPlan={startNewPlan}
                onSave={handlePrimarySave}
                onSaveAs={openSaveAsDialog}
                onSetDefault={setCurrentPlanAsDefault}
            />


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
                    <MarketsCard
                        plan={plan}
                        onCheckboxChange={
                            handleCheckbox
                        }
                    />

                    <RiskRulesCard
                        plan={plan}
                        onChange={handleChange}
                    />

                    <TradingFrequencyCard
                        plan={plan}
                        onChange={handleChange}
                    />
                </Stack>

                <Stack spacing={3}>
                    <SessionsCard
                        plan={plan}
                        onCheckboxChange={
                            handleCheckbox
                        }
                    />

                    <NewsRulesCard
                        plan={plan}
                        onCheckboxChange={
                            handleCheckbox
                        }
                    />

                    <ConstitutionCard
                        rules={constitutionRules}
                        newRule={newRule}
                        onNewRuleChange={
                            setNewRule
                        }
                        onUpdateRule={updateRule}
                        onAddRule={addRule}
                        onDeleteRule={deleteRule}
                        onMoveRule={moveRule}
                        onRebuildDefaultRules={
                            rebuildDefaultRules
                        }
                    />
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
           <TradingPlanSaveAsDialog
    open={saveAsDialogOpen}
    name={saveAsName}
    error={saveAsError}
    saving={saving}
    onNameChange={(value) => {
        setSaveAsName(value);
        setSaveAsError("");
    }}
    onClose={closeSaveAsDialog}
    onSave={saveTradingPlanAs}
/>

        </Box>
    );
}