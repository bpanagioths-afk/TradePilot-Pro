import { Box, Container } from "@mui/material";
import PageHeader from "./PageHeader";

export default function PageLayout({
    title,
    subtitle,
    actions,
    children,
    maxWidth = "xl"
}) {
    return (
        <Container
            maxWidth={maxWidth}
            sx={{
                py: 3
            }}
        >
            <PageHeader
                title={title}
                subtitle={subtitle}
                actions={actions}
            />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3
                }}
            >
                {children}
            </Box>
        </Container>
    );
}