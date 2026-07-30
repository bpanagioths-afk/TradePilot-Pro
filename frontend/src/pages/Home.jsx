import {
    Box,
    Typography,
    Paper,
    Stack,
    Chip,
    Button
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import TodayMission from "../components/home/TodayMission";
import TradingSessions from "../components/home/TradingSessions";
import MarketAlerts from "../components/home/MarketAlerts";

export default function Home() {
    const navigate = useNavigate();

    return (
        <Box>
            <Typography variant="h4" mb={1}>
                Welcome to TradePilot Pro
            </Typography>

            <Typography color="text.secondary" mb={3}>
                Professional trading platform for MT5 sync, portfolio tracking,
                analytics and trading discipline.
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "minmax(0, 1fr) minmax(0, 1fr)"
                    },
                    gap: 3,
                    alignItems: "stretch"
                }}
            >
<Stack
    spacing={3}
    sx={{
        minWidth: 0,
        justifyContent: "space-between",
        height: "100%"
    }}
                >

                    <Box
                        sx={{
                            minWidth: 0,
                            maxHeight: {
                                xs: "none",
                                lg: 460
                            },
                            overflowY: "auto",
                            overflowX: "hidden",
                            borderRadius: 1,
                            "& > *": {
                                width: "100%"
                            }
                        }}
                    >
                        <TradingSessions />
                    </Box>

                    <Box
                        sx={{
                            minWidth: 0,
                            maxHeight: {
                                xs: "none",
                                lg: 540
                            },
                            overflowY: "auto",
                            overflowX: "hidden",
                            borderRadius: 1,
                            "& > *": {
                                width: "100%"
                            }
                        }}
                    >
                        <TodayMission />
                    </Box>
                </Stack>

                <Box
                   sx={{
                      minWidth: 0,
                      height: {
                          xs: "auto",
                          lg: 0
                      },
                      minHeight: {
                         xs: "auto",
                         lg: "100%"
                      },
                      overflow: "hidden",
                      borderRadius: 1,
                      "& > *": {
                          width: "100%",
                          height: {
                             xs: "auto",
                             lg: "100%"
                          },
                          minHeight: 0
                      }
                   }}
                >
                   <MarketAlerts />
                </Box>
            </Box>
        </Box>
    );
}