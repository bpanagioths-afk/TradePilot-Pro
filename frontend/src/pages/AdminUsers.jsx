import { useEffect, useMemo, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    Paper,
    Stack,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from "@mui/icons-material/LockReset";
import RefreshIcon from "@mui/icons-material/Refresh";

import PasswordField from "../components/common/PasswordField";
import { getStoredUser } from "../services/authService";
import {
    createAdminUser,
    deleteAdminUser,
    getAdminUsers,
    resetAdminUserPassword,
    updateAdminUser
} from "../services/adminService";


const EMPTY_USER_FORM = {
    username: "",
    email: "",
    password: "",
    is_admin: false,
    is_active: true
};


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
        hour: "2-digit",
        minute: "2-digit"
    }).format(parsedDate);
}


function getErrorMessage(error, fallbackMessage) {
    const detail = error.response?.data?.detail;

    if (typeof detail === "string") {
        return detail;
    }

    if (Array.isArray(detail)) {
        return detail
            .map((item) => item.msg)
            .filter(Boolean)
            .join(", ");
    }

    return fallbackMessage;
}


function canDeleteUser(user, currentUser) {
    return (
        user.id !== currentUser?.id
        && user.mt5_accounts_count === 0
        && user.trades_count === 0
    );
}


export default function AdminUsers() {
    const currentUser = useMemo(() => getStoredUser(), []);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [pageError, setPageError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [userDialogOpen, setUserDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userForm, setUserForm] = useState(EMPTY_USER_FORM);
    const [userDialogError, setUserDialogError] = useState("");
    const [userSaving, setUserSaving] = useState(false);

    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
    const [passwordUser, setPasswordUser] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordDialogError, setPasswordDialogError] = useState("");
    const [passwordSaving, setPasswordSaving] = useState(false);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteUserTarget, setDeleteUserTarget] = useState(null);
    const [deleteDialogError, setDeleteDialogError] = useState("");
    const [deleteSaving, setDeleteSaving] = useState(false);


    async function loadUsers({ isRefresh = false } = {}) {
        if (isRefresh) {
            setRefreshing(true);
        } else {
            setLoading(true);
        }

        setPageError("");

        try {
            const response = await getAdminUsers();
            setUsers(response);
        } catch (error) {
            setPageError(
                getErrorMessage(
                    error,
                    "Δεν ήταν δυνατή η φόρτωση των χρηστών."
                )
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }


    useEffect(() => {
        loadUsers();
    }, []);


    function openCreateDialog() {
        setEditingUser(null);
        setUserForm(EMPTY_USER_FORM);
        setUserDialogError("");
        setUserDialogOpen(true);
    }


    function openEditDialog(user) {
        setEditingUser(user);
        setUserForm({
            username: user.username,
            email: user.email,
            password: "",
            is_admin: user.is_admin,
            is_active: user.is_active
        });
        setUserDialogError("");
        setUserDialogOpen(true);
    }


function closeUserDialog(event, reason) {
    if (reason === "backdropClick") {
        return;
    }

    if (!userSaving) {
        setUserDialogOpen(false);
    }
}


    function handleUserFormChange(event) {
        const { name, value, checked, type } = event.target;

        setUserForm((currentForm) => ({
            ...currentForm,
            [name]: type === "checkbox" ? checked : value
        }));
    }


    async function handleUserSubmit(event) {
        event.preventDefault();
        setUserDialogError("");
        setSuccessMessage("");

        const username = userForm.username.trim();
        const email = userForm.email.trim().toLowerCase();

        if (username.length < 3) {
            setUserDialogError(
                "Το username πρέπει να έχει τουλάχιστον 3 χαρακτήρες."
            );
            return;
        }

        if (!email.includes("@")) {
            setUserDialogError("Συμπλήρωσε έγκυρο email.");
            return;
        }

        if (!editingUser && userForm.password.length < 8) {
            setUserDialogError(
                "Ο κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες."
            );
            return;
        }

        setUserSaving(true);

        try {
            if (editingUser) {
                await updateAdminUser(editingUser.id, {
                    username,
                    email,
                    is_admin: userForm.is_admin,
                    is_active: userForm.is_active
                });

                setSuccessMessage(
                    `Ο χρήστης ${username} ενημερώθηκε με επιτυχία.`
                );
            } else {
                await createAdminUser({
                    username,
                    email,
                    password: userForm.password,
                    is_admin: userForm.is_admin,
                    is_active: userForm.is_active
                });

                setSuccessMessage(
                    `Ο χρήστης ${username} δημιουργήθηκε με επιτυχία.`
                );
            }

            setUserDialogOpen(false);
            await loadUsers({ isRefresh: true });
        } catch (error) {
            setUserDialogError(
                getErrorMessage(
                    error,
                    editingUser
                        ? "Δεν ήταν δυνατή η ενημέρωση του χρήστη."
                        : "Δεν ήταν δυνατή η δημιουργία του χρήστη."
                )
            );
        } finally {
            setUserSaving(false);
        }
    }


    function openPasswordDialog(user) {
        setPasswordUser(user);
        setNewPassword("");
        setConfirmPassword("");
        setPasswordDialogError("");
        setPasswordDialogOpen(true);
    }


    function closePasswordDialog() {
        if (!passwordSaving) {
            setPasswordDialogOpen(false);
        }
    }


    async function handlePasswordReset(event) {
        event.preventDefault();
        setPasswordDialogError("");
        setSuccessMessage("");

        if (newPassword.length < 8) {
            setPasswordDialogError(
                "Ο νέος κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordDialogError(
                "Οι δύο κωδικοί δεν είναι ίδιοι."
            );
            return;
        }

        setPasswordSaving(true);

        try {
            await resetAdminUserPassword(
                passwordUser.id,
                newPassword
            );

            setPasswordDialogOpen(false);
            setSuccessMessage(
                `Ο κωδικός του χρήστη ${passwordUser.username} άλλαξε με επιτυχία.`
            );
        } catch (error) {
            setPasswordDialogError(
                getErrorMessage(
                    error,
                    "Δεν ήταν δυνατή η αλλαγή του κωδικού."
                )
            );
        } finally {
            setPasswordSaving(false);
        }
    }


    function openDeleteDialog(user) {
        setDeleteUserTarget(user);
        setDeleteDialogError("");
        setDeleteDialogOpen(true);
    }


    function closeDeleteDialog() {
        if (!deleteSaving) {
            setDeleteDialogOpen(false);
        }
    }


    async function handleDeleteUser() {
        if (!deleteUserTarget) {
            return;
        }

        setDeleteSaving(true);
        setDeleteDialogError("");
        setSuccessMessage("");

        try {
            await deleteAdminUser(deleteUserTarget.id);

            setDeleteDialogOpen(false);
            setSuccessMessage(
                `Ο χρήστης ${deleteUserTarget.username} διαγράφηκε με επιτυχία.`
            );
            await loadUsers({ isRefresh: true });
        } catch (error) {
            setDeleteDialogError(
                getErrorMessage(
                    error,
                    "Δεν ήταν δυνατή η διαγραφή του χρήστη."
                )
            );
        } finally {
            setDeleteSaving(false);
        }
    }


    return (
        <Box>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                mb={3}
                sx={{
                    justifyContent: "space-between",
                    alignItems: {
                        xs: "stretch",
                        sm: "center"
                    }
                }}
            >
                <Box>
                    <Typography variant="h4">
                        User Management
                    </Typography>

                    <Typography color="text.secondary" mt={0.5}>
                        Διαχείριση χρηστών, ρόλων και πρόσβασης.
                    </Typography>
                </Box>

                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        startIcon={
                            refreshing
                                ? <CircularProgress size={18} />
                                : <RefreshIcon />
                        }
                        onClick={() => loadUsers({ isRefresh: true })}
                        disabled={refreshing}
                    >
                        Ανανέωση
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={openCreateDialog}
                    >
                        Νέος χρήστης
                    </Button>
                </Stack>
            </Stack>

            {pageError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {pageError}
                </Alert>
            )}

            {successMessage && (
                <Alert
                    severity="success"
                    sx={{ mb: 2 }}
                    onClose={() => setSuccessMessage("")}
                >
                    {successMessage}
                </Alert>
            )}

            <Paper variant="outlined">
                {loading ? (
                    <Stack
                        spacing={2}
                        sx={{
                            minHeight: 280,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <CircularProgress />
                        <Typography color="text.secondary">
                            Φόρτωση χρηστών...
                        </Typography>
                    </Stack>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Χρήστης</TableCell>
                                    <TableCell>Ρόλος</TableCell>
                                    <TableCell>Κατάσταση</TableCell>
                                    <TableCell align="right">
                                        MT5 Accounts
                                    </TableCell>
                                    <TableCell align="right">
                                        Trades
                                    </TableCell>
                                    <TableCell>
                                        Τελευταία σύνδεση
                                    </TableCell>
                                    <TableCell align="right">
                                        Ενέργειες
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {users.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            <Typography
                                                color="text.secondary"
                                                sx={{ py: 4 }}
                                            >
                                                Δεν υπάρχουν χρήστες.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.map((user) => {
                                        const deleteAllowed =
                                            canDeleteUser(user, currentUser);

                                        const deleteTooltip =
                                            user.id === currentUser?.id
                                                ? "Δεν μπορείς να διαγράψεις τον λογαριασμό σου"
                                                : deleteAllowed
                                                    ? "Διαγραφή χρήστη"
                                                    : "Ο χρήστης έχει trading δεδομένα. Απενεργοποίησέ τον αντί να τον διαγράψεις.";

                                        return (
                                            <TableRow
                                                key={user.id}
                                                hover
                                                sx={{
                                                    opacity: user.is_active
                                                        ? 1
                                                        : 0.65
                                                }}
                                            >
                                                <TableCell>
                                                    <Stack spacing={0.25}>
                                                        <Typography fontWeight={600}>
                                                            {user.username}
                                                            {user.id === currentUser?.id
                                                                ? " (εσύ)"
                                                                : ""}
                                                        </Typography>

                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            {user.email}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell>
                                                    <Chip
                                                        label={
                                                            user.is_admin
                                                                ? "Administrator"
                                                                : "User"
                                                        }
                                                        color={
                                                            user.is_admin
                                                                ? "primary"
                                                                : "default"
                                                        }
                                                        size="small"
                                                        variant={
                                                            user.is_admin
                                                                ? "filled"
                                                                : "outlined"
                                                        }
                                                    />
                                                </TableCell>

                                                <TableCell>
                                                    <Chip
                                                        label={
                                                            user.is_active
                                                                ? "Active"
                                                                : "Inactive"
                                                        }
                                                        color={
                                                            user.is_active
                                                                ? "success"
                                                                : "default"
                                                        }
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>

                                                <TableCell align="right">
                                                    {user.mt5_accounts_count}
                                                </TableCell>

                                                <TableCell align="right">
                                                    {user.trades_count}
                                                </TableCell>

                                                <TableCell>
                                                    {formatDate(user.last_login_at)}
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Tooltip title="Επεξεργασία">
                                                        <IconButton
                                                            onClick={() =>
                                                                openEditDialog(user)
                                                            }
                                                            size="small"
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title="Reset password">
                                                        <IconButton
                                                            onClick={() =>
                                                                openPasswordDialog(user)
                                                            }
                                                            size="small"
                                                        >
                                                            <LockResetIcon />
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title={deleteTooltip}>
                                                        <span>
                                                            <IconButton
                                                                onClick={() =>
                                                                    openDeleteDialog(user)
                                                                }
                                                                size="small"
                                                                color="error"
                                                                disabled={!deleteAllowed}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </span>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>

            <Dialog
                open={userDialogOpen}
                onClose={closeUserDialog}
                fullWidth
                maxWidth="sm"
            >
                <Box
                    component="form"
                    onSubmit={handleUserSubmit}
                >
                    <DialogTitle>
                        {editingUser
                            ? "Επεξεργασία χρήστη"
                            : "Δημιουργία χρήστη"}
                    </DialogTitle>

                    <DialogContent>
                        <Stack spacing={2} mt={1}>
                            {userDialogError && (
                                <Alert severity="error">
                                    {userDialogError}
                                </Alert>
                            )}

                            <TextField
                                label="Username"
                                name="username"
                                value={userForm.username}
                                onChange={handleUserFormChange}
                                required
                                fullWidth
                                autoFocus
                            />

                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={userForm.email}
                                onChange={handleUserFormChange}
                                required
                                fullWidth
                            />

                            {!editingUser && (
                                <PasswordField
                                    label="Password"
                                    name="password"
                                    value={userForm.password}
                                    onChange={handleUserFormChange}
                                    autoComplete="new-password"
                                    required
                                    slotProps={{
                                        htmlInput: {
                                            minLength: 8
                                        }
                                    }}
                                />
                            )}

                            <FormControlLabel
                                control={
                                    <Switch
                                        name="is_admin"
                                        checked={userForm.is_admin}
                                        onChange={handleUserFormChange}
                                    />
                                }
                                label="Administrator"
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        name="is_active"
                                        checked={userForm.is_active}
                                        onChange={handleUserFormChange}
                                    />
                                }
                                label="Active account"
                            />

                            {editingUser?.id === currentUser?.id && (
                                <Alert severity="info">
                                    Δεν μπορείς να αφαιρέσεις το δικό σου
                                    admin access ή να απενεργοποιήσεις τον
                                    λογαριασμό σου.
                                </Alert>
                            )}
                        </Stack>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            onClick={closeUserDialog}
                            disabled={userSaving}
                        >
                            Ακύρωση
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={userSaving}
                        >
                            {userSaving
                                ? "Αποθήκευση..."
                                : "Αποθήκευση"}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>

            <Dialog
                open={passwordDialogOpen}
                onClose={closePasswordDialog}
                fullWidth
                maxWidth="sm"
            >
                <Box
                    component="form"
                    onSubmit={handlePasswordReset}
                >
                    <DialogTitle>
                        Reset password
                    </DialogTitle>

                    <DialogContent>
                        <Stack spacing={2} mt={1}>
                            <Typography color="text.secondary">
                                Χρήστης:{" "}
                                <strong>{passwordUser?.username}</strong>
                            </Typography>

                            {passwordDialogError && (
                                <Alert severity="error">
                                    {passwordDialogError}
                                </Alert>
                            )}

                            <PasswordField
                                label="Νέος κωδικός"
                                value={newPassword}
                                onChange={(event) =>
                                    setNewPassword(event.target.value)
                                }
                                autoComplete="new-password"
                                required
                                slotProps={{
                                    htmlInput: {
                                        minLength: 8
                                    }
                                }}
                            />

                            <PasswordField
                                label="Επιβεβαίωση νέου κωδικού"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(event.target.value)
                                }
                                autoComplete="new-password"
                                required
                                slotProps={{
                                    htmlInput: {
                                        minLength: 8
                                    }
                                }}
                            />
                        </Stack>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            onClick={closePasswordDialog}
                            disabled={passwordSaving}
                        >
                            Ακύρωση
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={passwordSaving}
                        >
                            {passwordSaving
                                ? "Αλλαγή..."
                                : "Αλλαγή κωδικού"}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>

            <Dialog
                open={deleteDialogOpen}
                onClose={closeDeleteDialog}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Διαγραφή χρήστη
                </DialogTitle>

                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        {deleteDialogError && (
                            <Alert severity="error">
                                {deleteDialogError}
                            </Alert>
                        )}

                        <Alert severity="warning">
                            Η διαγραφή είναι μόνιμη και δεν μπορεί να αναιρεθεί.
                        </Alert>

                        <Typography>
                            Θέλεις να διαγράψεις οριστικά τον χρήστη{" "}
                            <strong>{deleteUserTarget?.username}</strong>;
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Η ενέργεια επιτρέπεται μόνο όταν ο χρήστης δεν έχει
                            MT5 accounts ή trades.
                        </Typography>
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={closeDeleteDialog}
                        disabled={deleteSaving}
                    >
                        Ακύρωση
                    </Button>

                    <Button
                        onClick={handleDeleteUser}
                        variant="contained"
                        color="error"
                        disabled={deleteSaving}
                    >
                        {deleteSaving
                            ? "Διαγραφή..."
                            : "Οριστική διαγραφή"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
