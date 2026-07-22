import {
    AppBar,
    Button,
    Chip,
    Stack,
    Toolbar,
    Typography
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import {
    getStoredUser,
    logout
} from "../services/authService";

export default function Topbar() {
    const navigate = useNavigate();
    const user = getStoredUser();

    function handleLogout() {
        logout();
        navigate("/login", { replace: true });
    }

    return (
        <AppBar
            position="fixed"
            color="inherit"
            sx={{
                zIndex: 1300
            }}
        >
            <Toolbar>
                <Typography
                    variant="h5"
                    sx={{ flexGrow: 1 }}
                >
                    Dashboard
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        alignItems: "center"
                    }}
                >
                    <Chip
                        label="MT5 Connected"
                        color="success"
                    />

                    <Chip
                        label={
                            user?.username ||
                            user?.email ||
                            "TradePilot Pro"
                        }
                        color="primary"
                    />

                    <Button
                        variant="outlined"
                        onClick={handleLogout}
                    >
                        Αποσύνδεση
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}