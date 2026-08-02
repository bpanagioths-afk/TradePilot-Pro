import { useEffect, useMemo, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import LockResetIcon from "@mui/icons-material/LockReset";
import DownloadIcon from "@mui/icons-material/Download";

import MT5AccountsManager from "../components/settings/mt5/MT5AccountsManager";
import PasswordField from "../components/common/PasswordField";
import BackupImportPanel from "../features/settings/backup/BackupImportPanel";
import {
    changePassword,
    getStoredUser,
    loadCurrentUser,
} from "../services/authService";

import {
    exportSettingsBackup,
    loadSettings,
    updateSettings,
} from "../services/settingsService";


const TIMEZONE_OPTIONS =
    typeof Intl.supportedValuesOf === "function"
        ? Intl.supportedValuesOf("timeZone")
        : [
              "UTC",
              "Europe/Athens",
              "Europe/London",
              "Europe/Paris",
              "Europe/Berlin",
              "Europe/Rome",
              "America/New_York",
              "America/Chicago",
              "America/Denver",
              "America/Los_Angeles",
              "Asia/Dubai",
              "Asia/Tokyo",
              "Asia/Shanghai",
              "Australia/Sydney",
          ];


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


function buildBackupFilename() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(
        now.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
        now.getDate()
    ).padStart(2, "0");
    const hours = String(
        now.getHours()
    ).padStart(2, "0");
    const minutes = String(
        now.getMinutes()
    ).padStart(2, "0");
    const seconds = String(
        now.getSeconds()
    ).padStart(2, "0");

    return (
        "tradepilot_backup_" +
        `${year}${month}${day}_` +
        `${hours}${minutes}${seconds}.json`
    );
}


function downloadJsonFile(
    backupData,
    filename
) {
    const jsonContent = JSON.stringify(
        backupData,
        null,
        2
    );

    const fileBlob = new Blob(
        [jsonContent],
        {
            type: "application/json;charset=utf-8",
        }
    );

    const objectUrl = URL.createObjectURL(
        fileBlob
    );

    const downloadLink =
        document.createElement("a");

    downloadLink.href = objectUrl;
    downloadLink.download = filename;

    document.body.appendChild(
        downloadLink
    );

    downloadLink.click();
    downloadLink.remove();

    URL.revokeObjectURL(objectUrl);
}


