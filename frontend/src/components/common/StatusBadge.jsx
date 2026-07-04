import Chip from "@mui/material/Chip";

const COLORS = {
    active: "success",
    disabled: "default",
    syncing: "warning",
    connected: "success",
    failed: "error",
    demo: "info",
    live: "success",
    prop: "secondary",
};

export default function StatusBadge({
    label,
    status = "default",
    sx = {},
}) {
    return (
        <Chip
            label={label}
            color={COLORS[status] || "default"}
            size="small"
            sx={{
                fontWeight: 600,
                borderRadius: 2,
                ...sx,
            }}
        />
    );
}