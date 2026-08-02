import {
    Alert,
    Box,
    Button,
    Divider,
    IconButton,
    Paper,
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


export default function ConstitutionCard({
    rules,
    newRule,
    onNewRuleChange,
    onUpdateRule,
    onAddRule,
    onDeleteRule,
    onMoveRule,
    onRebuildDefaultRules
}) {
    return (
        <Paper sx={{ p: 3 }}>
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
                        onRebuildDefaultRules
                    }
                >
                    Ενημέρωση από το πλάνο
                </Button>
            </Stack>

            <Divider sx={{ my: 2.5 }} />

            <Stack spacing={1.5}>
                {rules.map(
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
                                    alignItems:
                                        "center"
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
                                    onChange={(
                                        event
                                    ) =>
                                        onUpdateRule(
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
                                    <Tooltip
                                        title={
                                            "Μετακίνηση πάνω"
                                        }
                                    >
                                        <span>
                                            <IconButton
                                                size="small"
                                                disabled={
                                                    index
                                                    === 0
                                                }
                                                onClick={() =>
                                                    onMoveRule(
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

                                    <Tooltip
                                        title={
                                            "Μετακίνηση κάτω"
                                        }
                                    >
                                        <span>
                                            <IconButton
                                                size="small"
                                                disabled={
                                                    index
                                                    === rules.length
                                                    - 1
                                                }
                                                onClick={() =>
                                                    onMoveRule(
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

                                    <Tooltip
                                        title={
                                            "Διαγραφή κανόνα"
                                        }
                                    >
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() =>
                                                onDeleteRule(
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

                {rules.length === 0 && (
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
                    onChange={(event) =>
                        onNewRuleChange(
                            event.target.value
                        )
                    }
                    onKeyDown={(event) => {
                        if (
                            event.key === "Enter"
                        ) {
                            event.preventDefault();
                            onAddRule();
                        }
                    }}
                    fullWidth
                />

                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={onAddRule}
                    disabled={!newRule.trim()}
                    sx={{
                        minWidth: 150
                    }}
                >
                    Add Rule
                </Button>
            </Stack>
        </Paper>
    );
}
