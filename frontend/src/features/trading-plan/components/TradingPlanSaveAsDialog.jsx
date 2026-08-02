import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";


export default function TradingPlanSaveAsDialog({
    open,
    name,
    error,
    saving,
    onNameChange,
    onClose,
    onSave
}) {
    const handleKeyDown = (event) => {
        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();
        onSave();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                Save Trading Plan As
            </DialogTitle>

            <DialogContent>
                <TextField
                    autoFocus
                    label="Plan Name"
                    value={name}
                    onChange={(event) =>
                        onNameChange(
                            event.target.value
                        )
                    }
                    onKeyDown={handleKeyDown}
                    error={Boolean(error)}
                    helperText={
                        error
                        || "Παράδειγμα: Prop Firm 25K"
                    }
                    fullWidth
                    sx={{ mt: 1 }}
                />
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={onClose}
                    disabled={saving}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={onSave}
                    disabled={saving}
                    startIcon={
                        saving
                            ? (
                                <CircularProgress
                                    size={18}
                                    color="inherit"
                                />
                            )
                            : (
                                <SaveIcon />
                            )
                    }
                >
                    Save New Plan
                </Button>
            </DialogActions>
        </Dialog>
    );
}