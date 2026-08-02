import {
    useRef,
    useState
} from "react";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Paper,
    Stack,
    Typography
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";

import {
    importSettingsBackup,
    previewSettingsBackup
} from "../../../services/settingsService";


function resolveErrorMessage(error) {
    const detail =
        error?.response?.data?.detail;

    if (typeof detail === "string") {
        return detail;
    }

    if (Array.isArray(detail)) {
        return detail
            .map((item) => item?.msg)
            .filter(Boolean)
            .join(" ");
    }

    return (
        "Δεν ήταν δυνατή η επεξεργασία "
        + "του backup."
    );
}


function PreviewSection({
    title,
    preview
}) {
    if (!preview) {
        return null;
    }

    return (
        <Paper
            variant="outlined"
            sx={{ p: 2 }}
        >
            <Typography
                variant="subtitle1"
                fontWeight={700}
                mb={1}
            >
                {title}
            </Typography>

            <Stack spacing={0.5}>
                <Typography variant="body2">
                    Στο backup: {preview.backup_count}
                </Typography>

                <Typography variant="body2">
                    Υπάρχουν ήδη: {preview.existing_count}
                </Typography>

                <Typography variant="body2">
                    Θα εισαχθούν: {preview.insert_count}
                </Typography>

                <Typography variant="body2">
                    Διπλότυπα: {preview.duplicate_count}
                </Typography>

                <Typography variant="body2">
                    Συγκρούσεις: {preview.conflict_count}
                </Typography>
            </Stack>
        </Paper>
    );
}


function ResultSection({
    title,
    result
}) {
    if (!result) {
        return null;
    }

    return (
        <Paper
            variant="outlined"
            sx={{ p: 2 }}
        >
            <Typography
                variant="subtitle1"
                fontWeight={700}
                mb={1}
            >
                {title}
            </Typography>

            <Stack spacing={0.5}>
                <Typography variant="body2">
                    Inserted: {result.inserted_count}
                </Typography>

                <Typography variant="body2">
                    Updated: {result.updated_count}
                </Typography>

                <Typography variant="body2">
                    Skipped: {result.skipped_count}
                </Typography>

                <Typography variant="body2">
                    Conflicts: {result.conflict_count}
                </Typography>
            </Stack>
        </Paper>
    );
}


