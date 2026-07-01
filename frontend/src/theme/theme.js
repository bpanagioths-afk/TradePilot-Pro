import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",

        primary: {
            main: "#3B82F6"
        },

        secondary: {
            main: "#10B981"
        },

        background: {
            default: "#0F172A",
            paper: "#1E293B"
        },

        success: {
            main: "#22C55E"
        },

        error: {
            main: "#EF4444"
        },

        warning: {
            main: "#F59E0B"
        },

        text: {
            primary: "#F8FAFC",
            secondary: "#94A3B8"
        }
    },

    typography: {
        fontFamily: "Roboto, sans-serif",

        h4: {
            fontWeight: 700
        },

        h5: {
            fontWeight: 600
        },

        h6: {
            fontWeight: 600
        }
    },

    shape: {
        borderRadius: 12
    },

    components: {

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 14,
                    padding: 10
                }
            }
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    textTransform: "none",
                    fontWeight: 600
                }
            }
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 14
                }
            }
        }
    }
});

export default theme;