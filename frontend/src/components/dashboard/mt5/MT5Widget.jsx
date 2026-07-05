import { Box, Divider } from "@mui/material";

import StatusBadge from "../../common/StatusBadge";
import TradePilotButton from "../../common/TradePilotButton";
import InfoRow from "../../common/InfoRow";

import {
    WidgetContainer,
    WidgetHeader,
    WidgetFooter,
    WidgetMetric
} from "../../widgets";

export default function MT5Widget() {
    return (
        <WidgetContainer>
            <WidgetHeader
                title="MT5 Trading Widget"
                subtitle="Professional account status and sync overview."
                action={<StatusBadge label="Foundation" color="info" />}
            />

            <Divider sx={{ mb: 2 }} />

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        md: "repeat(4, 1fr)"
                    },
                    gap: 2,
                    mb: 3
                }}
            >
                <WidgetMetric title="Balance" value="—" />
                <WidgetMetric title="Equity" value="—" />
                <WidgetMetric title="Floating P/L" value="—" />
                <WidgetMetric title="Open Positions" value="—" />
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr"
                    },
                    gap: 2,
                    mb: 3
                }}
            >
                <InfoRow label="Connection" value="Pending integration" />
                <InfoRow label="Account" value="No account selected" />
            </Box>

            <WidgetFooter>
                <TradePilotButton variant="secondary">
                    View MT5
                </TradePilotButton>

                <TradePilotButton>
                    Sync Now
                </TradePilotButton>
            </WidgetFooter>
        </WidgetContainer>
    );
}