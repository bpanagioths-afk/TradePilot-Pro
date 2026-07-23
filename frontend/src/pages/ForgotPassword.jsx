import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

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

import { forgotPassword } from "../services/authService";

export default function ForgotPassword() {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await forgotPassword(usernameOrEmail);

            setSuccess(
                response.message ||
                "Αν υπάρχει λογαριασμός με αυτά τα στοιχεία, στάλθηκε email επαναφοράς."
            );
        } catch (requestError) {
            setError(
                requestError.response?.data?.detail ||
                "Δεν ήταν δυνατή η αποστολή του email."
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
                            <Typography variant="h5" fontWeight={700}>
                                Επαναφορά κωδικού
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1 }}
                            >
                                Γράψε το username ή το email σου.
                            </Typography>
                        </Box>

                        {error && <Alert severity="error">{error}</Alert>}
                        {success && <Alert severity="success">{success}</Alert>}

                        <Box component="form" onSubmit={handleSubmit}>
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
                                        "Αποστολή email επαναφοράς"
                                    )}
                                </Button>

                                <Link
                                    component={RouterLink}
                                    to="/login"
                                    underline="hover"
                                    textAlign="center"
                                >
                                    Επιστροφή στη σύνδεση
                                </Link>
                            </Stack>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
