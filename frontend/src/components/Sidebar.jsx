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

const drawerWidth = 240;

const menu = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Trades", icon: <CandlestickChartIcon />, path: "/trades" },
    { text: "Analytics", icon: <AnalyticsIcon />, path: "/analytics" },
    { text: "Psychology", icon: <PsychologyIcon />, path: "/psychology" },
    { text: "Reports", icon: <AssessmentIcon />, path: "/reports" },
    { text: "MT5", icon: <StorageIcon />, path: "/mt5" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" }
];

export default function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

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
                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    Trading Journal
                </Typography>
            </Toolbar>

            <Divider />

            <List>
                {menu.map((item) => (
                    <ListItemButton
                        key={item.text}
                        selected={location.pathname === item.path}
                        onClick={() => navigate(item.path)}
                    >
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>

                        <ListItemText
                            primary={item.text}
                        />
                    </ListItemButton>
                ))}
            </List>

            <Box sx={{ flexGrow: 1 }} />

            <Divider />

            <Box sx={{ p: 2 }}>
                <Typography
                    variant="body2"
                    color="gray"
                >
                    Version 1.0
                </Typography>
            </Box>
        </Drawer>
    );
}