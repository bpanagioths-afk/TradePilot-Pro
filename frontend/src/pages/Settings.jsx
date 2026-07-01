import {
    Box,
    Typography,
    Paper,
    Stack,
    TextField,
    Button,
    Switch,
    FormControlLabel,
    Divider
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";

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

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" mb={2}>
                    MT5 Settings
                </Typography>

                <Stack spacing={2}>
                    <TextField
                        label="Broker"
                        placeholder="IC Markets / The5ers / FTMO"
                        fullWidth
                    />

                    <TextField
                        label="MT5 Account"
                        placeholder="Account number"
                        fullWidth
                    />

                    <TextField
                        label="Server"
                        placeholder="Broker server"
                        fullWidth
                    />
                </Stack>
            </Paper>

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