import {
    Box,
    Paper,
    Stack,
    Typography
} from "@mui/material";

import {
    BarChartRounded,
    BoltRounded,
    ShieldRounded,
    TrendingUpRounded
} from "@mui/icons-material";


const platformFeatures = [
    {
        icon: ShieldRounded,
        title: "Ασφάλεια δεδομένων",
        description:
            "Προστατευμένη πρόσβαση στον προσωπικό σου λογαριασμό."
    },
    {
        icon: BarChartRounded,
        title: "Αναλυτικά στατιστικά",
        description:
            "Πλήρης εικόνα της απόδοσης και των συναλλαγών σου."
    },
    {
        icon: BoltRounded,
        title: "Συγχρονισμός MT5",
        description:
            "Οργανωμένη εισαγωγή και διαχείριση συναλλαγών."
    }
];


const decorativeCandles = [
    {
        left: "5%",
        bottom: "10%",
        height: 74,
        delay: "0s"
    },
    {
        left: "14%",
        bottom: "18%",
        height: 118,
        delay: "0.3s"
    },
    {
        left: "23%",
        bottom: "13%",
        height: 88,
        delay: "0.6s"
    },
    {
        left: "32%",
        bottom: "24%",
        height: 146,
        delay: "0.9s"
    },
    {
        left: "41%",
        bottom: "20%",
        height: 104,
        delay: "1.2s"
    }
];


