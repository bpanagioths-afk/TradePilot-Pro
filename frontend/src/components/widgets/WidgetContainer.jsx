import { Paper } from "@mui/material";

export default function WidgetContainer({ children }) {
    return (
        <Paper
            sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column"
            }}
        >
            {children}
        </Paper>
    );
}