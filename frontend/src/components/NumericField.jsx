import TextField from "@mui/material/TextField";

export default function NumericField({
    label,
    value,
    onChange,
    fullWidth = true,
    ...props
}) {
    const handleChange = (event) => {
        const rawValue = event.target.value;

        const normalizedValue = rawValue.replace(",", ".");

        onChange(normalizedValue);
    };

    return (
        <TextField
            label={label}
            value={value ?? ""}
            onChange={handleChange}
            fullWidth={fullWidth}
            inputMode="decimal"
            {...props}
        />
    );
}