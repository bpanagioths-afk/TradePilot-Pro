import {
    Alert,
    Box,
    Chip,
    Divider,
    LinearProgress,
    Paper,
    Stack,
    Typography
} from "@mui/material";

import CheckCircleRoundedIcon from
    "@mui/icons-material/CheckCircleRounded";

import ErrorRoundedIcon from
    "@mui/icons-material/ErrorRounded";

import WarningAmberRoundedIcon from
    "@mui/icons-material/WarningAmberRounded";

import AssessmentRoundedIcon from
    "@mui/icons-material/AssessmentRounded";


function ScoreSection({
    title,
    items,
    severity,
    icon
}) {
    if (!items?.length) {
        return null;
    }

    return (
        <Stack spacing={1.25}>
            <Stack
                direction="row"
                spacing={1}
                sx={{
                    alignItems: "center"
                }}
            >
                {icon}

                <Typography
                    variant="subtitle2"
                    fontWeight={800}
                >
                    {title}
                </Typography>

                <Chip
                    label={items.length}
                    size="small"
                    color={severity}
                    variant="outlined"
                />
            </Stack>

            <Stack spacing={1}>
                {items.map((item) => (
                    <Alert
                        key={item}
                        severity={severity}
                        variant="outlined"
                        icon={false}
                        sx={{
                            borderRadius: 2,
                            py: 0.5,
                            "& .MuiAlert-message": {
                                width: "100%"
                            }
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                lineHeight: 1.6,
                                overflowWrap: "anywhere"
                            }}
                        >
                            {item}
                        </Typography>
                    </Alert>
                ))}
            </Stack>
        </Stack>
    );
}


export default function TradeScoreCard({
    scoreData
}) {
    if (!scoreData) {
        return (
            <Paper
                variant="outlined"
                sx={{
                    p: 3,
                    mt: 3,
                    borderRadius: 3
                }}
            >
                <Typography
                    color="text.secondary"
                >
                    Loading Trade Score...
                </Typography>
            </Paper>
        );
    }

    const score =
        Number(scoreData.score ?? 0);

    let color = "error";
    let scoreLabel = "Needs Review";

    if (score >= 80) {
        color = "success";
        scoreLabel = "Strong Compliance";
    } else if (score >= 60) {
        color = "warning";
        scoreLabel = "Partial Compliance";
    }

    const violations =
        scoreData.violations || [];

    const warnings =
        scoreData.warnings || [];

    const successes =
        scoreData.successes || [];

    return (
        <Paper
            variant="outlined"
            sx={{
                p: {
                    xs: 2.5,
                    md: 3
                },
                mt: 3,
                borderRadius: 3,
                overflow: "hidden"
            }}
        >
            <Stack spacing={3}>
                <Stack
                    direction={{
                        xs: "column",
                        sm: "row"
                    }}
                    spacing={2}
                    sx={{
                        justifyContent:
                            "space-between",
                        alignItems: {
                            xs: "flex-start",
                            sm: "center"
                        }
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={1.25}
                        sx={{
                            alignItems: "center"
                        }}
                    >
                        <Box
                            sx={{
                                width: 44,
                                height: 44,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 2,
                                color: `${color}.main`,
                                backgroundColor:
                                    `${color}.main`,
                                opacity: 0.9
                            }}
                        >
                            <AssessmentRoundedIcon
                                sx={{
                                    color: "common.white"
                                }}
                            />
                        </Box>

                        <Box>
                            <Typography
                                variant="h6"
                                fontWeight={800}
                            >
                                Trade Score
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Έλεγχος συμμόρφωσης με
                                το ενεργό Trading Plan.
                            </Typography>
                        </Box>
                    </Stack>

                    <Chip
                        label={
                            scoreData.passed
                                ? "PASSED"
                                : "FAILED"
                        }
                        color={
                            scoreData.passed
                                ? "success"
                                : "error"
                        }
                        sx={{
                            fontWeight: 800
                        }}
                    />
                </Stack>

                <Box
                    sx={{
                        p: 2.5,
                        borderRadius: 3,
                        backgroundColor:
                            "action.hover"
                    }}
                >
                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row"
                        }}
                        spacing={2}
                        sx={{
                            justifyContent:
                                "space-between",
                            alignItems: {
                                xs: "flex-start",
                                sm: "flex-end"
                            }
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h3"
                                fontWeight={900}
                                color={`${color}.main`}
                            >
                                {score}
                                <Typography
                                    component="span"
                                    variant="h6"
                                    color="text.secondary"
                                    sx={{ ml: 0.75 }}
                                >
                                    / 100
                                </Typography>
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {scoreLabel}
                            </Typography>
                        </Box>

                        <Stack
                            direction="row"
                            spacing={1}
                        >
                            <Chip
                                label={`${violations.length} violations`}
                                color={
                                    violations.length
                                        ? "error"
                                        : "default"
                                }
                                variant="outlined"
                                size="small"
                            />

                            <Chip
                                label={`${warnings.length} warnings`}
                                color={
                                    warnings.length
                                        ? "warning"
                                        : "default"
                                }
                                variant="outlined"
                                size="small"
                            />
                        </Stack>
                    </Stack>

                    <LinearProgress
                        variant="determinate"
                        value={score}
                        color={color}
                        sx={{
                            mt: 2,
                            height: 10,
                            borderRadius: 999
                        }}
                    />
                </Box>

                <Divider />

                {violations.length === 0
                    && warnings.length === 0
                    && (
                        <Alert
                            severity="success"
                            sx={{
                                borderRadius: 2
                            }}
                        >
                            Δεν εντοπίστηκαν violations
                            ή warnings.
                        </Alert>
                    )}

                <ScoreSection
                    title="Violations"
                    items={violations}
                    severity="error"
                    icon={
                        <ErrorRoundedIcon
                            color="error"
                        />
                    }
                />

                <ScoreSection
                    title="Warnings"
                    items={warnings}
                    severity="warning"
                    icon={
                        <WarningAmberRoundedIcon
                            color="warning"
                        />
                    }
                />

                <ScoreSection
                    title="Successes"
                    items={successes}
                    severity="success"
                    icon={
                        <CheckCircleRoundedIcon
                            color="success"
                        />
                    }
                />
            </Stack>
        </Paper>
    );
}