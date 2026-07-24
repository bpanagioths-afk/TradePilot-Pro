import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Divider,
    Box
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SettingsIcon from "@mui/icons-material/Settings";
import AssessmentIcon from "@mui/icons-material/Assessment";
import StorageIcon from "@mui/icons-material/Storage";
import RuleIcon from "@mui/icons-material/Rule";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import { getStoredUser } from "../services/authService";

const drawerWidth = 240;

const menuGroups = [
    {
        title: "HOME",
        items: [
            { text: "Home", icon: <HomeIcon />, path: "/home" }
        ]
    },
    {
        title: "OVERVIEW",
        items: [
            { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" }
        ]
    },
    {
        title: "TRADING",
        items: [
            { text: "Trades", icon: <CandlestickChartIcon />, path: "/trades" },
            { text: "Portfolio", icon: <AccountBalanceWalletIcon />, path: "/portfolio" },
            { text: "Analytics", icon: <AnalyticsIcon />, path: "/analytics" }
        ]
    },
    {
        title: "PERFORMANCE",
        items: [
            { text: "Psychology", icon: <PsychologyIcon />, path: "/psychology" },
            { text: "Reports", icon: <AssessmentIcon />, path: "/reports" }
        ]
    },
    {
        title: "PLATFORMS",
        items: [
            { text: "MT5", icon: <StorageIcon />, path: "/mt5" }
        ]
    },
    {
        title: "SYSTEM",
        items: [
            { text: "Trading Plan", icon: <RuleIcon />, path: "/trading-plan" },
            { text: "Settings", icon: <SettingsIcon />, path: "/settings" }
        ]
    }
];

const adminMenuGroup = {
    title: "ADMIN",
    items: [
        {
            text: "User Management",
            icon: <ManageAccountsIcon />,
            path: "/admin/users"
        }
    ]
};

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = getStoredUser();

    const visibleMenuGroups = currentUser?.is_admin
        ? [...menuGroups, adminMenuGroup]
        : menuGroups;

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box"
                }
            }}
        >
            <Toolbar>
                <Typography variant="h6" fontWeight="bold">
                    TradePilot Pro
                </Typography>
            </Toolbar>

            <Divider />

            <List sx={{ py: 1 }}>
                {visibleMenuGroups.map((group) => (
                    <Box key={group.title} sx={{ mb: 1 }}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                display: "block",
                                px: 2,
                                py: 0.75,
                                fontWeight: 700,
                                letterSpacing: 0.8
                            }}
                        >
                            {group.title}
                        </Typography>

                        {group.items.map((item) => (
                            <ListItemButton
                                key={item.text}
                                selected={location.pathname === item.path}
                                onClick={() => navigate(item.path)}
                                sx={{
                                    mx: 1,
                                    borderRadius: 1.5,
                                    minHeight: 40
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 38 }}>
                                    {item.icon}
                                </ListItemIcon>

                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        ))}
                    </Box>
                ))}
            </List>

            <Box sx={{ flexGrow: 1 }} />

            <Divider />

            <Box sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    Version 1.0
                </Typography>
            </Box>
        </Drawer>
    );
}
