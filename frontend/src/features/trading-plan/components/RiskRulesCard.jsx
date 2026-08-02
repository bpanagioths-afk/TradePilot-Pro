import {
    Paper,
    Stack,
    Typography
} from "@mui/material";

import NumericField from "../../../components/NumericField";


export default function RiskRulesCard({
    plan,
    onChange
}) {
    return (
        <Paper sx={{ p: 3 }}>
            <Typography
                variant="h6"
                mb={2}
            >
                Risk Rules
            </Typography>

            <Stack spacing={2}>
                <NumericField
                    label="Risk per Trade (%)"
                    value={plan.risk_per_trade}
                    onChange={(value) =>
                        onChange(
                            "risk_per_trade",
                            value
                        )
                    }
                />

                <NumericField
                    label="Maximum Daily Loss (%)"
                    value={
                        plan.maximum_daily_loss
                    }
                    onChange={(value) =>
                        onChange(
                            "maximum_daily_loss",
                            value
                        )
                    }
                />

                <NumericField
                    label="Maximum Weekly Loss (%)"
                    value={
                        plan.maximum_weekly_loss
                    }
                    onChange={(value) =>
                        onChange(
                            "maximum_weekly_loss",
                            value
                        )
                    }
                />

                <NumericField
                    label="Minimum Risk Reward"
                    value={plan.minimum_rr}
                    onChange={(value) =>
                        onChange(
                            "minimum_rr",
                            value
                        )
                    }
                />
            </Stack>
        </Paper>
    );
}
