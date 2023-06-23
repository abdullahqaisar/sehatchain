import { Box } from "@mui/system";
import { Typography, Grid } from "@mui/material";

const NewRequestSummary = ({ totalPrice, totalPatients }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        my: 2,
        background: "#F5FAFF",
        py: 2,
        px: 2,
        borderRadius: 2,
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <Typography
            sx={{
              fontSize: 16,
              textAlign: { xs: "center", sm: "center", md: "left" },
            }}
            color="#071B2F"
          >
            <b>Total Price:</b> {totalPrice} Eth
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Typography
            sx={{
              fontSize: 16,
              textAlign: { xs: "center", sm: "center", md: "right" },
            }}
            color="#071B2F"
          >
            <b>Total Patients:</b> {totalPatients}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewRequestSummary;
