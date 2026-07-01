import { Card, CardContent, Typography, Box } from "@mui/material";

export default function KPICard({ title, value, subtitle, color = "primary.main" }) {
    return (
        <Card>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {title}
                </Typography>

                <Box mt={1}>
                    <Typography variant="h4" sx={{ color }}>
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