export default function AuthLayout({
    title,
    subtitle,
    children
}) {
    return (
        <Box
            sx={(theme) => ({
                minHeight: "100vh",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: {
                    xs: 2,
                    sm: 3,
                    lg: 4
                },
                py: {
                    xs: 3,
                    md: 5
                },
                backgroundColor:
                    theme.palette.background.default,
                backgroundImage: `
                    radial-gradient(
                        circle at 12% 14%,
                        ${theme.palette.primary.main}26 0,
                        transparent 34%
                    ),
                    radial-gradient(
                        circle at 86% 78%,
                        ${theme.palette.primary.dark}20 0,
                        transparent 32%
                    ),
                    linear-gradient(
                        135deg,
                        ${theme.palette.background.default} 0%,
                        ${theme.palette.background.paper} 100%
                    )
                `,
                "@keyframes authGlow": {
                    "0%, 100%": {
                        opacity: 0.35,
                        transform: "scale(1)"
                    },
                    "50%": {
                        opacity: 0.65,
                        transform: "scale(1.08)"
                    }
                },
                "@keyframes candleFloat": {
                    "0%, 100%": {
                        transform: "translateY(0)",
                        opacity: 0.24
                    },
                    "50%": {
                        transform: "translateY(-12px)",
                        opacity: 0.5
                    }
                }
            })}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: 420,
                    height: 420,
                    top: -180,
                    left: -120,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(37,99,235,0.20), transparent 68%)",
                    filter: "blur(8px)",
                    animation:
                        "authGlow 8s ease-in-out infinite",
                    pointerEvents: "none"
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    width: 520,
                    height: 520,
                    right: -220,
                    bottom: -240,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(14,165,233,0.16), transparent 68%)",
                    filter: "blur(10px)",
                    animation:
                        "authGlow 10s ease-in-out infinite",
                    pointerEvents: "none"
                }}
            />

            <Box
                aria-hidden="true"
                sx={{
                    position: "absolute",
                    inset: 0,
                    display: {
                        xs: "none",
                        md: "block"
                    },
                    pointerEvents: "none"
                }}
            >
                {decorativeCandles.map((candle, index) => (
                    <Box
                        key={`${candle.left}-${candle.bottom}`}
                        sx={{
                            position: "absolute",
                            left: candle.left,
                            bottom: candle.bottom,
                            width: 14,
                            height: candle.height,
                            borderRadius: 999,
                            border: "1px solid",
                            borderColor:
                                index % 2 === 0
                                    ? "success.main"
                                    : "primary.main",
                            backgroundColor:
                                index % 2 === 0
                                    ? "rgba(34,197,94,0.12)"
                                    : "rgba(59,130,246,0.12)",
                            boxShadow:
                                index % 2 === 0
                                    ? "0 0 26px rgba(34,197,94,0.12)"
                                    : "0 0 26px rgba(59,130,246,0.12)",
                            animation:
                                "candleFloat 6s ease-in-out infinite",
                            animationDelay: candle.delay,
                            "&::before": {
                                content: "\"\"",
                                position: "absolute",
                                top: -18,
                                left: "50%",
                                width: 1,
                                height: 18,
                                transform: "translateX(-50%)",
                                backgroundColor:
                                    index % 2 === 0
                                        ? "success.main"
                                        : "primary.main",
                                opacity: 0.5
                            },
                            "&::after": {
                                content: "\"\"",
                                position: "absolute",
                                bottom: -20,
                                left: "50%",
                                width: 1,
                                height: 20,
                                transform: "translateX(-50%)",
                                backgroundColor:
                                    index % 2 === 0
                                        ? "success.main"
                                        : "primary.main",
                                opacity: 0.5
                            }
                        }}
                    />
                ))}
            </Box>

            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    maxWidth: 1280
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "0.9fr 1.1fr"
                        },
                        alignItems: "center",
                        gap: {
                            xs: 3,
                            md: 7,
                            lg: 10
                        }
                    }}
                >
                    <Stack
                        spacing={5}
                        sx={{
                            display: {
                                xs: "none",
                                md: "flex"
                            },
                            px: {
                                md: 1,
                                lg: 3
                            }
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={2.5}
                            alignItems="center"
                        >
                            <Box
                                sx={{
                                    width: 74,
                                    height: 74,
                                    flexShrink: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 4,
                                    background:
                                        "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)",
                                    boxShadow:
                                        "0 22px 55px rgba(37,99,235,0.32)",
                                    border:
                                        "1px solid rgba(255,255,255,0.16)"
                                }}
                            >
                                <TrendingUpRounded
                                    sx={{
                                        fontSize: 44,
                                        color: "common.white"
                                    }}
                                />
                            </Box>

                            <Box>
                                <Typography
                                    variant="h3"
                                    fontWeight={900}
                                    sx={{
                                        letterSpacing: "-0.045em",
                                        lineHeight: 1
                                    }}
                                >
                                    Trade
                                    <Box
                                        component="span"
                                        sx={{
                                            ml: 0.8,
                                            color: "primary.main"
                                        }}
                                    >
                                        Pilot Pro
                                    </Box>
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        mt: 1,
                                        fontSize: 16
                                    }}
                                >
                                    Trading Journal & Analytics Platform
                                </Typography>
                            </Box>
                        </Stack>

                        <Stack spacing={2.25}>
                            {platformFeatures.map((feature) => {
                                const FeatureIcon = feature.icon;

                                return (
                                    <Paper
                                        key={feature.title}
                                        elevation={0}
                                        sx={{
                                            p: 2.25,
                                            borderRadius: 3,
                                            border: "1px solid",
                                            borderColor:
                                                "rgba(148,163,184,0.16)",
                                            backgroundColor:
                                                "rgba(15,23,42,0.28)",
                                            backdropFilter:
                                                "blur(12px)",
                                            transition:
                                                "transform 180ms ease, border-color 180ms ease, background-color 180ms ease",
                                            "&:hover": {
                                                transform:
                                                    "translateX(6px)",
                                                borderColor:
                                                    "rgba(59,130,246,0.34)",
                                                backgroundColor:
                                                    "rgba(30,41,59,0.48)"
                                            }
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                        >
                                            <Box
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    flexShrink: 0,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderRadius: 2.5,
                                                    color: "primary.main",
                                                    backgroundColor:
                                                        "rgba(59,130,246,0.12)",
                                                    border:
                                                        "1px solid rgba(59,130,246,0.24)"
                                                }}
                                            >
                                                <FeatureIcon />
                                            </Box>

                                            <Box>
                                                <Typography
                                                    fontWeight={800}
                                                    sx={{
                                                        mb: 0.4,
                                                        fontSize: 17
                                                    }}
                                                >
                                                    {feature.title}
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        lineHeight: 1.65
                                                    }}
                                                >
                                                    {feature.description}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Paper>
                                );
                            })}
                        </Stack>
                    </Stack>

                    <Paper
                        elevation={0}
                        sx={{
                            width: "100%",
                            maxWidth: 680,
                            justifySelf: "center",
                            position: "relative",
                            overflow: "hidden",
                            p: {
                                xs: 3,
                                sm: 5,
                                lg: 6
                            },
                            borderRadius: {
                                xs: 3,
                                sm: 5
                            },
                            border:
                                "1px solid rgba(148,163,184,0.20)",
                            backgroundColor:
                                "rgba(15,23,42,0.72)",
                            backgroundImage:
                                "linear-gradient(145deg, rgba(255,255,255,0.045), rgba(255,255,255,0.005))",
                            backdropFilter: "blur(22px)",
                            boxShadow:
                                "0 36px 100px rgba(0,0,0,0.42)",
                            "&::before": {
                                content: "\"\"",
                                position: "absolute",
                                inset: 0,
                                pointerEvents: "none",
                                background:
                                    "linear-gradient(120deg, rgba(59,130,246,0.08), transparent 34%)"
                            }
                        }}
                    >
                        <Stack
                            spacing={{
                                xs: 3.5,
                                sm: 4.5
                            }}
                            sx={{
                                position: "relative",
                                zIndex: 1
                            }}
                        >
                            <Stack
                                spacing={1.25}
                                textAlign="center"
                            >
                                <Box
                                    sx={{
                                        display: {
                                            xs: "flex",
                                            md: "none"
                                        },
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: 1.25,
                                        mb: 1.5
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 46,
                                            height: 46,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: 2.5,
                                            background:
                                                "linear-gradient(135deg, #2563eb, #0ea5e9)",
                                            boxShadow:
                                                "0 14px 35px rgba(37,99,235,0.28)"
                                        }}
                                    >
                                        <TrendingUpRounded
                                            sx={{
                                                color: "common.white",
                                                fontSize: 29
                                            }}
                                        />
                                    </Box>

                                    <Typography
                                        variant="h5"
                                        fontWeight={900}
                                        sx={{
                                            letterSpacing:
                                                "-0.03em"
                                        }}
                                    >
                                        TradePilot Pro
                                    </Typography>
                                </Box>

                                <Typography
                                    variant="h4"
                                    fontWeight={900}
                                    sx={{
                                        letterSpacing: "-0.035em",
                                        fontSize: {
                                            xs: 28,
                                            sm: 34
                                        }
                                    }}
                                >
                                    {title}
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        maxWidth: 470,
                                        mx: "auto",
                                        lineHeight: 1.7
                                    }}
                                >
                                    {subtitle}
                                </Typography>
                            </Stack>

                            {children}
                        </Stack>
                    </Paper>
                </Box>

                <Stack
                    direction={{
                        xs: "column",
                        sm: "row"
                    }}
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        mt: {
                            xs: 3,
                            md: 5
                        }
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        © 2026 TradePilot Pro.
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Secure Trading Intelligence.
                    </Typography>
                </Stack>
            </Box>
        </Box>
    );
}