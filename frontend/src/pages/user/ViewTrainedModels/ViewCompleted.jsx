import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import axios from "../../../util/axios";
import { CustomButton } from "../../../components/elements/customButton";
import FormFields from "./FormFields";

import { SectionHeading } from "../components/sectionHeading/SectionHeading";

const ViewCompleted = () => {
  const req = useParams();
  const [request, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    chestPainType: "",
    restingBP: "",
    serumCholestoral: "",
    fastingBP: "",
    restingElectrocardiographic: "",
    maximumHeartRate: "",
    exerciseInducedAngina: "",
    oldpeak: "",
    slopePeakEx: "",
    noOfMajorVessels: "",
    thal: "",
    num: "",
  });
  const [result, setResult] = useState([]);

  async function fetchData() {
    const response = await axios({
      method: "get",
      url: "/user/requests/" + req.req_id,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setRequests(response.data.request);
  }

  const handleSubmit = async () => {
    console.log(formData);
    const response = await axios({
      method: "post",
      url: "/user/requests/" + req.req_id + "/predict",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        requestId: req.req_id,
        formData,
      },
    });
    console.log(response.data);
    if (response.status === 200) {
      console.log(response.data.prediction);
      setResult(response.data.prediction);
    }

    window.alert("Request Submitted");
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <Box
      sx={{
        pt: 6,
        pb: { xs: 6, md: 6 },
        px: { xs: 3, sm: 6, md: 6 },
      }}
    >
      <SectionHeading title="Make a Prediction" align="center" />
      <Typography
        variant="body1"
        sx={{
          color: "#656464",
        }}
      >
        Please provide all the give specs to predict your required value
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mx: 6, my: 2, backgroundColor: "#F1F6FD", py: 4 }}>
          <div>
            <FormFields
              formData={formData}
              setFormData={setFormData}
              spec={request.spec}
            />
          </div>

          <Grid container alignItems="center" justifyContent="center" px={10}>
            <Grid item xs={12} md={12} m={2} p={2}>
              <CustomButton
                backgroundColor="#217BF4"
                color="#fff"
                buttonText="Predict"
                onClick={handleSubmit}
              />
            </Grid>
          </Grid>
          {result.length !== 0 && (
            <Box mt={2}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#217BF4",
                }}
              >
                Results
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "400",
                  color: "#000",
                }}
              >
                {request.spec}: {result} 
              </Typography>
            </Box>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default ViewCompleted;
