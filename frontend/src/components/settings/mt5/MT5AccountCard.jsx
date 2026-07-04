import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Chip,
    Paper,
    Stack,
    Typography,
    CircularProgress,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SyncIcon from "@mui/icons-material/Sync";

import { useState } from "react";

export default function MT5AccountCard({
    account,
    onEdit,
    onDisable,
    onActivate,
    onSync,
    syncingAccountId,
}) {

const [menuAnchor, setMenuAnchor] = useState(null);
const menuOpen = Boolean(menuAnchor);

const handleOpenMenu = (event) => {
    setMenuAnchor(event.currentTarget);
};

const handleCloseMenu = () => {
    setMenuAnchor(null);
};

const handleMenuAction = (action) => {
    handleCloseMenu();

    setTimeout(() => {
        action();
    }, 150);
};

    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2,
                borderRadius: 3,
                transition: "0.2s",
                "&:hover": {
                    boxShadow: 3,
                },
            }}
        >
            <Stack
                direction="row"
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box>
                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        {account.account_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {account.broker} • {account.server}
                    </Typography>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                    >
                        Login: {account.login}
                    </Typography>

                    <Typography
                        variant="caption" 
                        color="text.secondary"
                        display="block"
                    >
                        Last Sync:{" "}
                        {account.last_sync
                            ? new Date(account.last_sync).toLocaleString()
                            : "Never"}
                    </Typography>

                </Box>

<Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
<Button
    size="small"
    variant="contained"
    startIcon={
        syncingAccountId === account.id ? (
            <CircularProgress size={16} />
        ) : (
            <SyncIcon />
        )
    }
    disabled={!account.is_active || syncingAccountId === account.id}
    onClick={() => onSync(account.id)}
>
    {syncingAccountId === account.id ? "Syncing..." : "Sync"}
</Button>
    <Chip
        label={account.is_active ? "Active" : "Disabled"}
        color={account.is_active ? "success" : "default"}
        size="small"
    />

    <IconButton size="small" onClick={handleOpenMenu}>
        <MoreVertIcon />
    </IconButton>

    <Menu
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={handleCloseMenu}
        disablePortal
    >
        <MenuItem onClick={() => handleMenuAction(() => onEdit(account))}>
            <ListItemIcon>
                <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
        </MenuItem>

        {account.is_active && (
            <MenuItem onClick={() => handleMenuAction(() => onDisable(account.id))}>
                <ListItemIcon>
                    <BlockIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Disable</ListItemText>
            </MenuItem>
        )}

        {!account.is_active && (
            <MenuItem onClick={() => handleMenuAction(() => onActivate(account))}>
                <ListItemIcon>
                    <CheckCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Activate</ListItemText>
            </MenuItem>
        )}
    </Menu>
</Stack>
            </Stack>
        </Paper>
    );
}