import {
    Box,
    Typography,
    Paper,
    Stack,
    TextField,
    Button,
    Switch,
    FormControlLabel,
    Divider,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import MT5AccountsManager from "../components/settings/mt5/MT5AccountsManager";

export default function Settings() {
    return (
        <Box>
            <Typography variant="h4" mb={3}>
                Settings
            </Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" mb={2}>
                    General
                </Typography>

                <Stack spacing={2}>
                    <TextField
                        label="Trader Name"
                        defaultValue="Panagiotis"
                        fullWidth
                    />

                    <TextField
                        label="Base Currency"
                        defaultValue="EUR"
                        fullWidth
                    />

                    <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Dark Theme"
                    />
                </Stack>
            </Paper>

            <MT5AccountsManager />

            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" mb={2}>
                    Backup & Export
                </Typography>

                <Stack spacing={2}>
                    <Button variant="outlined">
                        Export Backup
                    </Button>

                    <Button variant="outlined">
                        Import Backup
                    </Button>

                    <Divider />

                    <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                    >
                        Save Settings
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
}