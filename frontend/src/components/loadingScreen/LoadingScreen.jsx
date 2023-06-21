import { Box, CircularProgress } from "@mui/material";

function LoadingScreen() {
  return (
    <Box
      style={{
        background: "#EBF5FF",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "50vh",
          color: "#001E3C",
        }}
      >
        <CircularProgress />
      </div>
    </Box>
  );
}

export default LoadingScreen;
