import { Typography } from "@mui/material";

import WidgetContainer from "./WidgetContainer";
import WidgetHeader from "./WidgetHeader";
import StatusBadge from "../common/StatusBadge";

export default function WidgetEmptyState({
    title = "Empty",
    subtitle = "No data available.",
    message = "There is nothing to show yet."
}) {
    return (
        <WidgetContainer>
            <WidgetHeader
                title={title}
                subtitle={subtitle}
                action={<StatusBadge label="Empty" status="planned" />}
            />

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2 }}
            >
                {message}
            </Typography>
        </WidgetContainer>
    );
}