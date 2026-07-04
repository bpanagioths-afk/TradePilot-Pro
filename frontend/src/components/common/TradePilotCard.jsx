import { Card, CardContent } from "@mui/material";

export default function TradePilotCard({
    children,
    sx = {},
    contentSx = {},
    hover = true,
}) {
    return (
        <Card
            sx={{
                border: "1px solid rgba(59, 130, 246, 0.28)",
                background: "linear-gradient(180deg, #1E293B 0%, #111827 100%)",   
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.22)",
                transition: "all 0.2s ease",
                ...(hover && {
                    "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.32)",
                        borderColor: "rgba(59, 130, 246, 0.45)",
                    },
                }),
                ...sx,
            }}
        >
            <CardContent
                sx={{
                    p: 2,
                    "&:last-child": {
                        pb: 2,
                    },
                    ...contentSx,
                }}
            >
                {children}
            </CardContent>
        </Card>
    );
}