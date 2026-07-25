import { useState } from "react";

import {
    IconButton,
    InputAdornment,
    TextField
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function PasswordField({
    autoComplete = "current-password",
    slotProps,
    ...textFieldProps
}) {
    const [showPassword, setShowPassword] = useState(false);

    const visibilityLabel = showPassword
        ? "Απόκρυψη κωδικού"
        : "Εμφάνιση κωδικού";

    const existingInputSlotProps =
        typeof slotProps?.input === "function"
            ? slotProps.input
            : slotProps?.input || {};

    return (
        <TextField
            {...textFieldProps}
            type={showPassword ? "text" : "password"}
            autoComplete={autoComplete}
            fullWidth
            slotProps={{
                ...slotProps,
                input:
                    typeof existingInputSlotProps === "function"
                        ? (ownerState) => {
                            const resolvedInputProps =
                                existingInputSlotProps(ownerState) || {};

                            return {
                                ...resolvedInputProps,
                                endAdornment: (
                                    <>
                                        {resolvedInputProps.endAdornment}

                                        <InputAdornment position="end">
                                            <IconButton
                                                type="button"
                                                aria-label={visibilityLabel}
                                                title={visibilityLabel}
                                                onClick={() =>
                                                    setShowPassword(
                                                        (currentValue) =>
                                                            !currentValue
                                                    )
                                                }
                                                onMouseDown={(event) =>
                                                    event.preventDefault()
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOffIcon />
                                                ) : (
                                                    <VisibilityIcon />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    </>
                                )
                            };
                        }
                        : {
                            ...existingInputSlotProps,
                            endAdornment: (
                                <>
                                    {existingInputSlotProps.endAdornment}

                                    <InputAdornment position="end">
                                        <IconButton
                                            type="button"
                                            aria-label={visibilityLabel}
                                            title={visibilityLabel}
                                            onClick={() =>
                                                setShowPassword(
                                                    (currentValue) =>
                                                        !currentValue
                                                )
                                            }
                                            onMouseDown={(event) =>
                                                event.preventDefault()
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOffIcon />
                                            ) : (
                                                <VisibilityIcon />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                </>
                            )
                        }
            }}
        />
    );
}
