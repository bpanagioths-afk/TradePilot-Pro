import {
    Box,
    Chip,
    Divider,
    Stack,
    Typography
} from "@mui/material";

import PsychologyIcon from "@mui/icons-material/Psychology";
import RuleIcon from "@mui/icons-material/Rule";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import {
    WidgetContainer,
    WidgetHeader
} from "../../widgets";


const ROADMAP = [
    "Rule Validation",
    "Psychology Analysis",
    "Trading Mistake Detection",
    "Daily Coaching",
    "Weekly Performance Review",
    "Personal Improvement Suggestions"
];


export default function AICoachWidget() {
    return (
        <WidgetContainer>
            <WidgetHeader
                title="AI Coach"
                subtitle="Planned features for Version 2.0"
            />

            <Stack spacing={2} mt={1}>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Το AI Coach θα αναλύει τη συμπεριφορά,
                    την πειθαρχία και τις αποφάσεις του trader,
                    παρέχοντας εξατομικευμένες προτάσεις
                    βελτίωσης.
                </Typography>

                <Divider />

                <Stack spacing={1}>

                    {ROADMAP.map((item) => (
                        <Box
                            key={item}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1
                            }}
                        >
                            <TrendingUpIcon
                                color="primary"
                                fontSize="small"
                            />

                            <Typography variant="body2">
                                {item}
                            </Typography>
                        </Box>
                    ))}

                </Stack>

                <Divider />

                    <Stack
                        direction="row"
                        spacing={1} 
                        useFlexGap
                        sx={{
                           flexWrap: "wrap"
                        }}
                    >
                    <Chip
                        icon={<RuleIcon />}
                        label="Rule Engine"
                        size="small"
                    />

                    <Chip
                        icon={<PsychologyIcon />}
                        label="Psychology"
                        size="small"
                    />

                    <Chip
                        icon={<SchoolIcon />}
                        label="Learning"
                        size="small"
                    />

                    <Chip
                        color="warning"
                        label="Coming in Version 2.0"
                        size="small"
                    />
                </Stack>

            </Stack>
        </WidgetContainer>
    );
}