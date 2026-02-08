import { Box, Typography } from "@mui/material";

function Grind() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box
        component="img"
        src="/sten-grind.jpg"
        alt="The grind never stops"
        sx={{
          maxWidth: "500px",
          width: "100%",
          borderRadius: "8px",
          mb: 4,
          boxShadow: "0 0 40px rgba(140, 226, 30, 0.3)",
        }}
      />
      <Typography
        variant="h3"
        sx={{
          color: "#8CE21E",
          fontWeight: "bold",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          mb: 2,
        }}
      >
        We Work All Night
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "rgba(255,255,255,0.4)",
          fontSize: "0.75rem",
        }}
      >
        🌊 Rising Tide Capital Partners
      </Typography>
    </Box>
  );
}

export default Grind;
