import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    Box,
    Typography,
    Paper,
    Button,
    Stack,
    TextField,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Chip
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";
import DescriptionIcon from "@mui/icons-material/Description";
import PrintIcon from "@mui/icons-material/Print";

import {
    getTrades,
    createTrade,
    updateTrade,
    deleteTrade as deleteTradeApi,
    uploadTradeScreenshot,
    downloadTradesCsv,
    downloadTradesPdf,
    downloadTradesExcel
} from "../services/tradeService";

import TradeDialog from
    "../components/TradeDialog";

import TradeDetailsDialog from
    "../components/TradeDetailsDialog";

import ConfirmDialog from
    "../components/common/ConfirmDialog";


function resolveTradeSaveError(error) {
    const backendDetail =
        error?.response?.data?.detail;

    if (
        error?.response?.status === 409
        && backendDetail
    ) {
        return (
            "Αυτό το MT5 Εισιτήριο είναι ήδη "
            + "συνδεδεμένο με άλλο trade."
        );
    }

    if (typeof backendDetail === "string") {
        return backendDetail;
    }

    if (Array.isArray(backendDetail)) {
        return backendDetail
            .map((item) => item?.msg)
            .filter(Boolean)
            .join(" ");
    }

    return (
        "Δεν ήταν δυνατή η αποθήκευση του trade. "
        + "Έλεγξε τα στοιχεία και προσπάθησε ξανά."
    );
}


function resolveTradeDeleteError(error) {
    const backendDetail =
        error?.response?.data?.detail;

    if (typeof backendDetail === "string") {
        return backendDetail;
    }

    if (Array.isArray(backendDetail)) {
        return backendDetail
            .map((item) => item?.msg)
            .filter(Boolean)
            .join(" ");
    }

    return (
        "Δεν ήταν δυνατή η διαγραφή του trade. "
        + "Προσπάθησε ξανά."
    );
}


function formatTradeDate(value) {
    if (!value) {
        return "—";
    }

    const parsedDate = new Date(value);

    if (
        Number.isNaN(
            parsedDate.getTime()
        )
    ) {
        return String(value);
    }

    return parsedDate.toLocaleString(
        "el-GR"
    );
}


