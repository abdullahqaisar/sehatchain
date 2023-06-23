import { useState, useEffect } from "react";
import axios from "../../../util/axios";
import CustomCard from "../../../components/elements/customCard/CustomCard";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid, Box } from "@mui/material";
import { ParagraphText } from "../../../components/elements/paragraphText/ParagraphText";
import { SectionHeading } from "../../../components/elements/sectionHeading/SectionHeading";

function TrainedModels() {
  const [requests, setRequests] = useState([""]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const response = await axios({
      method: "get",
      url: "/user/requests/completed",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setRequests(response.data.requests);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        pt: 6,
        pb: { xs: 6, md: 6 },
        px: { xs: 3, sm: 6, md: 6 },
      }}
    >
      <SectionHeading title="Your Requests" align="left" underline="True" />
      {loading ? (
        <CircularProgress />
      ) : !requests || requests.length === 0 ? (
        <ParagraphText
          text="You have received no trained model yet!"
          align="left"
        />
      ) : (
        <Grid container spacing={2}>
          {requests.map((request, index) => (
            <Grid item xs={12} sm={6} key={request._id}>
              <CustomCard
                requestId={request._id}
                diseaseCategory={request.diseaseCategory}
                spec={request.spec}
                requestNumber={index + 1}
                requestStatus={request.status}
                formattedDate={request.formattedDate}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default TrainedModels;
