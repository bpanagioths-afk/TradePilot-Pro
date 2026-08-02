import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    Typography
} from "@mui/material";

import WarningAmberRoundedIcon from
    "@mui/icons-material/WarningAmberRounded";


export default function ConfirmDialog({
    open,
    title,
    message,
    details = [],
    confirmLabel = "Επιβεβαίωση",
    cancelLabel = "Ακύρωση",
    confirmColor = "error",
    loading = false,
    error = "",
    onClose,
    onConfirm
}) {
    const handleClose = (
        event,
        reason
    ) => {
        if (loading) {
            return;
        }

        if (
            reason === "backdropClick"
            || reason === "escapeKeyDown"
        ) {
            onClose();
            return;
        }

        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                >
                    <Box
                        sx={{
                            width: 42,
                            height: 42,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 2,
                            color: "error.main",
                            backgroundColor:
                                "rgba(211, 47, 47, 0.10)"
                        }}
                    >
                        <WarningAmberRoundedIcon />
                    </Box>

                    <Typography
                        variant="h6"
                        fontWeight={800}
                    >
                        {title}
                    </Typography>
                </Stack>
            </DialogTitle>

            <DialogContent>
                <Stack spacing={2.5}>
                    <DialogContentText>
                        {message}
                    </DialogContentText>

                    {details.length > 0 && (
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                border: "1px solid",
                                borderColor: "divider",
                                backgroundColor:
                                    "action.hover"
                            }}
                        >
                            <Stack spacing={1}>
                                {details.map((detail) => (
                                    <Stack
                                        key={detail.label}
                                        direction="row"
                                        spacing={1}
                                        justifyContent="space-between"
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {detail.label}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            fontWeight={700}
                                            textAlign="right"
                                        >
                                            {detail.value}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Box>
                    )}

                    <Alert severity="warning">
                        Η ενέργεια δεν μπορεί να αναιρεθεί.
                    </Alert>

                    {error && (
                        <Alert severity="error">
                            {error}
                        </Alert>
                    )}
                </Stack>
            </DialogContent>

            <DialogActions
                sx={{
                    px: 3,
                    pb: 3,
                    gap: 1
                }}
            >
                <Button
                    onClick={onClose}
                    disabled={loading}
                    variant="outlined"
                >
                    {cancelLabel}
                </Button>

                <Button
                    onClick={onConfirm}
                    disabled={loading}
                    color={confirmColor}
                    variant="contained"
                    startIcon={
                        loading
                            ? (
                                <CircularProgress
                                    size={18}
                                    color="inherit"
                                />
                            )
                            : null
                    }
                >
                    {loading
                        ? "Διαγραφή..."
                        : confirmLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}