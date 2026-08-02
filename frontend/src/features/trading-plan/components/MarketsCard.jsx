import {
    Checkbox,
    FormControlLabel,
    Paper,
    Stack,
    Typography
} from "@mui/material";


export default function MarketsCard({
    plan,
    onCheckboxChange
}) {
    return (
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
                            checked={Boolean(
                                plan.allow_forex
                            )}
                            onChange={(event) =>
                                onCheckboxChange(
                                    "allow_forex",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Forex"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={Boolean(
                                plan.allow_metals
                            )}
                            onChange={(event) =>
                                onCheckboxChange(
                                    "allow_metals",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Gold / Metals"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={Boolean(
                                plan.allow_crypto
                            )}
                            onChange={(event) =>
                                onCheckboxChange(
                                    "allow_crypto",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Crypto"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={Boolean(
                                plan.allow_indices
                            )}
                            onChange={(event) =>
                                onCheckboxChange(
                                    "allow_indices",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Indices"
                />
            </Stack>
        </Paper>
    );
}
