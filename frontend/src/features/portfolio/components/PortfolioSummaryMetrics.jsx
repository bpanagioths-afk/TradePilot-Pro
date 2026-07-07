import { WidgetMetrics } from "../../../components/widgets";

export default function PortfolioSummaryMetrics({ summary }) {
    const metrics = [
        {
            title: "Total Trades",
            value: summary?.total_trades ?? 0,
            helperText: "Total closed trades",
            status: "info"
        },
        {
            title: "Winning Trades",
            value: summary?.winning_trades ?? 0,
            helperText: "Profitable trades",
            status: "success"
        },
        {
            title: "Losing Trades",
            value: summary?.losing_trades ?? 0,
            helperText: "Losing trades",
            status: "error"
        },
        {
            title: "Win Rate",
            value: `${summary?.win_rate ?? 0}%`,
            helperText: "Winning trades percentage",
            status: (summary?.win_rate ?? 0) >= 50 ? "success" : "warning"
        }
    ];

    return <WidgetMetrics metrics={metrics} />;
}
