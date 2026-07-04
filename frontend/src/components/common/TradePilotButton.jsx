import Button from "@mui/material/Button";

export default function TradePilotButton({
    children,
    variant = "contained",
    color = "primary",
    size = "small",
    loading = false,
    disabled = false,
    startIcon,
    onClick,
    sx = {},
}) {
    return (
        <Button
            variant={variant}
            color={color}
            size={size}
            startIcon={startIcon}
            disabled={disabled || loading}
            onClick={onClick}
            sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
                px: 2,
                ...sx,
            }}
        >
            {loading ? "Loading..." : children}
        </Button>
    );
}