import { WidgetMetrics } from "../../../components/widgets";

export default function PortfolioSummaryMetrics({ summary }) {
    const metrics = [
        {
            title: "Accounts",
            value: summary.total_accounts,
            helperText: `${summary.active_accounts} active / ${summary.disabled_accounts} disabled`,
            status: "info"
        },
        {
            title: "Trades",
            value: summary.total_trades,
            helperText: `${summary.winning_trades} wins / ${summary.losing_trades} losses`
        },
        {
            title: "Win Rate",
            value: `${summary.win_rate}%`,
            helperText: "Execution result",
            status: summary.win_rate >= 50 ? "success" : "warning"
        },
        {
            title: "Net Profit",
            value: `$${summary.total_profit}`,
            helperText: `${summary.total_pips} pips`,
            status: summary.total_profit >= 0 ? "success" : "error"
        }
    ];

    return <WidgetMetrics metrics={metrics} />;
}