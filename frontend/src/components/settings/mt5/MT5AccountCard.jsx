import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Typography,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import SyncIcon from "@mui/icons-material/Sync";

import TradePilotCard from "../../common/TradePilotCard";
import StatusBadge from "../../common/StatusBadge";
import InfoRow from "../../common/InfoRow";
import TradePilotButton from "../../common/TradePilotButton";

export default function MT5AccountCard({
    account,
    syncingAccountId,
    menuAnchorEl,
    menuAccount,
    onOpenMenu,
    onCloseMenu,
    onEdit,
    onDisable,
    onActivate,
    onSync,
}) {
    const isSyncing = syncingAccountId === account.id;

    return (
        <TradePilotCard>
            <Stack spacing={2}>
<Stack
    direction="row"
    sx={{
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 2,
    }}
>                    <Box sx={{ minWidth: 0 }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 700,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {account.account_name}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            MT5 Trading Account
                        </Typography>
                    </Box>

                    <StatusBadge
                        label={account.is_active ? "Active" : "Disabled"}
                        status={account.is_active ? "active" : "disabled"}
                    />
                </Stack>

                <Box>
                    <InfoRow label="Broker" value={account.broker} />
                    <InfoRow label="Server" value={account.server} />
                    <InfoRow label="Login" value={account.login} />
                    <InfoRow label="Last Sync" value={account.last_sync || "Never"} />
                </Box>
<Stack
    direction="row"
    sx={{
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1,
    }}
>
<TradePilotButton
    startIcon={<SyncIcon />}
    loading={isSyncing}
    disabled={!account.is_active}
    onClick={() => onSync(account.id)}
>
    Sync
</TradePilotButton>

                    <IconButton
                        size="small"
                        onClick={(event) => onOpenMenu(event, account)}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </Stack>
            </Stack>

            <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl) && menuAccount?.id === account.id}
                onClose={onCloseMenu}
            >
                <MenuItem onClick={() => onEdit(account)}>
                    Edit
                </MenuItem>

                {account.is_active ? (
                    <MenuItem onClick={() => onDisable(account.id)}>
                        Disable
                    </MenuItem>
                ) : (
                    <MenuItem onClick={() => onActivate(account)}>
                        Activate
                    </MenuItem>
                )}
            </Menu>
        </TradePilotCard>
    );
}