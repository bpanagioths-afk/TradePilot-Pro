import {
    WidgetContainer,
    WidgetHeader,
    WidgetMetrics
} from "../../../components/widgets";

export default function PortfolioStatisticsCard({ statistics }) {
    const metrics = [
        {
            title: "Gross Profit",
            value: `$${statistics.gross_profit}`,
            helperText: "Total profitable trades",
            status: "success"
        },
        {
            title: "Gross Loss",
            value: `$${statistics.gross_loss}`,
            helperText: "Total losing trades",
            status: "error"
        },
        {
            title: "Net Profit",
            value: `$${statistics.net_profit}`,
            helperText: "Overall portfolio result",
            status: statistics.net_profit >= 0 ? "success" : "error"
        },
        {
            title: "Avg / Trade",
            value: `$${statistics.average_profit_per_trade}`,
            helperText: "Average profit per trade",
            status: statistics.average_profit_per_trade >= 0 ? "success" : "warning"
        },
        {
            title: "Avg Pips",
            value: statistics.average_pips_per_trade,
            helperText: "Average pips per trade",
            status: statistics.average_pips_per_trade >= 0 ? "success" : "warning"
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