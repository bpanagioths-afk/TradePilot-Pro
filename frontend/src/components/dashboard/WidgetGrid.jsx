import { Box } from "@mui/material";

function WidgetGrid({ children }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          lg: "repeat(12, 1fr)",
        },
        gap: 3,
        alignItems: "stretch",
      }}
    >
      {children}
    </Box>
  );
}

export default WidgetGrid;