import { useEffect, useMemo, useState } from "react";

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
    uploadTradeScreenshot
} from "../services/tradeService";

import TradeDialog from "../components/TradeDialog";
import TradeDetailsDialog from "../components/TradeDetailsDialog";

export default function Trades() {

    const [trades, setTrades] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedTrade, setSelectedTrade] = useState(null);

    const [search, setSearch] = useState("");
    const [directionFilter, setDirectionFilter] = useState("ALL");
    const [resultFilter, setResultFilter] = useState("ALL");

    const [exportAnchor, setExportAnchor] = useState(null);

    const exportMenuOpen = Boolean(exportAnchor);

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

    const filteredTrades = useMemo(() => {
        return trades.filter((trade) => {

            const searchText = search.toLowerCase();

            const matchesSearch =
                !search ||
                String(trade.symbol || "").toLowerCase().includes(searchText) ||
                String(trade.notes || "").toLowerCase().includes(searchText) ||
                String(trade.session_name || "").toLowerCase().includes(searchText);

            const matchesDirection =
                directionFilter === "ALL" ||
                trade.direction === directionFilter;

            const matchesResult =
                resultFilter === "ALL" ||
                (resultFilter === "WIN" && trade.is_win === 1) ||
                (resultFilter === "LOSS" && trade.is_win === 0);

            return matchesSearch && matchesDirection && matchesResult;
        });
    }, [trades, search, directionFilter, resultFilter]);

     const openExportMenu = (event) => {
        setExportAnchor(event.currentTarget); 
     };

    const closeExportMenu = () => {
        setExportAnchor(null);
    };
    const openNewTrade = () => {
        setSelectedTrade(null);
        setDialogOpen(true);
    };

    const openEditTrade = (trade) => {
        setSelectedTrade(trade);
        setDialogOpen(true);
    };

    const openDetails = (trade) => {
        setSelectedTrade(trade);
        setDetailsOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setSelectedTrade(null);
    };

    const closeDetails = () => {
        setDetailsOpen(false);
        setSelectedTrade(null);
    };

    const uploadScreenshot = (tradeId, screenshotFile) => {
        if (!screenshotFile) {
            return Promise.resolve();
        }

        const formData = new FormData();

        formData.append("file", screenshotFile);

        return uploadTradeScreenshot(tradeId, formData);
    };

    const saveTrade = (payload, screenshotFile) => {
        if (selectedTrade) {
            updateTrade(selectedTrade.id, payload)
                .then((res) => {
                    return uploadScreenshot(res.data.id, screenshotFile);
                })
                .then(() => {
                    closeDialog();
                    loadTrades();
                })
                .catch(console.error);

            return;
        }

        createTrade(payload)
            .then((res) => {
                return uploadScreenshot(res.data.id, screenshotFile);
            })
            .then(() => {
                closeDialog();
                loadTrades();
            })
            .catch(console.error);
    };

    const deleteTrade = (id) => {
        deleteTradeApi(id)
            .then(() => {
                loadTrades();
            })
            .catch(console.error);
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
                    color={params.value === "BUY" ? "success" : "error"}
                    size="small"
                />
            )
        },
        { field: "entry_price", headerName: "Entry", width: 110 },
        { field: "exit_price", headerName: "Exit", width: 110 },
        { field: "lot_size", headerName: "Lot", width: 90 },
        {
            field: "profit_money",
            headerName: "Profit €",
            width: 130,
            renderCell: (params) => {
                const value = params.value || 0;
                const positive = value >= 0;

                return (
                    <Typography
                        fontWeight="bold"
                        color={positive ? "success.main" : "error.main"}
                    >
                        {positive ? "+" : ""}
                        {value} €
                    </Typography>
                );
            }
        },
        {
            field: "profit_pips",
            headerName: "Pips",
            width: 110,
            renderCell: (params) => {
                const value = params.value || 0;
                const positive = value >= 0;

                return (
                    <Typography
                        fontWeight="bold"
                        color={positive ? "success.main" : "error.main"}
                    >
                        {positive ? "+" : ""}
                        {value}
                    </Typography>
                );
            }
        },
        {
            field: "risk_reward",
            headerName: "RR",
            width: 110,
            renderCell: (params) => {
                const value = params.value || 0;

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
                    label={params.value === 1 ? "WIN" : "LOSS"}
                    color={params.value === 1 ? "success" : "error"}
                    size="small"
                />
            )
        },
        { field: "session_name", headerName: "Session", width: 130 },
        { field: "notes", headerName: "Notes", width: 220 },
        {
            field: "actions",
            headerName: "Actions",
            width: 310,
            sortable: false,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <Button
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => openDetails(params.row)}
                    >
                        View
                    </Button>

                    <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => openEditTrade(params.row)}
                    >
                        Edit
                    </Button>

                    <Button
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteTrade(params.row.id)}
                    >
                        Delete
                    </Button>
                </Stack>
            )
        }
    ];

    return (
        <Box>
              <Stack
                  direction="row" 
                  sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3
                  }}
              >
                <Typography variant="h4">
                    Trades
                </Typography>

	<Stack direction="row" spacing={2}>
            <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={openExportMenu}
            >
                Export
            </Button>

            <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={loadTrades}
            >
                Refresh
            </Button>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
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
    <MenuItem onClick={closeExportMenu}>
        <ListItemIcon>
            <PictureAsPdfIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
            Export PDF
        </ListItemText>
    </MenuItem>

    <MenuItem onClick={closeExportMenu}>
        <ListItemIcon>
            <TableChartIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
            Export Excel
        </ListItemText>
    </MenuItem>

    <MenuItem
        onClick={() => {
            window.open(
                "http://127.0.0.1:8000/exports/trades/csv",
                "_blank"
            );
            closeExportMenu();
        }}
    >
        <ListItemIcon>
            <DescriptionIcon fontSize="small" />
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
            <PrintIcon fontSize="small" />
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
                        label="Search pair, notes, session"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        fullWidth
                    />

                    <TextField
                        select
                        label="Direction"
                        value={directionFilter}
                        onChange={(e) => setDirectionFilter(e.target.value)}
                        sx={{ minWidth: 160 }}
                    >
                        <MenuItem value="ALL">All</MenuItem>
                        <MenuItem value="BUY">BUY</MenuItem>
                        <MenuItem value="SELL">SELL</MenuItem>
                    </TextField>

                    <TextField
                        select
                        label="Result"
                        value={resultFilter}
                        onChange={(e) => setResultFilter(e.target.value)}
                        sx={{ minWidth: 160 }}
                    >
                        <MenuItem value="ALL">All</MenuItem>
                        <MenuItem value="WIN">Win</MenuItem>
                        <MenuItem value="LOSS">Loss</MenuItem>
                    </TextField>

                    <Button
                        variant="outlined"
                        startIcon={<ClearIcon />}
                        onClick={clearFilters}
                    >
                        Clear
                    </Button>
                </Stack>
            </Paper>

            <Paper sx={{ height: 650, p: 2 }}>
                <DataGrid
                    rows={filteredTrades}
                    columns={columns}
                    pageSizeOptions={[10, 25, 50]}
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
            />

            <TradeDetailsDialog
                open={detailsOpen}
                onClose={closeDetails}
                trade={selectedTrade}
            />
        </Box>
    );
}