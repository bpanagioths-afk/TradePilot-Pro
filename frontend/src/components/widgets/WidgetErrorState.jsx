import { Typography } from "@mui/material";

import WidgetContainer from "./WidgetContainer";
import WidgetHeader from "./WidgetHeader";
import StatusBadge from "../common/StatusBadge";

export default function WidgetErrorState({
    title = "Error",
    subtitle = "Could not load data.",
    message = "Something went wrong."
}) {
    return (
        <WidgetContainer>
            <WidgetHeader
                title={title}
                subtitle={subtitle}
                action={<StatusBadge label="Error" status="failed" />}
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