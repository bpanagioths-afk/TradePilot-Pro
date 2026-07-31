import { Box } from "@mui/material";

import WidgetGrid from "./WidgetGrid";

import MT5Widget from "./mt5";
import RiskWidget from "./risk";
import PortfolioWidget from "./portfolio";
import AICoachWidget from "./ai";
import PsychologyWidget from "./psychology";
import EconomicCalendarWidget from "./calendar";
import DashboardSummaryWidget from "./summary/DashboardSummaryWidget";


const fullHeightWidget = {
    display: "flex",
    minWidth: 0,
    "& > *": {
        width: "100%",
        height: "100%"
    }
};


function DashboardLayout({
    summary,
    equity
}) {
    return (
        <Box>
            <WidgetGrid>
                <Box
                    sx={{
                        gridColumn: {
                            xs: "span 1",
                            lg: "span 12"
                        },
                        minWidth: 0
                    }}
                >
                    <DashboardSummaryWidget
                        summary={summary}
                        equity={equity}
                    />
                </Box>

                <Box
                    sx={{
                        ...fullHeightWidget,
                        gridColumn: {
                            xs: "span 1",
                            lg: "span 8"
                        }
                    }}
                >
                    <MT5Widget />
                </Box>

                <Box
                    sx={{
                        ...fullHeightWidget,
                        gridColumn: {
                            xs: "span 1",
                            lg: "span 4"
                        }
                    }}
                >
                    <RiskWidget />
                </Box>

                <Box
                    sx={{
                        ...fullHeightWidget,
                        gridColumn: {
                            xs: "span 1",
                            lg: "span 4"
                        }
                    }}
                >
                    <PortfolioWidget />
                </Box>

                <Box
                    sx={{
                        ...fullHeightWidget,
                        gridColumn: {
                            xs: "span 1",
                            lg: "span 4"
                        }
                    }}
                >
                    <AICoachWidget />
                </Box>

                <Box
                    sx={{
                        ...fullHeightWidget,
                        gridColumn: {
                            xs: "span 1",
                            lg: "span 4"
                        }
                    }}
                >
                    <PsychologyWidget />
                </Box>

                <Box
                    sx={{
                        ...fullHeightWidget,
                        gridColumn: {
                            xs: "span 1",
                            lg: "span 12"
                        }
                    }}
                >
                    <EconomicCalendarWidget />
                </Box>
            </WidgetGrid>
        </Box>
    );
}


export default DashboardLayout;