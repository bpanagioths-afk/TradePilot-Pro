import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Paper,
    Stack,
    Chip
} from "@mui/material";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

import api from "../api/api";

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

            <Paper sx={{ p: 3, mb: 3, height: 420 }}>
                <Typography variant="h6" mb={2}>
                    Profit/Pips by Psychology
                </Typography>

                <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={data}>
                        <CartesianGrid />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" />
                    </BarChart>
                </ResponsiveContainer>
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
                                color={(item.value || 0) >= 0 ? "success.main" : "error.main"}
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