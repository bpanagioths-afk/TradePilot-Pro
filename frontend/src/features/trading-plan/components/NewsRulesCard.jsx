import {
    Checkbox,
    FormControlLabel,
    Paper,
    Stack,
    Typography
} from "@mui/material";


export default function NewsRulesCard({
    plan,
    onCheckboxChange
}) {
    return (
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
                            checked={Boolean(
                                plan.avoid_news_before
                            )}
                            onChange={(event) =>
                                onCheckboxChange(
                                    "avoid_news_before",
                                    event.target.checked
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
                            checked={Boolean(
                                plan.avoid_news_after
                            )}
                            onChange={(event) =>
                                onCheckboxChange(
                                    "avoid_news_after",
                                    event.target.checked
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
    );
}
