import { Box, CircularProgress, Typography } from "@mui/material";

import WidgetContainer from "./WidgetContainer";
import WidgetHeader from "./WidgetHeader";
import StatusBadge from "../common/StatusBadge";

export default function WidgetLoading({
    title = "Loading",
    subtitle = "Loading data..."
}) {
    return (
        <WidgetContainer>
            <WidgetHeader
                title={title}
                subtitle={subtitle}
                action={<StatusBadge label="Loading" status="syncing" />}
            />

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mt: 2
                }}
            >
                <CircularProgress size={22} />

                <Typography variant="body2" color="text.secondary">
                    Please wait...
                </Typography>
            </Box>
        </WidgetContainer>
    );
}