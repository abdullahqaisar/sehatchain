import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function RequestCard(props) {
  return (
    <Card
      elevation={0}
      sx={{ minWidth: 275, borderRadius: "0", border: "2px solid #EBF5FF" }}
    >
      <Box
        sx={{
          backgroundColor: "#EBF5FF",
          height: "50px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontSize: 14, marginLeft: "16px", fontWeight: "bold" }}
          color="#071B2F"
        >
          Request #{props.requestNumber}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography sx={{ fontSize: 14, marginRight: "16px" }} color="#071B2F">
          {props.formattedDate}
        </Typography>
      </Box>
      <CardContent align="left">
        <Typography sx={{ fontSize: 17, fontWeight: "bold" }} color="#071B2F">
          {props.diseaseCategory === "0"
            ? "Heart Disease Prediction Model"
            : "Lung Cancer Prediction Model"}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="#071B2F">
          <b>Status:</b>{" "}
          {props.requestStatus === "Completed"
            ? "Training Completed"
            : "Pending"}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="#071B2F">
          Predicts {props.spec}
        </Typography>
      </CardContent>
    </Card>
  );
}
