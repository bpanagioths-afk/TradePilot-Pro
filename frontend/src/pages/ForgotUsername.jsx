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

import { forgotUsername } from "../services/authService";

export default function ForgotUsername() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await forgotUsername(email);

            setSuccess(
                response.message ||
                "Αν υπάρχει λογαριασμός με αυτό το email, στάλθηκε μήνυμα ανάκτησης."
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
                                Ανάκτηση username
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1 }}
                            >
                                Γράψε το email του λογαριασμού σου.
                            </Typography>
                        </Box>

                        {error && <Alert severity="error">{error}</Alert>}
                        {success && <Alert severity="success">{success}</Alert>}

                        <Box component="form" onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    autoComplete="email"
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
                                        "Αποστολή username"
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
