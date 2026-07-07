import {
    WidgetContainer,
    WidgetHeader,
    WidgetMetrics
} from "../../../components/widgets";

export default function PortfolioStatisticsCard({ statistics, performance, risk }) {
    const performanceData = performance || statistics || {};
    const riskData = risk || {};

    const totalProfit = performanceData.total_profit ?? performanceData.gross_profit ?? 0;
    const totalLoss = performanceData.total_loss ?? performanceData.gross_loss ?? 0;
    const netProfit = performanceData.net_profit ?? 0;
    const averageWin = riskData.average_win ?? 0;
    const averageLoss = riskData.average_loss ?? 0;
    const averagePips = riskData.average_pips ?? performanceData.average_pips_per_trade ?? 0;

    const metrics = [
        {
            title: "Total Profit",
            value: `$${Number(totalProfit).toFixed(2)}`,
            helperText: "Total profitable trades",
            status: "success"
        },
        {
            title: "Total Loss",
            value: `$${Number(totalLoss).toFixed(2)}`,
            helperText: "Total losing trades",
            status: "error"
        },
        {
            title: "Net Profit",
            value: `$${Number(netProfit).toFixed(2)}`,
            helperText: "Overall portfolio result",
            status: Number(netProfit) >= 0 ? "success" : "error"
        },
        {
            title: "Avg Win",
            value: `$${Number(averageWin).toFixed(2)}`,
            helperText: "Average winning trade",
            status: "success"
        },
        {
            title: "Avg Loss",
            value: `$${Number(averageLoss).toFixed(2)}`,
            helperText: "Average losing trade",
            status: "warning"
        },
        {
            title: "Avg Pips",
            value: Number(averagePips).toFixed(2),
            helperText: "Average pips per trade",
            status: Number(averagePips) >= 0 ? "success" : "warning"
        }
    ];

    return (
        <WidgetContainer>
            <WidgetHeader
                title="Portfolio Statistics"
                subtitle="Profit and trade efficiency"
            />

            <WidgetMetrics metrics={metrics} />
        </WidgetContainer>
    );
}
