import { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Link,
    Stack,
    TextField,
    Typography
} from "@mui/material";


import { login } from "../services/authService";

import PasswordField from "../components/common/PasswordField";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const redirectPath = location.state?.from?.pathname || "/home";

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            await login(usernameOrEmail, password);
            navigate(redirectPath, { replace: true });
        } catch (requestError) {
            const detail = requestError.response?.data?.detail;

            setError(
                detail ||
                "Η σύνδεση απέτυχε. Έλεγξε το όνομα χρήστη και τον κωδικό."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2
            }}
        >
            <Card sx={{ width: "100%", maxWidth: 420 }}>
                <CardContent sx={{ p: 4 }}>
                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="h4" fontWeight={700}>
                                TradePilot Pro
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1 }}
                            >
                                Σύνδεση στον λογαριασμό σου
                            </Typography>
                        </Box>

                        {error && (
                            <Alert severity="error">
                                {error}
                            </Alert>
                        )}

                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                        >
                            <Stack spacing={2}>
                                <TextField
                                    label="Username ή Email"
                                    value={usernameOrEmail}
                                    onChange={(event) =>
                                        setUsernameOrEmail(event.target.value)
                                    }
                                    autoComplete="username"
                                    autoFocus
                                    required
                                    fullWidth
                                />

<PasswordField
    label="Κωδικός"
    value={password}
    onChange={(event) =>
        setPassword(event.target.value)
    }
    autoComplete="current-password"
    required
/>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={loading}
                                    fullWidth
                                >
                                    {loading ? (
                                        <CircularProgress
                                            size={24}
                                            color="inherit"
                                        />
                                    ) : (
                                        "Σύνδεση"
                                    )}
                                </Button>

                                <Stack
                                    direction={{
                                        xs: "column",
                                        sm: "row"
                                    }}
                                    spacing={1}
                                    sx={{
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Link
                                        component={RouterLink}
                                        to="/forgot-username"
                                        underline="hover"
                                    >
                                        Ξέχασα το username
                                    </Link>

                                    <Link
                                        component={RouterLink}
                                        to="/forgot-password"
                                        underline="hover"
                                    >
                                        Ξέχασα τον κωδικό
                                    </Link>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