export default function Settings() {
    const [user, setUser] = useState(
        () => getStoredUser()
    );

    const [profileLoading, setProfileLoading] =
        useState(true);
    const [profileError, setProfileError] =
        useState("");

    const [settings, setSettings] = useState({
        timezone: "Europe/Athens",
        time_format: "24h",
        date_format: "DD/MM/YYYY",
    });

    const [settingsLoading, setSettingsLoading] =
        useState(true);
    const [settingsSaving, setSettingsSaving] =
        useState(false);
    const [settingsError, setSettingsError] =
        useState("");
    const [settingsSuccess, setSettingsSuccess] =
        useState("");

    const [currentPassword, setCurrentPassword] =
        useState("");
    const [newPassword, setNewPassword] =
        useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [passwordLoading, setPasswordLoading] =
        useState(false);
    const [passwordError, setPasswordError] =
        useState("");
    const [passwordSuccess, setPasswordSuccess] =
        useState("");

    const [backupLoading, setBackupLoading] =
        useState(false);
    const [backupError, setBackupError] =
        useState("");
    const [backupSuccess, setBackupSuccess] =
        useState("");


    useEffect(() => {
        let isMounted = true;

        async function fetchCurrentUser() {
            try {
                const currentUser =
                    await loadCurrentUser();

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


    useEffect(() => {
        let isMounted = true;

        async function fetchSettings() {
            try {
                const settingsData =
                    await loadSettings();

                if (isMounted) {
                    setSettings(settingsData);
                    setSettingsError("");
                }
            } catch (error) {
                if (isMounted) {
                    setSettingsError(
                        error.response?.data?.detail ||
                        "Δεν ήταν δυνατή η φόρτωση των ρυθμίσεων."
                    );
                }
            } finally {
                if (isMounted) {
                    setSettingsLoading(false);
                }
            }
        }

        fetchSettings();

        return () => {
            isMounted = false;
        };
    }, []);


    const roleLabel = useMemo(() => {
        if (!user) {
            return "—";
        }

        return user.is_admin
            ? "Administrator"
            : "User";
    }, [user]);


    const subscriptionLabel =
        user?.subscription_status ||
        user?.subscription ||
        "Not configured";


    const licenseLabel =
        user?.license_key ||
        user?.subscription_key ||
        "Not configured";


    function handleSettingsChange(event) {
        const { name, value } = event.target;

        setSettings((currentSettings) => ({
            ...currentSettings,
            [name]: value,
        }));

        setSettingsError("");
        setSettingsSuccess("");
    }


    async function handleSaveSettings(event) {
        event.preventDefault();

        setSettingsSaving(true);
        setSettingsError("");
        setSettingsSuccess("");

        try {
            const updatedSettings =
                await updateSettings(settings);

            setSettings(updatedSettings);

            setSettingsSuccess(
                "Οι ρυθμίσεις αποθηκεύτηκαν με επιτυχία."
            );
        } catch (error) {
            setSettingsError(
                error.response?.data?.detail ||
                "Δεν ήταν δυνατή η αποθήκευση των ρυθμίσεων."
            );
        } finally {
            setSettingsSaving(false);
        }
    }


    async function handleChangePassword(event) {
        event.preventDefault();

        setPasswordError("");
        setPasswordSuccess("");

        if (newPassword !== confirmPassword) {
            setPasswordError(
                "Οι δύο νέοι κωδικοί δεν είναι ίδιοι."
            );
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
            const response =
                await changePassword(
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


    async function handleExportBackup() {
        setBackupLoading(true);
        setBackupError("");
        setBackupSuccess("");

        try {
            const backupData =
                await exportSettingsBackup();

            downloadJsonFile(
                backupData,
                buildBackupFilename()
            );

            setBackupSuccess(
                "Το ασφαλές backup δημιουργήθηκε με επιτυχία."
            );
        } catch (error) {
            setBackupError(
                error.response?.data?.detail ||
                "Δεν ήταν δυνατή η δημιουργία του backup."
            );
        } finally {
            setBackupLoading(false);
        }
    }


    return (
        <Box>
            <Typography
                variant="h4"
                mb={3}
            >
                Settings
            </Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography
                    variant="h6"
                    mb={2}
                >
                    Account Profile
                </Typography>

                {profileError && (
                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                    >
                        {profileError}
                    </Alert>
                )}

                {profileLoading ? (
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            alignItems: "center",
                        }}
                    >
                        <CircularProgress
                            size={22}
                        />

                        <Typography
                            color="text.secondary"
                        >
                            Loading account details...
                        </Typography>
                    </Stack>
                ) : (
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <TextField
                                label="Username"
                                value={
                                    user?.username ||
                                    ""
                                }
                                fullWidth
                                slotProps={{
                                    htmlInput: {
                                        readOnly: true,
                                    },
                                }}
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <TextField
                                label="Email"
                                value={
                                    user?.email ||
                                    ""
                                }
                                fullWidth
                                slotProps={{
                                    htmlInput: {
                                        readOnly: true,
                                    },
                                }}
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <TextField
                                label="Member Since"
                                value={formatDate(
                                    user?.created_at
                                )}
                                fullWidth
                                slotProps={{
                                    htmlInput: {
                                        readOnly: true,
                                    },
                                }}
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <Stack spacing={1}>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Role
                                </Typography>

                                <Box>
                                    <Chip
                                        label={
                                            roleLabel
                                        }
                                        variant="outlined"
                                    />
                                </Box>
                            </Stack>
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <TextField
                                label="Subscription"
                                value={
                                    subscriptionLabel
                                }
                                fullWidth
                                slotProps={{
                                    htmlInput: {
                                        readOnly: true,
                                    },
                                }}
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <TextField
                                label="License"
                                value={
                                    licenseLabel
                                }
                                fullWidth
                                slotProps={{
                                    htmlInput: {
                                        readOnly: true,
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                )}
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography
                    variant="h6"
                    mb={2}
                >
                    Security
                </Typography>

                {passwordError && (
                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                    >
                        {passwordError}
                    </Alert>
                )}

                {passwordSuccess && (
                    <Alert
                        severity="success"
                        sx={{ mb: 2 }}
                    >
                        {passwordSuccess}
                    </Alert>
                )}

                <Box
                    component="form"
                    onSubmit={
                        handleChangePassword
                    }
                >
                    <Stack spacing={2}>
                        <PasswordField
                            label="Current Password"
                            value={
                                currentPassword
                            }
                            onChange={(event) =>
                                setCurrentPassword(
                                    event.target
                                        .value
                                )
                            }
                            autoComplete="current-password"
                            required
                        />

                        <PasswordField
                            label="New Password"
                            value={newPassword}
                            onChange={(event) =>
                                setNewPassword(
                                    event.target
                                        .value
                                )
                            }
                            autoComplete="new-password"
                            required
                            helperText="Τουλάχιστον 8 χαρακτήρες."
                        />

                        <PasswordField
                            label="Confirm New Password"
                            value={
                                confirmPassword
                            }
                            onChange={(event) =>
                                setConfirmPassword(
                                    event.target
                                        .value
                                )
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
                                disabled={
                                    passwordLoading
                                }
                            >
                                Change Password
                            </Button>
                        </Box>

                        <Divider />

                        <Button
                            variant="outlined"
                            disabled
                        >
                            Logout from all devices
                            — planned for v1.1
                        </Button>
                    </Stack>
                </Box>
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography
                    variant="h6"
                    mb={2}
                >
                    General
                </Typography>

                {settingsError && (
                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                    >
                        {settingsError}
                    </Alert>
                )}

                {settingsSuccess && (
                    <Alert
                        severity="success"
                        sx={{ mb: 2 }}
                    >
                        {settingsSuccess}
                    </Alert>
                )}

                {settingsLoading ? (
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            alignItems: "center",
                        }}
                    >
                        <CircularProgress
                            size={22}
                        />

                        <Typography
                            color="text.secondary"
                        >
                            Loading settings...
                        </Typography>
                    </Stack>
                ) : (
                    <Box
                        component="form"
                        onSubmit={
                            handleSaveSettings
                        }
                    >
                        <Stack spacing={2}>
                            <TextField
                                select
                                label="Timezone"
                                name="timezone"
                                value={
                                    settings.timezone ||
                                    "Europe/Athens"
                                }
                                onChange={
                                    handleSettingsChange
                                }
                                fullWidth
                            >
                                {TIMEZONE_OPTIONS.map(
                                    (timezone) => (
                                        <MenuItem
                                            key={
                                                timezone
                                            }
                                            value={
                                                timezone
                                            }
                                        >
                                            {
                                                timezone
                                            }
                                        </MenuItem>
                                    )
                                )}
                            </TextField>

                            <TextField
                                select
                                label="Time Format"
                                name="time_format"
                                value={
                                    settings.time_format ||
                                    "24h"
                                }
                                onChange={
                                    handleSettingsChange
                                }
                                fullWidth
                            >
                                <MenuItem value="24h">
                                    24-hour
                                </MenuItem>

                                <MenuItem value="12h">
                                    12-hour
                                </MenuItem>
                            </TextField>

                            <TextField
                                select
                                label="Date Format"
                                name="date_format"
                                value={
                                    settings.date_format ||
                                    "DD/MM/YYYY"
                                }
                                onChange={
                                    handleSettingsChange
                                }
                                fullWidth
                            >
                                <MenuItem value="DD/MM/YYYY">
                                    DD/MM/YYYY
                                </MenuItem>

                                <MenuItem value="MM/DD/YYYY">
                                    MM/DD/YYYY
                                </MenuItem>

                                <MenuItem value="YYYY-MM-DD">
                                    YYYY-MM-DD
                                </MenuItem>
                            </TextField>

                            <Box>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={
                                        settingsSaving ? (
                                            <CircularProgress
                                                size={
                                                    18
                                                }
                                                color="inherit"
                                            />
                                        ) : (
                                            <SaveIcon />
                                        )
                                    }
                                    disabled={
                                        settingsSaving
                                    }
                                >
                                    Save Settings
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                )}
            </Paper>

            <MT5AccountsManager />

            <Paper sx={{ p: 3 }}>
                <Typography
                    variant="h6"
                    mb={2}
                >
                    Backup & Export
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    Το backup περιλαμβάνει μόνο
                    δεδομένα του ενεργού χρήστη.
                    Κωδικοί, δικαιώματα
                    administrator, MT5 connection
                    details και εσωτερικά database
                    IDs εξαιρούνται.
                </Typography>

                {backupError && (
                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                    >
                        {backupError}
                    </Alert>
                )}

                {backupSuccess && (
                    <Alert
                        severity="success"
                        sx={{ mb: 2 }}
                    >
                        {backupSuccess}
                    </Alert>
                )}

                <Stack spacing={2}>
                    <Box>
                        <Button
                            variant="outlined"
                            startIcon={
                                backupLoading ? (
                                    <CircularProgress
                                        size={18}
                                        color="inherit"
                                    />
                                ) : (
                                    <DownloadIcon />
                                )
                            }
                            disabled={
                                backupLoading
                            }
                            onClick={
                                handleExportBackup
                            }
                        >
                            Export Backup
                        </Button>
                    </Box>

                    <BackupImportPanel />
                </Stack>
            </Paper>
        </Box>
    );
}