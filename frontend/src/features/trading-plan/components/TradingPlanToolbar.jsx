import {
    Box,
    Button,
    CircularProgress,
    MenuItem,
    Paper,
    TextField,
    Typography
} from "@mui/material";

import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SaveIcon from "@mui/icons-material/Save";
import StarIcon from "@mui/icons-material/Star";


export default function TradingPlanToolbar({
    plans,
    planId,
    isDefault,
    saving,
    onPlanSelection,
    onNewPlan,
    onSave,
    onSaveAs,
    onSetDefault
}) {
    return (
        <Paper
            sx={{
                p: 2,
                mb: 3
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        md: "row"
                    },
                    gap: 2,
                    alignItems: {
                        xs: "stretch",
                        md: "center"
                    }
                }}
            >
                <TextField
                    select
                    label="Load Plan"
                    value={planId || ""}
                    onChange={onPlanSelection}
                    fullWidth
                >
                    {plans.length === 0 && (
                        <MenuItem
                            value=""
                            disabled
                        >
                            Δεν υπάρχουν αποθηκευμένα plans
                        </MenuItem>
                    )}

                    {plans.map((storedPlan) => (
                        <MenuItem
                            key={storedPlan.id}
                            value={storedPlan.id}
                        >
                            {storedPlan.name
                                || `Trading Plan ${storedPlan.id}`}

                            {storedPlan.is_default
                                ? " — Default"
                                : ""}
                        </MenuItem>
                    ))}
                </TextField>

                <Typography
                    color="text.secondary"
                    sx={{
                        minWidth: {
                            md: 220
                        }
                    }}
                >
                    {planId
                        ? "Επεξεργάζεσαι αποθηκευμένο plan."
                        : "Δεν έχει φορτωθεί plan."}
                </Typography>

                <Button
                    variant="outlined"
                    startIcon={<NoteAddIcon />}
                    onClick={onNewPlan}
                >
                    New Plan
                </Button>

                <Button
                    variant="contained"
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
                    onClick={onSave}
                    disabled={saving}
                >
                    {saving
                        ? "Saving..."
                        : "Save"}
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<SaveIcon />}
                    onClick={onSaveAs}
                    disabled={saving}
                >
                    Save As
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<StarIcon />}
                    onClick={onSetDefault}
                    disabled={
                        saving
                        || !planId
                        || Boolean(isDefault)
                    }
                >
                    {isDefault
                        ? "Default Plan"
                        : "Set Default"}
                </Button>
            </Box>
        </Paper>
    );
}
