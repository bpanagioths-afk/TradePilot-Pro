import {
    Checkbox,
    FormControlLabel,
    Paper,
    Stack,
    Typography
} from "@mui/material";


export default function SessionsCard({
    plan,
    onCheckboxChange
}) {
    return (
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
                            checked={Boolean(
                                plan.session_asia
                            )}
                            onChange={(event) =>
                                onCheckboxChange(
                                    "session_asia",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Asia"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={Boolean(
                                plan.session_london
                            )}
                            onChange={(event) =>
                                onCheckboxChange(
                                    "session_london",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="London"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={Boolean(
                                plan.session_newyork
                            )}
                            onChange={(event) =>
                                onCheckboxChange(
                                    "session_newyork",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="New York"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={Boolean(
                                plan.session_overlap
                            )}
                            onChange={(event) =>
                                onCheckboxChange(
                                    "session_overlap",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="London / New York Overlap"
                />
            </Stack>
        </Paper>
    );
}
