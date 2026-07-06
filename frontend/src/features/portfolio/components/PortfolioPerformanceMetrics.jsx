import { WidgetMetrics } from "../../../components/widgets";

export default function PortfolioPerformanceMetrics({ performance }) {
    const metrics = [
        {
            title: "Profit Factor",
            value: performance.profit_factor,
            helperText: "Gross profit / gross loss",
            status: performance.profit_factor >= 1 ? "success" : "warning"
        },
        {
            title: "Average Win",
            value: `$${performance.average_win}`,
            helperText: "Average profitable trade",
            status: "success"
        },
        {
            title: "Average Loss",
            value: `$${performance.average_loss}`,
            helperText: "Average losing trade",
            status: "error"
        },
        {
            title: "Average RR",
            value: performance.average_rr,
            helperText: "Average risk / reward",
            status: performance.average_rr >= 1 ? "success" : "warning"
        }
    ];

    return <WidgetMetrics metrics={metrics} mt={2} />;
}