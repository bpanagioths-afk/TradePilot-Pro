import {
    Box,
    Paper,
    Typography
} from "@mui/material";

const numberFormatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2
});

function formatDefaultValue(value) {
    if (typeof value === "number") {
        return numberFormatter.format(value);
    }

    return value ?? "—";
}

export default function ChartTooltip({
    active,
    payload,
    label,
    labelFormatter,
    valueFormatter,
    nameFormatter,
    unit = ""
}) {
    if (!active || !Array.isArray(payload) || payload.length === 0) {
        return null;
    }

    const formattedLabel = labelFormatter
        ? labelFormatter(label)
        : label;

    return (
        <Paper
            elevation={6}
            sx={{
                minWidth: 160,
                p: 1.5,
                border: 1,
                borderColor: "divider"
            }}
        >
            {formattedLabel !== undefined && formattedLabel !== null && (
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                        display: "block",
                        mb: 1
                    }}
                >
                    {formattedLabel}
                </Typography>
            )}

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.75
                }}
            >
                {payload.map((item, index) => {
                    const itemName = nameFormatter
                        ? nameFormatter(item.name, item)
                        : item.name;

                    const itemValue = valueFormatter
                        ? valueFormatter(item.value, item)
                        : formatDefaultValue(item.value);

                    const itemUnit = item.unit ?? unit;

                    return (
                        <Box
                            key={`${item.dataKey ?? item.name ?? "value"}-${index}`}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 2
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    minWidth: 0
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        flexShrink: 0,
                                        backgroundColor:
                                            item.color ??
                                            item.stroke ??
                                            item.fill ??
                                            "text.secondary"
                                    }}
                                />

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    noWrap
                                >
                                    {itemName}
                                </Typography>
                            </Box>

                            <Typography
                                variant="body2"
                                fontWeight={600}
                                noWrap
                            >
                                {itemValue}
                                {itemUnit ? ` ${itemUnit}` : ""}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Paper>
    );
}