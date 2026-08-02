import { useState } from "react";

import {
    Link as RouterLink,
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Divider,
    Link,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import {
    LoginRounded,
    PersonAddAltRounded
} from "@mui/icons-material";

import { login } from "../services/authService";

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


export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const [usernameOrEmail, setUsernameOrEmail] =
        useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const redirectPath =
        location.state?.from?.pathname || "/home";

    const registrationSuccess =
        location.state?.registrationSuccess === true;

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            await login(
                usernameOrEmail,
                password
            );

            navigate(redirectPath, {
                replace: true
            });
        } catch (requestError) {
            const detail =
                requestError.response?.data?.detail;

            setError(
                typeof detail === "string"
                    ? detail
                    : "Η σύνδεση απέτυχε. Έλεγξε το username/email και τον κωδικό."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout
            title="Καλώς ήρθες ξανά"
            subtitle="Συνδέσου στον λογαριασμό σου και συνέχισε την ανάλυση της trading απόδοσής σου."
        >
            <Stack spacing={3.5}>
                {registrationSuccess && (
                    <Alert
                        severity="success"
                        sx={{
                            borderRadius: 2.5,
                            alignItems: "center"
                        }}
                    >
                        Ο λογαριασμός δημιουργήθηκε
                        επιτυχώς. Μπορείς τώρα να
                        συνδεθείς.
                    </Alert>
                )}

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
                    <Stack spacing={2.75}>
                        <TextField
                            label="Username ή Email"
                            placeholder="Εισάγετε το username ή το email σας"
                            value={usernameOrEmail}
                            onChange={(event) =>
                                setUsernameOrEmail(
                                    event.target.value
                                )
                            }
                            autoComplete="username"
                            autoFocus
                            required
                            fullWidth
                            sx={fieldSx}
                        />

                        <PasswordField
                            label="Κωδικός"
                            placeholder="Εισάγετε τον κωδικό σας"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            autoComplete="current-password"
                            required
                            sx={fieldSx}
                        />

                        <Stack
                            direction={{
                                xs: "column",
                                sm: "row"
                            }}
                            spacing={1.25}
                            justifyContent="space-between"
                            alignItems={{
                                xs: "flex-start",
                                sm: "center"
                            }}
                        >
                            <Link
                                component={RouterLink}
                                to="/forgot-username"
                                underline="hover"
                                sx={{
                                    fontWeight: 600
                                }}
                            >
                                Ξέχασες το username;
                            </Link>

                            <Link
                                component={RouterLink}
                                to="/forgot-password"
                                underline="hover"
                                sx={{
                                    fontWeight: 600
                                }}
                            >
                                Ξέχασες τον κωδικό;
                            </Link>
                        </Stack>

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                            fullWidth
                            startIcon={
                                loading
                                    ? null
                                    : <LoginRounded />
                            }
                            sx={{
                                minHeight: 56,
                                mt: 0.5,
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
                                "Σύνδεση"
                            )}
                        </Button>
                    </Stack>
                </Box>

                <Divider
                    sx={{
                        "&::before, &::after": {
                            borderColor:
                                "rgba(148,163,184,0.18)"
                        }
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            px: 1.5
                        }}
                    >
                        Δεν έχεις λογαριασμό;
                    </Typography>
                </Divider>

                <Button
                    component={RouterLink}
                    to="/register"
                    variant="outlined"
                    size="large"
                    fullWidth
                    startIcon={
                        <PersonAddAltRounded />
                    }
                    sx={{
                        minHeight: 56,
                        borderRadius: 2.5,
                        fontWeight: 800,
                        fontSize: 16,
                        textTransform: "none",
                        borderWidth: 1.5,
                        backgroundColor:
                            "rgba(59,130,246,0.04)",
                        transition:
                            "transform 180ms ease, background-color 180ms ease, border-color 180ms ease",
                        "&:hover": {
                            transform:
                                "translateY(-2px)",
                            borderWidth: 1.5,
                            backgroundColor:
                                "rgba(59,130,246,0.10)"
                        }
                    }}
                >
                    Δημιουργία λογαριασμού
                </Button>
            </Stack>
        </AuthLayout>
    );
}