import WidgetContainer from "../widgets/WidgetContainer";
import WidgetHeader from "../widgets/WidgetHeader";
import StatusBadge from "../common/StatusBadge";

export default function DashboardPlaceholderWidget({
    title,
    description,
    status = "Planned"
}) {
    return (
        <WidgetContainer>
            <WidgetHeader
                title={title}
                subtitle={description}
                action={
                    <StatusBadge
                        label={status}
                        color="default"
                    />
                }
            />
        </WidgetContainer>
    );
}