import {
    Box,
    Chip,
    Divider,
    Grid,
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
import MetricCard from "../../common/MetricCard";

const formatMoney = (value) => {
    if (value === null || value === undefined) {
        return "—";
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
    }).format(value);
};

const formatNumber = (value) => {
    if (value === null || value === undefined) {
        return "—";
    }

    return new Intl.NumberFormat("en-US").format(value);
};

const formatRelativeTime = (dateValue) => {
    if (!dateValue) {
        return "Never";
    }

    const date = new Date(dateValue);
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (Number.isNaN(date.getTime())) {
        return "Never";
    }

    if (diffMinutes < 1) {
        return "Just now";
    }

    if (diffMinutes < 60) {
        return `${diffMinutes} min ago`;
    }

    if (diffHours < 24) {
        return `${diffHours} hours ago`;
    }

    return `${diffDays} days ago`;
};

const getConnectionStatus = (summary) => {
    if (!summary) {
        return {
            label: "Loading",
            status: "warning",
        };
    }

    if (summary.connection_status === "connected") {
        return {
            label: "Connected",
            status: "active",
        };
    }

    if (summary.connection_status === "disconnected") {
        return {
            label: "Disconnected",
            status: "warning",
        };
    }

    return {
        label: "Disabled",
        status: "disabled",
    };
};

const getFloatingColor = (value) => {
    if (value > 0) {
        return "success.main";
    }

    if (value < 0) {
        return "error.main";
    }

    return "text.primary";
};

export default function MT5AccountCard({
    account,
    summary,
    syncingAccountId,
    menuAnchorEl,
    menuAccount,
    onOpenMenu,
    onCloseMenu,
    onEdit,
    onDelete,
    onActivate,
    onSync,
}) {
    const isSyncing = syncingAccountId === account.id;
    const connection = getConnectionStatus(summary);
    const floatingProfitLoss = summary?.floating_profit_loss;

    return (
        <TradePilotCard>
            <Stack spacing={2.5}>
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 2,
                    }}
                >
                    <Box sx={{ minWidth: 0 }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 800,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {account.account_name}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Professional MT5 Trading Widget
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <StatusBadge label={connection.label} status={connection.status} />

                        <IconButton
                            size="small"
                            onClick={(event) => onOpenMenu(event, account)}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </Stack>
                </Stack>

                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
                    <StatusBadge
                        label={account.is_active ? "Active" : "Disabled"}
                        status={account.is_active ? "active" : "disabled"}
                    />

                    <Chip size="small" label="MT5" variant="outlined" />
                    <Chip size="small" label="Trading Account" variant="outlined" />
                </Stack>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <MetricCard
                            label="Balance"
                            value={formatMoney(summary?.balance)}
                            helper="Account balance"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <MetricCard
                            label="Equity"
                            value={formatMoney(summary?.equity)}
                            helper="Live equity"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <MetricCard
                            label="Floating P/L"
                            value={formatMoney(floatingProfitLoss)}
                            helper="Open trades result"
                            valueColor={getFloatingColor(floatingProfitLoss)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <MetricCard
                            label="Open Positions"
                            value={formatNumber(summary?.open_positions)}
                            helper="Live MT5 positions"
                        />
                    </Grid>
                </Grid>

                <Divider />

                <Box>
                    <InfoRow label="Broker" value={account.broker} />
                    <InfoRow label="Server" value={account.server} />
                    <InfoRow label="Login" value={account.login} />
                    <InfoRow
                        label="Imported Trades"
                        value={summary?.imported_trades_count ?? "Loading..."}
                    />
                    <InfoRow
                        label="Last Sync"
                        value={formatRelativeTime(account.last_sync)}
                    />
                    <InfoRow
                        label="Health"
                        value={summary?.health_message || "Loading summary..."}
                    />
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
                        Sync Now
                    </TradePilotButton>

                    <Typography variant="caption" color="text.secondary">
                        Auto Sync:{" "}
                        {account.auto_sync
                            ? `Every ${account.sync_interval_minutes} min`
                            : "Off"}
                    </Typography>
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

                {!account.is_active && (
                    <MenuItem onClick={() => onActivate(account)}>
                        Activate
                    </MenuItem>
                )}

                <Divider />

                <MenuItem
                    onClick={() => onDelete(account)}
                    sx={{ color: "error.main" }}
                >
                    Delete
                </MenuItem>
            </Menu>
        </TradePilotCard>
    );
}