export default function Trades() {
    const [trades, setTrades] =
        useState([]);

    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [detailsOpen, setDetailsOpen] =
        useState(false);

    const [
        selectedTrade,
        setSelectedTrade
    ] = useState(null);

    const [
        tradePendingDelete,
        setTradePendingDelete
    ] = useState(null);

    const [deleteLoading, setDeleteLoading] =
        useState(false);

    const [deleteError, setDeleteError] =
        useState("");

    const [saveError, setSaveError] =
        useState("");

    const [saving, setSaving] =
        useState(false);

    const [search, setSearch] =
        useState("");

    const [
        directionFilter,
        setDirectionFilter
    ] = useState("ALL");

    const [
        resultFilter,
        setResultFilter
    ] = useState("ALL");

    const [
        exportAnchor,
        setExportAnchor
    ] = useState(null);

    const exportMenuOpen =
        Boolean(exportAnchor);


    const loadTrades = () => {
        getTrades()
            .then((res) => {
                setTrades(res.data);
            })
            .catch(console.error);
    };


    useEffect(() => {
        loadTrades();
    }, []);


    const filteredTrades =
        useMemo(() => {
            return trades.filter(
                (trade) => {
                    const searchText =
                        search.toLowerCase();

                    const matchesSearch =
                        !search
                        || String(
                            trade.symbol || ""
                        )
                            .toLowerCase()
                            .includes(searchText)
                        || String(
                            trade.notes || ""
                        )
                            .toLowerCase()
                            .includes(searchText)
                        || String(
                            trade.session_name || ""
                        )
                            .toLowerCase()
                            .includes(searchText);

                    const matchesDirection =
                        directionFilter === "ALL"
                        || trade.direction
                            === directionFilter;

                    const matchesResult =
                        resultFilter === "ALL"
                        || (
                            resultFilter === "WIN"
                            && trade.is_win === 1
                        )
                        || (
                            resultFilter === "LOSS"
                            && trade.is_win === 0
                        );

                    return (
                        matchesSearch
                        && matchesDirection
                        && matchesResult
                    );
                }
            );
        }, [
            trades,
            search,
            directionFilter,
            resultFilter
        ]);


    const openExportMenu = (event) => {
        setExportAnchor(
            event.currentTarget
        );
    };


    const closeExportMenu = () => {
        setExportAnchor(null);
    };

    const handleExport = async (
        exportFunction
    ) => {
        try {
            await exportFunction();
        } catch (error) {
            console.error(error);
        } finally {
            closeExportMenu();
        }
    };

    const openNewTrade = () => {
        setSelectedTrade(null);
        setSaveError("");
        setDialogOpen(true);
    };


    const openEditTrade = (trade) => {
        setSelectedTrade(trade);
        setSaveError("");
        setDialogOpen(true);
    };


    const openDetails = (trade) => {
        setSelectedTrade(trade);
        setDetailsOpen(true);
    };


    const closeDialog = () => {
        if (saving) {
            return;
        }

        setDialogOpen(false);
        setSelectedTrade(null);
        setSaveError("");
    };


    const closeDetails = () => {
        setDetailsOpen(false);
        setSelectedTrade(null);
    };


    const openDeleteDialog = (trade) => {
        setTradePendingDelete(trade);
        setDeleteError("");
    };


    const closeDeleteDialog = () => {
        if (deleteLoading) {
            return;
        }

        setTradePendingDelete(null);
        setDeleteError("");
    };


    const uploadScreenshot = (
        tradeId,
        screenshotFile
    ) => {
        if (!screenshotFile) {
            return Promise.resolve();
        }

        const formData =
            new FormData();

        formData.append(
            "file",
            screenshotFile
        );

        return uploadTradeScreenshot(
            tradeId,
            formData
        );
    };


    const saveTrade = async (
        payload,
        screenshotFile
    ) => {
        setSaving(true);
        setSaveError("");

        try {
            const response = selectedTrade
                ? await updateTrade(
                    selectedTrade.id,
                    payload
                )
                : await createTrade(
                    payload
                );

            await uploadScreenshot(
                response.data.id,
                screenshotFile
            );

            setDialogOpen(false);
            setSelectedTrade(null);
            setSaveError("");

            loadTrades();
        } catch (error) {
            console.error(error);

            setSaveError(
                resolveTradeSaveError(error)
            );
        } finally {
            setSaving(false);
        }
    };


    const confirmDeleteTrade =
        async () => {
            if (
                !tradePendingDelete
                || deleteLoading
            ) {
                return;
            }

            setDeleteLoading(true);
            setDeleteError("");

            try {
                await deleteTradeApi(
                    tradePendingDelete.id
                );

                setTradePendingDelete(null);
                loadTrades();
            } catch (error) {
                console.error(error);

                setDeleteError(
                    resolveTradeDeleteError(
                        error
                    )
                );
            } finally {
                setDeleteLoading(false);
            }
        };


    const clearFilters = () => {
        setSearch("");
        setDirectionFilter("ALL");
        setResultFilter("ALL");
    };


    const columns = [
        {
            field: "symbol",
            headerName: "Pair",
            width: 120,
            renderCell: (params) => (
                <Typography fontWeight="bold">
                    {params.value}
                </Typography>
            )
        },
        {
            field: "direction",
            headerName: "Direction",
            width: 130,
            renderCell: (params) => (
                <Chip
                    icon={
                        params.value === "BUY"
                            ? <TrendingUpIcon />
                            : <TrendingDownIcon />
                    }
                    label={params.value}
                    color={
                        params.value === "BUY"
                            ? "success"
                            : "error"
                    }
                    size="small"
                />
            )
        },
        {
            field: "entry_price",
            headerName: "Entry",
            width: 110
        },
        {
            field: "exit_price",
            headerName: "Exit",
            width: 110
        },
        {
            field: "lot_size",
            headerName: "Lot",
            width: 90
        },
        {
            field: "profit_money",
            headerName: "Profit €",
            width: 130,
            renderCell: (params) => {
                const value =
                    params.value || 0;

                const positive =
                    value >= 0;

                return (
                    <Typography
                        fontWeight="bold"
                        color={
                            positive
                                ? "success.main"
                                : "error.main"
                        }
                    >
                        {positive ? "+" : ""}
                        {value} €
                    </Typography>
                );
            }
        },
        {
            field: "movement_value",
            headerName: "Movement",
            width: 150,
            renderCell: (params) => {
                const value =
                    params.row
                        .movement_value
                    ?? params.row
                        .profit_pips
                    ?? 0;

                const unit =
                    params.row
                        .movement_unit
                    ?? "pips";

                const positive =
                    Number(value) >= 0;

                return (
                    <Typography
                        fontWeight="bold"
                        color={
                            positive
                                ? "success.main"
                                : "error.main"
                        }
                    >
                        {positive ? "+" : ""}
                        {value} {unit}
                    </Typography>
                );
            }
        },
        {
            field: "risk_reward",
            headerName: "RR",
            width: 110,
            renderCell: (params) => {
                const value =
                    params.value || 0;

                let color = "error";

                if (value >= 2) {
                    color = "success";
                } else if (value >= 1) {
                    color = "warning";
                }

                return (
                    <Chip
                        label={`RR ${value}`}
                        color={color}
                        size="small"
                    />
                );
            }
        },
        {
            field: "is_win",
            headerName: "Result",
            width: 110,
            renderCell: (params) => (
                <Chip
                    label={
                        params.value === 1
                            ? "WIN"
                            : "LOSS"
                    }
                    color={
                        params.value === 1
                            ? "success"
                            : "error"
                    }
                    size="small"
                />
            )
        },
        {
            field: "session_name",
            headerName: "Session",
            width: 130
        },
        {
            field: "notes",
            headerName: "Notes",
            width: 220
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 310,
            sortable: false,
            renderCell: (params) => (
                <Stack
                    direction="row"
                    spacing={1}
                >
                    <Button
                        size="small"
                        startIcon={
                            <VisibilityIcon />
                        }
                        onClick={() =>
                            openDetails(
                                params.row
                            )
                        }
                    >
                        View
                    </Button>

                    <Button
                        size="small"
                        startIcon={
                            <EditIcon />
                        }
                        onClick={() =>
                            openEditTrade(
                                params.row
                            )
                        }
                    >
                        Edit
                    </Button>

                    <Button
                        size="small"
                        color="error"
                        startIcon={
                            <DeleteIcon />
                        }
                        onClick={() =>
                            openDeleteDialog(
                                params.row
                            )
                        }
                    >
                        Delete
                    </Button>
                </Stack>
            )
        }
    ];


    const deleteDialogDetails =
        tradePendingDelete
            ? [
                {
                    label: "Pair",
                    value:
                        tradePendingDelete
                            .symbol
                        || "—"
                },
                {
                    label: "Direction",
                    value:
                        tradePendingDelete
                            .direction
                        || "—"
                },
                {
                    label: "Open Time",
                    value:
                        formatTradeDate(
                            tradePendingDelete
                                .open_time
                        )
                },
                {
                    label: "MT5 Εισιτήριο",
                    value:
                        tradePendingDelete
                            .mt5_position_id
                        || "—"
                }
            ]
            : [];


    return (
        <Box>
            <Stack
                direction="row"
                sx={{
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                    mb: 3
                }}
            >
                <Typography variant="h4">
                    Trades
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                >
                    <Button
                        variant="outlined"
                        startIcon={
                            <DownloadIcon />
                        }
                        onClick={openExportMenu}
                    >
                        Export
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={
                            <RefreshIcon />
                        }
                        onClick={loadTrades}
                    >
                        Refresh
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={
                            <AddIcon />
                        }
                        onClick={openNewTrade}
                    >
                        New Trade
                    </Button>
                </Stack>
            </Stack>

            <Menu
                anchorEl={exportAnchor}
                open={exportMenuOpen}
                onClose={closeExportMenu}
            >
                <MenuItem
                    onClick={() =>
                         handleExport(
                            downloadTradesPdf
                         )
                    }
                > 
                    <ListItemIcon>
                        <PictureAsPdfIcon
                            fontSize="small"
                        />
                    </ListItemIcon>

                    <ListItemText>
                        Export PDF
                    </ListItemText>
                </MenuItem>

                <MenuItem
                   onClick={() =>
                       handleExport(
                           downloadTradesExcel
                       )
                   }
                >
                    <ListItemIcon>
                        <TableChartIcon
                            fontSize="small"
                        />
                    </ListItemIcon>

                    <ListItemText>
                        Export Excel
                    </ListItemText>
                </MenuItem>

                <MenuItem
                   onClick={() =>
                     handleExport(
                        downloadTradesCsv
                     )
                   }
                >
                    <ListItemIcon>
                        <DescriptionIcon
                            fontSize="small"
                        />
                    </ListItemIcon>

                    <ListItemText>
                        Export CSV
                    </ListItemText>
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        window.print();
                        closeExportMenu();
                    }}
                >
                    <ListItemIcon>
                        <PrintIcon
                            fontSize="small"
                        />
                    </ListItemIcon>

                    <ListItemText>
                        Print
                    </ListItemText>
                </MenuItem>
            </Menu>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Stack
                    direction={{
                        xs: "column",
                        md: "row"
                    }}
                    spacing={2}
                >
                    <TextField
                        label={
                            "Search pair, notes, session"
                        }
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                        fullWidth
                    />

                    <TextField
                        select
                        label="Direction"
                        value={directionFilter}
                        onChange={(event) =>
                            setDirectionFilter(
                                event.target.value
                            )
                        }
                        sx={{ minWidth: 160 }}
                    >
                        <MenuItem value="ALL">
                            All
                        </MenuItem>

                        <MenuItem value="BUY">
                            BUY
                        </MenuItem>

                        <MenuItem value="SELL">
                            SELL
                        </MenuItem>
                    </TextField>

                    <TextField
                        select
                        label="Result"
                        value={resultFilter}
                        onChange={(event) =>
                            setResultFilter(
                                event.target.value
                            )
                        }
                        sx={{ minWidth: 160 }}
                    >
                        <MenuItem value="ALL">
                            All
                        </MenuItem>

                        <MenuItem value="WIN">
                            Win
                        </MenuItem>

                        <MenuItem value="LOSS">
                            Loss
                        </MenuItem>
                    </TextField>

                    <Button
                        variant="outlined"
                        startIcon={
                            <ClearIcon />
                        }
                        onClick={clearFilters}
                    >
                        Clear
                    </Button>
                </Stack>
            </Paper>

            <Paper
                sx={{
                    height: 650,
                    p: 2
                }}
            >
                <DataGrid
                    rows={filteredTrades}
                    columns={columns}
                    pageSizeOptions={[
                        10,
                        25,
                        50
                    ]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10
                            }
                        }
                    }}
                    disableRowSelectionOnClick
                />
            </Paper>

            <TradeDialog
                open={dialogOpen}
                onClose={closeDialog}
                onSave={saveTrade}
                trade={selectedTrade}
                saveError={saveError}
                saving={saving}
            />

            <TradeDetailsDialog
                open={detailsOpen}
                onClose={closeDetails}
                trade={selectedTrade}
            />

            <ConfirmDialog
                open={Boolean(
                    tradePendingDelete
                )}
                title="Διαγραφή Trade"
                message={
                    "Είσαι σίγουρος ότι θέλεις "
                    + "να διαγράψεις αυτό το trade;"
                }
                details={deleteDialogDetails}
                confirmLabel="Οριστική διαγραφή"
                cancelLabel="Ακύρωση"
                confirmColor="error"
                loading={deleteLoading}
                error={deleteError}
                onClose={closeDeleteDialog}
                onConfirm={
                    confirmDeleteTrade
                }
            />
        </Box>
    );
}