export default function BackupImportPanel() {
    const fileInputRef = useRef(null);

    const [selectedFileName, setSelectedFileName] =
        useState("");
    const [backupData, setBackupData] =
        useState(null);
    const [preview, setPreview] =
        useState(null);
    const [importResult, setImportResult] =
        useState(null);
    const [resultDialogOpen, setResultDialogOpen] =
        useState(false);

    const [previewLoading, setPreviewLoading] =
        useState(false);
    const [importLoading, setImportLoading] =
        useState(false);

    const [error, setError] =
        useState("");
    const [success, setSuccess] =
        useState("");


    const clearState = () => {
        setSelectedFileName("");
        setBackupData(null);
        setPreview(null);
        setImportResult(null);
        setResultDialogOpen(false);
        setError("");
        setSuccess("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };


    const buildImportReportFilename = () => {
        const now = new Date();

        const stamp = now
            .toISOString()
            .replace(/[:.]/g, "-");

        return (
            "tradepilot_import_report_"
            + `${stamp}.json`
        );
    };


    const downloadImportReport = () => {
        if (!importResult) {
            return;
        }

        const report = {
            generated_at:
                new Date().toISOString(),
            source_file:
                selectedFileName,
            result:
                importResult,
        };

        const blob = new Blob(
            [
                JSON.stringify(
                    report,
                    null,
                    2
                )
            ],
            {
                type:
                    "application/json;charset=utf-8"
            }
        );

        const objectUrl =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = objectUrl;
        link.download =
            buildImportReportFilename();

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(objectUrl);
    };


    const closeResultDialog = () => {
        setResultDialogOpen(false);
    };


    const handleFileSelection =
        async (event) => {
            const selectedFile =
                event.target.files?.[0];

            setError("");
            setSuccess("");
            setPreview(null);
            setBackupData(null);
            setImportResult(null);
            setResultDialogOpen(false);

            if (!selectedFile) {
                setSelectedFileName("");
                return;
            }

            if (
                !selectedFile.name
                    .toLowerCase()
                    .endsWith(".json")
            ) {
                setSelectedFileName("");
                setError(
                    "Επίλεξε αρχείο backup τύπου JSON."
                );
                return;
            }

            setSelectedFileName(
                selectedFile.name
            );

            try {
                const fileText =
                    await selectedFile.text();

                const parsedBackup =
                    JSON.parse(fileText);

                setBackupData(parsedBackup);
            } catch {
                setError(
                    "Το αρχείο δεν περιέχει έγκυρο JSON."
                );
            }
        };


    const handlePreview = async () => {
        if (!backupData) {
            setError(
                "Επίλεξε πρώτα ένα αρχείο backup."
            );
            return;
        }

        setPreviewLoading(true);
        setError("");
        setSuccess("");

        try {
            const previewResult =
                await previewSettingsBackup(
                    backupData
                );

            setPreview(previewResult);
        } catch (requestError) {
            setPreview(null);
            setError(
                resolveErrorMessage(
                    requestError
                )
            );
        } finally {
            setPreviewLoading(false);
        }
    };


    const handleMergeImport = async () => {
        if (!backupData || !preview) {
            setError(
                "Κάνε πρώτα έλεγχο Preview."
            );
            return;
        }

        setImportLoading(true);
        setError("");
        setSuccess("");

        try {
            const result =
                await importSettingsBackup(
                    backupData
                );

            setImportResult(result);
            setResultDialogOpen(true);

            setSuccess(
                "Το Merge Import ολοκληρώθηκε."
            );

            setPreview(null);
        } catch (requestError) {
            setError(
                resolveErrorMessage(
                    requestError
                )
            );
        } finally {
            setImportLoading(false);
        }
    };


    return (
        <Box>
            <Divider sx={{ my: 3 }} />

            <Typography
                variant="h6"
                mb={1}
            >
                Import Backup
            </Typography>

            <Typography
                color="text.secondary"
                sx={{ mb: 2 }}
            >
                Το Merge κρατά τα υπάρχοντα
                δεδομένα και εισάγει μόνο όσα
                λείπουν. Πριν την εισαγωγή
                γίνεται υποχρεωτικό Preview.
            </Typography>

            {error && (
                <Alert
                    severity="error"
                    sx={{ mb: 2 }}
                >
                    {error}
                </Alert>
            )}

            {success && (
                <Alert
                    severity="success"
                    sx={{ mb: 2 }}
                >
                    {success}
                </Alert>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                hidden
                onChange={
                    handleFileSelection
                }
            />

            <Stack
                direction={{
                    xs: "column",
                    sm: "row"
                }}
                spacing={2}
                sx={{ mb: 2 }}
            >
                <Button
                    variant="outlined"
                    startIcon={
                        <UploadFileIcon />
                    }
                    onClick={() =>
                        fileInputRef.current
                            ?.click()
                    }
                    disabled={
                        previewLoading
                        || importLoading
                    }
                >
                    Select Backup File
                </Button>

                <Button
                    variant="contained"
                    onClick={handlePreview}
                    disabled={
                        !backupData
                        || previewLoading
                        || importLoading
                    }
                    startIcon={
                        previewLoading
                            ? (
                                <CircularProgress
                                    size={18}
                                    color="inherit"
                                />
                            )
                            : null
                    }
                >
                    Preview Merge
                </Button>

                <Button
                    variant="contained"
                    color="warning"
                    onClick={
                        handleMergeImport
                    }
                    disabled={
                        !preview
                        || importLoading
                        || previewLoading
                    }
                    startIcon={
                        importLoading
                            ? (
                                <CircularProgress
                                    size={18}
                                    color="inherit"
                                />
                            )
                            : null
                    }
                >
                    Confirm Merge Import
                </Button>

                <Button
                    variant="text"
                    onClick={clearState}
                    disabled={
                        previewLoading
                        || importLoading
                    }
                >
                    Clear
                </Button>
            </Stack>

            {selectedFileName && (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    Αρχείο: {selectedFileName}
                </Typography>
            )}

            {preview && (
                <Stack spacing={2}>
                    <Alert
                        severity={
                            preview.account_matches
                                ? "success"
                                : "warning"
                        }
                    >
                        {preview.account_matches
                            ? "Το backup ανήκει στον ίδιο λογαριασμό."
                            : "Το backup δημιουργήθηκε από διαφορετικό username ή email."}
                    </Alert>

                    <PreviewSection
                        title="Trades"
                        preview={
                            preview.trades
                        }
                    />

                    <PreviewSection
                        title="Trading Plans"
                        preview={
                            preview.trading_plans
                        }
                    />

                    {preview.warnings?.map(
                        (warning, index) => (
                            <Alert
                                key={
                                    `${warning}-${index}`
                                }
                                severity="warning"
                            >
                                {warning}
                            </Alert>
                        )
                    )}
                </Stack>
            )}

            <Dialog
                open={resultDialogOpen}
                onClose={closeResultDialog}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>
                    Import Result
                </DialogTitle>

                <DialogContent>
                    {importResult && (
                        <Stack
                            spacing={2}
                            sx={{ mt: 1 }}
                        >
                            <Alert severity="success">
                                Το Merge Import ολοκληρώθηκε
                                με επιτυχία.
                            </Alert>

                            <ResultSection
                                title="Account Settings"
                                result={
                                    importResult
                                        .account_settings
                                }
                            />

                            <ResultSection
                                title="Trades"
                                result={
                                    importResult.trades
                                }
                            />

                            <ResultSection
                                title="Trading Plans"
                                result={
                                    importResult
                                        .trading_plans
                                }
                            />

                            {importResult.warnings?.map(
                                (warning, index) => (
                                    <Alert
                                        key={
                                            `${warning}-${index}`
                                        }
                                        severity="warning"
                                    >
                                        {warning}
                                    </Alert>
                                )
                            )}
                        </Stack>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={
                            downloadImportReport
                        }
                        disabled={!importResult}
                    >
                        Download Import Report
                    </Button>

                    <Button
                        variant="contained"
                        onClick={
                            closeResultDialog
                        }
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
