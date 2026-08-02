import {
    Paper,
    Stack,
    Typography
} from "@mui/material";

import NumericField from "../../../components/NumericField";


export default function TradingFrequencyCard({
    plan,
    onChange
}) {
    return (
        <Paper sx={{ p: 3 }}>
            <Typography
                variant="h6"
                mb={2}
            >
                Trading Frequency
            </Typography>

            <Stack spacing={2}>
                <NumericField
                    label="Maximum Trades per Day"
                    value={
                        plan.maximum_trades_day
                    }
                    onChange={(value) =>
                        onChange(
                            "maximum_trades_day",
                            value
                        )
                    }
                />

                <NumericField
                    label="Maximum Trades per Week"
                    value={
                        plan.maximum_trades_week
                    }
                    onChange={(value) =>
                        onChange(
                            "maximum_trades_week",
                            value
                        )
                    }
                />
            </Stack>
        </Paper>
    );
}
