import { Card, CardContent, Typography, Box, Stack } from "@mui/material";

export default function KPICard({
    title,
    value,
    subtitle,
    color = "primary.main",
    icon = null
}) {
    return (
        <Card
            sx={{
                height: "100%",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)"
            }}
        >
            <CardContent>
                    <Stack
                        direction="row"
                        sx={{
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                    <Typography variant="body2" color="text.secondary">
                        {title}
                    </Typography>

                    {icon && (
                        <Box sx={{ color }}>
                            {icon}
                        </Box>
                    )}
                </Stack>

                <Box mt={2}>
                    <Typography variant="h4" sx={{ color, fontWeight: 700 }}>
                        {value}
                    </Typography>
                </Box>

                {subtitle && (
                    <Typography variant="body2" color="text.secondary" mt={1}>
                        {subtitle}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}