import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function CustomCard(props) {
  const navigate = useNavigate();

  const handleViewRequest = (requestId) => {
    navigate(`/sehatchain/user/viewmodels/${requestId}`);
  };

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
          Predicts {props.spec}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          disabled={props.requestStatus !== "Completed"}
          onClick={() => handleViewRequest(props.requestId)}
        >
          {props.requestStatus === "Completed" ? "View Results" : "Pending"}
        </Button>
      </CardActions>
    </Card>
  );
}
