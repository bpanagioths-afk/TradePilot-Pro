import { useEffect, useState } from "react";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Snackbar,
    Stack,
    TextField,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import MT5AccountCard from "./MT5AccountCard";
import SectionHeader from "../../common/SectionHeader";

import {
    createMT5Account,
    disableMT5Account,
    getMT5Accounts,
    getMT5AccountSummary,
    updateMT5Account,
    syncMT5Account,
} from "../../../api/mt5AccountsApi";

const emptyAccount = {
    user_id: 2,
    account_name: "",
    broker: "",
    login: "",
    server: "",
};

export default function MT5AccountsManager() {
    const [accounts, setAccounts] = useState([]);
    const [accountSummaries, setAccountSummaries] = useState({});
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [newAccount, setNewAccount] = useState(emptyAccount);
    const [editingAccount, setEditingAccount] = useState(null);
    const [syncingAccountId, setSyncingAccountId] = useState(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [menuAccount, setMenuAccount] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    useEffect(() => {
        loadAccounts();
    }, []);

const loadAccounts = async () => {
    try {
        const data = await getMT5Accounts();

        const sortedAccounts = [...data].sort((a, b) => a.id - b.id);

        setAccounts(sortedAccounts);

        const summaries = {};

        await Promise.all(
            sortedAccounts.map(async (account) => {
                try {
                    summaries[account.id] = await getMT5AccountSummary(account.id);
                } catch (error) {
                    console.error(
                        `Failed to load MT5 summary for account ${account.id}`,
                        error
                    );

                    summaries[account.id] = null;
                }
            })
        );

        setAccountSummaries(summaries);
    } catch (error) {
        console.error("Failed to load MT5 accounts", error);
    }
};

const handleOpenMenu = (event, account) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuAccount(account);
};

const handleCloseMenu = () => {
    setMenuAnchorEl(null);
    setMenuAccount(null);
};

    const handleNewAccountChange = (event) => {
        const { name, value } = event.target;
        setNewAccount((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditingAccountChange = (event) => {
        const { name, value } = event.target;
        setEditingAccount((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateAccount = async () => {
        try {
            await createMT5Account(newAccount);
            setSnackbar({
                open: true,
                message: "MT5 account created successfully",
                severity: "success",
            });
            setAddDialogOpen(false);
            setNewAccount(emptyAccount);
            loadAccounts();
        } catch (error) {
            console.error("Failed to create MT5 account", error);
            setSnackbar({
                open: true,
                message: "Failed to create MT5 account",
                severity: "error",
            });
        }
    };

    const handleEditClick = (account) => {
        setEditingAccount({ ...account });
        setEditDialogOpen(true);
    };

    const handleUpdateAccount = async () => {
        try {
            await updateMT5Account(editingAccount.id, {
                user_id: editingAccount.user_id,
                account_name: editingAccount.account_name,
                broker: editingAccount.broker,
                login: editingAccount.login,
                server: editingAccount.server,
                is_active: editingAccount.is_active,
            });

            setSnackbar({
                open: true,
                message: "MT5 account updated successfully",
                severity: "success",
            });

            setEditDialogOpen(false);
            setEditingAccount(null);
            loadAccounts();
        } catch (error) {
            console.error("Failed to update MT5 account", error);
            setSnackbar({
                open: true,
                message: "Failed to update MT5 account",
                severity: "error",
            });
        }
    };

const handleActivateAccount = async (account) => {
    try {
        await updateMT5Account(account.id, {
            user_id: account.user_id,
            account_name: account.account_name,
            broker: account.broker,
            login: account.login,
            server: account.server,
            is_active: true,
        });

        setSnackbar({
            open: true,
            message: "MT5 account activated successfully",
            severity: "success",
        });

        loadAccounts();
    } catch (error) {
        console.error("Failed to activate MT5 account", error);

        setSnackbar({
            open: true,
            message: "Failed to activate MT5 account",
            severity: "error",
        });
    }
};

const handleSyncAccount = async (accountId) => {
    try {
        setSyncingAccountId(accountId);

        const result = await syncMT5Account(accountId);

        console.log("MT5 sync result:", result);
        
        setSnackbar({
            open: true,
            message: result?.message || "MT5 account synced successfully",
            severity: "success",
        });

        loadAccounts();
    } catch (error) {
        console.error("Failed to sync MT5 account", error);

        setSnackbar({
            open: true,
            message: "Failed to sync MT5 account",
            severity: "error",
        });
    } finally {
        setSyncingAccountId(null);
    }
};
    const handleDisableAccount = async (accountId) => {
        try {
            await disableMT5Account(accountId);
            setSnackbar({
                open: true,
                message: "MT5 account disabled successfully",
                severity: "success",
            });
            loadAccounts();
        } catch (error) {
            console.error("Failed to disable MT5 account", error);
            setSnackbar({
                open: true,
                message: "Failed to disable MT5 account",
                severity: "error",
            });
        }
    };

    return (
        <Paper sx={{ p: 3, mb: 3 }}>
<SectionHeader
    title="MT5 Accounts"
    subtitle={`${accounts.length} account${accounts.length !== 1 ? "s" : ""}`}
    action={
        <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => setAddDialogOpen(true)}
        >
            Add Account
        </Button>
    }
/>
            <Stack spacing={1}>
              {accounts.map((account) => (
                  <MT5AccountCard
                      key={account.id}
                      summary={accountSummaries[account.id]}
                      account={account}
                      onEdit={handleEditClick}
                      onDisable={handleDisableAccount}
                      onActivate={handleActivateAccount}
                      onSync={handleSyncAccount}
                      syncingAccountId={syncingAccountId}
                      menuAnchorEl={menuAnchorEl}
                      menuAccount={menuAccount}
                      onOpenMenu={handleOpenMenu}
                      onCloseMenu={handleCloseMenu}
                  />
              ))}           
            </Stack>

            <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Add MT5 Account</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField label="Account Name" name="account_name" value={newAccount.account_name} onChange={handleNewAccountChange} fullWidth />
                        <TextField label="Broker" name="broker" value={newAccount.broker} onChange={handleNewAccountChange} fullWidth />
                        <TextField label="Login" name="login" value={newAccount.login} onChange={handleNewAccountChange} fullWidth />
                        <TextField label="Server" name="server" value={newAccount.server} onChange={handleNewAccountChange} fullWidth />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleCreateAccount}>Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Edit MT5 Account</DialogTitle>
                <DialogContent>
                    {editingAccount && (
                        <Stack spacing={2} mt={1}>
                            <TextField label="Account Name" name="account_name" value={editingAccount.account_name} onChange={handleEditingAccountChange} fullWidth />
                            <TextField label="Broker" name="broker" value={editingAccount.broker} onChange={handleEditingAccountChange} fullWidth />
                            <TextField label="Login" name="login" value={editingAccount.login} onChange={handleEditingAccountChange} fullWidth />
                            <TextField label="Server" name="server" value={editingAccount.server} onChange={handleEditingAccountChange} fullWidth />
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleUpdateAccount}>Save Changes</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            >
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </Paper>
    );
}