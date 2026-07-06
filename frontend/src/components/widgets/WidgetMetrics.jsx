import WidgetMetric from "./WidgetMetric";
import WidgetMetricGrid from "./WidgetMetricGrid";

export default function WidgetMetrics({
    metrics = [],
    columns = 2,
    gap = 2,
    mt = 0
}) {
    return (
        <WidgetMetricGrid columns={columns} gap={gap} mt={mt}>
            {metrics.map((metric) => (
                <WidgetMetric
                    key={metric.title}
                    title={metric.title}
                    value={metric.value}
                    helperText={metric.helperText}
                    status={metric.status}
                />
            ))}
        </WidgetMetricGrid>
    );
}