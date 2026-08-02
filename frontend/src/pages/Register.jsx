import { useState } from "react";

import {
    Link as RouterLink,
    useNavigate
} from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Link,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import {
    ArrowBackRounded,
    PersonAddAltRounded
} from "@mui/icons-material";

import { register } from "../services/authService";

import AuthLayout from "../components/auth/AuthLayout";
import PasswordField from "../components/common/PasswordField";


const fieldSx = {
    "& .MuiOutlinedInput-root": {
        minHeight: 56,
        borderRadius: 2.5,
        backgroundColor: "rgba(15,23,42,0.42)",
        transition:
            "background-color 180ms ease, box-shadow 180ms ease",
        "&:hover": {
            backgroundColor: "rgba(15,23,42,0.62)"
        },
        "&.Mui-focused": {
            backgroundColor: "rgba(15,23,42,0.72)",
            boxShadow:
                "0 0 0 4px rgba(59,130,246,0.10)"
        }
    }
};


function getErrorMessage(requestError) {
    const detail =
        requestError.response?.data?.detail;

    if (typeof detail === "string") {
        if (
            detail ===
            "Username or email is already registered"
        ) {
            return "Το username ή το email χρησιμοποιείται ήδη.";
        }

        return detail;
    }

    if (Array.isArray(detail)) {
        return detail
            .map((item) => item.msg)
            .filter(Boolean)
            .join(" ");
    }

    return "Η δημιουργία λογαριασμού απέτυχε.";
}


export default function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] =
        useState("");
    const [
        confirmPassword,
        setConfirmPassword
    ] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] =
        useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");

        if (password !== confirmPassword) {
            setError(
                "Η επιβεβαίωση κωδικού δεν ταιριάζει."
            );
            return;
        }

        setLoading(true);

        try {
            await register({
                username,
                email,
                password
            });

            navigate("/login", {
                replace: true,
                state: {
                    registrationSuccess: true
                }
            });
        } catch (requestError) {
            setError(
                getErrorMessage(requestError)
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout
            title="Δημιουργία λογαριασμού"
            subtitle="Δημιούργησε το προσωπικό σου trading workspace και ξεκίνα να οργανώνεις τις συναλλαγές σου."
        >
            <Stack spacing={3.5}>
                {error && (
                    <Alert
                        severity="error"
                        sx={{
                            borderRadius: 2.5,
                            alignItems: "center"
                        }}
                    >
                        {error}
                    </Alert>
                )}

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <Stack spacing={2.5}>
                        <TextField
                            label="Username"
                            placeholder="Επίλεξε username"
                            value={username}
                            onChange={(event) =>
                                setUsername(
                                    event.target.value
                                )
                            }
                            autoComplete="username"
                            inputProps={{
                                minLength: 3,
                                maxLength: 100
                            }}
                            autoFocus
                            required
                            fullWidth
                            sx={fieldSx}
                        />

                        <TextField
                            label="Email"
                            placeholder="Εισάγετε το email σας"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            autoComplete="email"
                            inputProps={{
                                maxLength: 255
                            }}
                            required
                            fullWidth
                            sx={fieldSx}
                        />

                        <PasswordField
                            label="Κωδικός"
                            placeholder="Τουλάχιστον 8 χαρακτήρες"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            autoComplete="new-password"
                            inputProps={{
                                minLength: 8,
                                maxLength: 128
                            }}
                            required
                            sx={fieldSx}
                        />

                        <PasswordField
                            label="Επιβεβαίωση κωδικού"
                            placeholder="Πληκτρολόγησε ξανά τον κωδικό"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(
                                    event.target.value
                                )
                            }
                            autoComplete="new-password"
                            inputProps={{
                                minLength: 8,
                                maxLength: 128
                            }}
                            required
                            sx={fieldSx}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                            fullWidth
                            startIcon={
                                loading
                                    ? null
                                    : (
                                        <PersonAddAltRounded />
                                    )
                            }
                            sx={{
                                minHeight: 56,
                                mt: 0.75,
                                borderRadius: 2.5,
                                fontWeight: 800,
                                fontSize: 16,
                                textTransform: "none",
                                background:
                                    "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)",
                                boxShadow:
                                    "0 16px 34px rgba(37,99,235,0.26)",
                                transition:
                                    "transform 180ms ease, box-shadow 180ms ease",
                                "&:hover": {
                                    transform:
                                        "translateY(-2px)",
                                    boxShadow:
                                        "0 20px 42px rgba(37,99,235,0.36)"
                                },
                                "&:active": {
                                    transform:
                                        "translateY(0)"
                                }
                            }}
                        >
                            {loading ? (
                                <CircularProgress
                                    size={24}
                                    color="inherit"
                                />
                            ) : (
                                "Δημιουργία λογαριασμού"
                            )}
                        </Button>
                    </Stack>
                </Box>

                <Stack
                    direction={{
                        xs: "column",
                        sm: "row"
                    }}
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                >
                    <ArrowBackRounded
                        fontSize="small"
                        color="primary"
                    />

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Έχεις ήδη λογαριασμό;
                    </Typography>

                    <Link
                        component={RouterLink}
                        to="/login"
                        underline="hover"
                        fontWeight={800}
                    >
                        Σύνδεση
                    </Link>
                </Stack>
            </Stack>
        </AuthLayout>
    );
}