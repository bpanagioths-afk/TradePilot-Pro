import { Box } from "@mui/material";

export default function WidgetFooter({ children }) {
    return (
        <Box
            sx={{
                mt: "auto",
                pt: 2,
                display: "flex",
                justifyContent: "flex-end",
                gap: 1
            }}
        >
            {children}
        </Box>
    );
}