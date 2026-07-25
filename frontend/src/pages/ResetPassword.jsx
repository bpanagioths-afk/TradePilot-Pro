import { useState } from "react";
import {
    useNavigate,
    useSearchParams
} from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Stack,
    Typography
} from "@mui/material";

import PasswordField from "../components/common/PasswordField";
import { resetPassword } from "../services/authService";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token") || "";

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!token) {
            setError(
                "Το link επαναφοράς κωδικού δεν περιέχει έγκυρο token."
            );
            return;
        }

        if (newPassword.length < 8) {
            setError(
                "Ο νέος κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setError(
                "Οι δύο κωδικοί δεν είναι ίδιοι."
            );
            return;
        }

        setLoading(true);

        try {
            await resetPassword(
                token,
                newPassword
            );

            setSuccess(
                "Ο κωδικός άλλαξε επιτυχώς. Μπορείς τώρα να συνδεθείς."
            );

            setTimeout(() => {
                navigate("/login", {
                    replace: true
                });
            }, 2500);
        } catch (requestError) {
            const detail =
                requestError.response?.data?.detail;

            setError(
                detail ||
                "Η αλλαγή κωδικού απέτυχε. Το link μπορεί να έχει λήξει."
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
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 420
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <Stack spacing={3}>
                        <Box>
                            <Typography
                                variant="h4"
                                fontWeight={700}
                            >
                                TradePilot Pro
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1 }}
                            >
                                Δημιουργία νέου κωδικού
                            </Typography>
                        </Box>

                        {!token && (
                            <Alert severity="error">
                                Το link επαναφοράς κωδικού δεν είναι έγκυρο.
                            </Alert>
                        )}

                        {error && (
                            <Alert severity="error">
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert severity="success">
                                {success}
                            </Alert>
                        )}

                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                        >
                            <Stack spacing={2}>
                                <PasswordField
                                    label="Νέος κωδικός"
                                    value={newPassword}
                                    onChange={(event) =>
                                        setNewPassword(
                                            event.target.value
                                        )
                                    }
                                    autoComplete="new-password"
                                    disabled={
                                        loading ||
                                        Boolean(success) ||
                                        !token
                                    }
                                    required
                                    autoFocus
                                />

                                <PasswordField
                                    label="Επιβεβαίωση νέου κωδικού"
                                    value={confirmPassword}
                                    onChange={(event) =>
                                        setConfirmPassword(
                                            event.target.value
                                        )
                                    }
                                    autoComplete="new-password"
                                    disabled={
                                        loading ||
                                        Boolean(success) ||
                                        !token
                                    }
                                    required
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={
                                        loading ||
                                        Boolean(success) ||
                                        !token
                                    }
                                    fullWidth
                                >
                                    {loading ? (
                                        <CircularProgress
                                            size={24}
                                            color="inherit"
                                        />
                                    ) : (
                                        "Αλλαγή κωδικού"
                                    )}
                                </Button>

                                <Button
                                    type="button"
                                    variant="text"
                                    disabled={loading}
                                    onClick={() =>
                                        navigate("/login")
                                    }
                                    fullWidth
                                >
                                    Επιστροφή στη σύνδεση
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}