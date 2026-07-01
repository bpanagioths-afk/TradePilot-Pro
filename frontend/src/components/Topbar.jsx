import {
    AppBar,
    Toolbar,
    Typography,
    Chip,
    Stack
} from "@mui/material";

export default function Topbar() {

    return (

        <AppBar
            position="fixed"
            color="inherit"
            sx={{
                zIndex: 1300
            }}
        >

            <Toolbar>

                <Typography
                    variant="h5"
                    sx={{ flexGrow: 1 }}
                >
                    Dashboard
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                >

                    <Chip
                        label="MT5 Connected"
                        color="success"
                    />

                    <Chip
                        label="Trading Journal Pro"
                        color="primary"
                    />

                </Stack>

            </Toolbar>

        </AppBar>

    );

}