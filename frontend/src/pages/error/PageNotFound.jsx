import { Box } from "@mui/material";

function PageNotFound() {
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
        <b>404</b>
        <span style={{ margin: "0 10px" }}>|</span> This Page could not be found
      </div>
    </Box>
  );
}

export default PageNotFound;
