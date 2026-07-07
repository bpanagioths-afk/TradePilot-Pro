import { WidgetMetrics } from "../../../components/widgets";

export default function PortfolioPerformanceMetrics({ performance }) {
    if (!performance) {
        return null;
    }

    const metrics = [
        {
            title: "Profit Factor",
            value: performance.profit_factor ?? 0,
            helperText: "Gross profit / gross loss",
            status: (performance.profit_factor ?? 0) >= 1 ? "success" : "warning"
        },
        {
            title: "Total Profit",
            value: `$${(performance.total_profit ?? 0).toFixed(2)}`,
            helperText: "Gross profit",
            status: "success"
        },
        {
            title: "Total Loss",
            value: `$${(performance.total_loss ?? 0).toFixed(2)}`,
            helperText: "Gross loss",
            status: "error"
        },
        {
            title: "Net Profit",
            value: `$${(performance.net_profit ?? 0).toFixed(2)}`,
            helperText: "Net result",
            status: (performance.net_profit ?? 0) >= 0 ? "success" : "error"
        }
    ];

    return <WidgetMetrics metrics={metrics} mt={2} />;
}
