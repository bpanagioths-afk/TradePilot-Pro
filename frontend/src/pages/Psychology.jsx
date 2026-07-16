import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Paper,
    Stack,
    Chip
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

import api from "../api/api";

import {
    ChartContainer,
    ChartTooltip
} from "../components/charts";

const psychologyMap = {
    1: "Ήρεμος",
    2: "Σίγουρος",
    3: "Συγκεντρωμένος",
    4: "Αγχωμένος",
    5: "FOMO",
    6: "Revenge",
    7: "Κουρασμένος",
    8: "Βιαστικός"
};

function normalizePsychology(rows) {
    return rows.map((row) => {
        const movement = row.movement_breakdown?.[0];

        return {
            ...row,
            name: psychologyMap[row.psychology_state_id] || "Άγνωστο",
            value: movement?.total ?? 0,
            average: movement?.average ?? 0,
            unit: movement?.unit ?? "pips"
        };
    });
}

export default function Psychology() {
    const theme = useTheme();
    const [data, setData] = useState([]);

    useEffect(() => {
        api
            .get("/dashboard/psychology")
            .then((res) => {
                setData(normalizePsychology(res.data));
            })
            .catch(console.error);
    }, []);

    return (
        <Box>
            <Typography variant="h4" mb={3}>
                Psychology Analysis
            </Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" mb={2}>
                    Profit/Pips by Psychology
                </Typography>

                <ChartContainer height={350}>
                    <BarChart data={data}>
                        <CartesianGrid
                            stroke={theme.palette.divider}
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="name"
                            tick={{
                                fill: theme.palette.text.secondary
                            }}
                        />

                        <YAxis
                            tick={{
                                fill: theme.palette.text.secondary
                            }}
                        />

                        <Tooltip
                            content={
                                <ChartTooltip
                                    nameFormatter={() => "Performance"}
                                />
                            }
                        />

                        <Bar
                            dataKey="value"
                            name="Performance"
                        >
                            {data.map((item) => (
                                <Cell
                                    key={
                                        item.psychology_state_id
                                        ?? item.name
                                    }
                                    fill={
                                        Number(item.value) >= 0
                                            ? theme.palette.success.main
                                            : theme.palette.error.main
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </Paper>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "1fr 1fr",
                        lg: "1fr 1fr 1fr 1fr"
                    },
                    gap: 2
                }}
            >
                {data.map((item) => (
                    <Paper
                        key={item.psychology_state_id || item.name}
                        sx={{ p: 2 }}
                    >
                        <Stack spacing={1}>
                            <Typography variant="h6">
                                {item.name}
                            </Typography>

                            <Chip
                                label={`${item.trades} trades`}
                                color="primary"
                                size="small"
                            />

                            <Typography color="text.secondary">
                                Total {item.unit}
                            </Typography>

                            <Typography
                                variant="h5"
                                color={
                                    Number(item.value) >= 0
                                        ? "success.main"
                                        : "error.main"
                                }
                            >
                                {item.value} {item.unit}
                            </Typography>
                        </Stack>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
}
