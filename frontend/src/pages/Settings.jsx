import { useEffect, useMemo, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    FormControlLabel,
    Grid,
    Paper,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import LockResetIcon from "@mui/icons-material/LockReset";

import MT5AccountsManager from "../components/settings/mt5/MT5AccountsManager";
import PasswordField from "../components/common/PasswordField";
import {
    changePassword,
    getStoredUser,
    loadCurrentUser,
} from "../services/authService";

function formatDate(value) {
    if (!value) {
        return "—";
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat("el-GR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(parsedDate);
}

export default function Settings() {
    const [user, setUser] = useState(() => getStoredUser());
    const [profileLoading, setProfileLoading] = useState(true);
    const [profileError, setProfileError] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function fetchCurrentUser() {
            try {
                const currentUser = await loadCurrentUser();

                if (isMounted) {
                    setUser(currentUser);
                    setProfileError("");
                }
            } catch (error) {
                if (isMounted) {
                    setProfileError(
                        error.response?.data?.detail ||
                        "Δεν ήταν δυνατή η φόρτωση των στοιχείων λογαριασμού."
                    );
                }
            } finally {
                if (isMounted) {
                    setProfileLoading(false);
                }
            }
        }

        fetchCurrentUser();

        return () => {
            isMounted = false;
        };
    }, []);

    const roleLabel = useMemo(() => {
        if (!user) {
            return "—";
        }

        return user.is_admin ? "Administrator" : "User";
    }, [user]);

    const subscriptionLabel =
        user?.subscription_status ||
        user?.subscription ||
        "Not configured";

    const licenseLabel =
        user?.license_key ||
        user?.subscription_key ||
        "Not configured";

    async function handleChangePassword(event) {
        event.preventDefault();

        setPasswordError("");
        setPasswordSuccess("");

        if (newPassword !== confirmPassword) {
            setPasswordError("Οι δύο νέοι κωδικοί δεν είναι ίδιοι.");
            return;
        }

        if (newPassword.length < 8) {
            setPasswordError(
                "Ο νέος κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες."
            );
            return;
        }

        setPasswordLoading(true);

        try {
            const response = await changePassword(
                currentPassword,
                newPassword,
                confirmPassword
            );

            setPasswordSuccess(
                response.message ||
                "Ο κωδικός άλλαξε με επιτυχία."
            );

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            setPasswordError(
                error.response?.data?.detail ||
                "Δεν ήταν δυνατή η αλλαγή του κωδικού."
            );
        } finally {
            setPasswordLoading(false);
        }
    }

    return (
        <Box>
            <Typography variant="h4" mb={3}>
                Settings
            </Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" mb={2}>
                    Account Profile
                </Typography>

                {profileError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {profileError}
                    </Alert>
                )}

                {profileLoading ? (
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ alignItems: "center" }}
                    >
                        <CircularProgress size={22} />
                        <Typography color="text.secondary">
                            Loading account details...
                        </Typography>
                    </Stack>
                ) : (
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Username"
                                value={user?.username || ""}
                                fullWidth
                                slotProps={{ htmlInput: { readOnly: true } }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Email"
                                value={user?.email || ""}
                                fullWidth
                                slotProps={{ htmlInput: { readOnly: true } }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Member Since"
                                value={formatDate(user?.created_at)}
                                fullWidth
                                slotProps={{ htmlInput: { readOnly: true } }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Stack spacing={1}>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Role
                                </Typography>

                                <Box>
                                    <Chip
                                        label={roleLabel}
                                        variant="outlined"
                                    />
                                </Box>
                            </Stack>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Subscription"
                                value={subscriptionLabel}
                                fullWidth
                                slotProps={{ htmlInput: { readOnly: true } }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="License"
                                value={licenseLabel}
                                fullWidth
                                slotProps={{ htmlInput: { readOnly: true } }}
                            />
                        </Grid>
                    </Grid>
                )}
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" mb={2}>
                    Security
                </Typography>

                {passwordError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {passwordError}
                    </Alert>
                )}

                {passwordSuccess && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {passwordSuccess}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleChangePassword}>
                    <Stack spacing={2}>
                        <PasswordField
                            label="Current Password"
                            value={currentPassword}
                            onChange={(event) =>
                                setCurrentPassword(event.target.value)
                            }
                            autoComplete="current-password"
                            required
                        />

                        <PasswordField
                            label="New Password"
                            value={newPassword}
                            onChange={(event) =>
                                setNewPassword(event.target.value)
                            }
                            autoComplete="new-password"
                            required
                            helperText="Τουλάχιστον 8 χαρακτήρες."
                        />

                        <PasswordField
                            label="Confirm New Password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            autoComplete="new-password"
                            required
                        />

                        <Box>
                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={
                                    passwordLoading ? (
                                        <CircularProgress
                                            size={18}
                                            color="inherit"
                                        />
                                    ) : (
                                        <LockResetIcon />
                                    )
                                }
                                disabled={passwordLoading}
                            >
                                Change Password
                            </Button>
                        </Box>

                        <Divider />

                        <Button
                            variant="outlined"
                            disabled
                        >
                            Logout from all devices — planned for v1.1
                        </Button>
                    </Stack>
                </Box>
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" mb={2}>
                    General
                </Typography>

                <Stack spacing={2}>
                    <TextField
                       label="Trader Name"
                       value={user?.username || ""}
                       fullWidth
                       slotProps={{ htmlInput: { readOnly: true } }}
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
