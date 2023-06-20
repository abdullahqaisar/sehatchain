import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";

import axios from "../../../util/axios";
import { CustomButton } from "../../../components/elements/customButton";
import ModelResultForm from "./modelResultForm/ModelResultForm";

import { SectionHeading } from "../../../components/elements/sectionHeading/SectionHeading";
import { heartSelect } from "./modelResultForm/selects.data";
import { lungSelect } from "./modelResultForm/selects.data";

import PredictionResult from "./PredictionResult";

const ModelResult = () => {
  const req = useParams();
  const [request, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    // heart disease fields
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

    // lung disease fields
    GENDER: "",
    AGE: "",
    SMOKING: "",
    ALLERGY: "",
    WHEEZING: "",
    ALCOHOL_CONSUMING: "",
    COUGHING: "",
    SHORTNESS_OF_BREATH: "",
    SWALLOWING_DIFFICULTY: "",
    CHEST_PAIN: "",
    LUNG_CANCER: "",
    ANXIETY: "",
    YELLOW_FINGERS: "",
    PEER_PRESSURE: "",
    CHRONIC_DISEASE: "",
    FATIGUE: "",
  });
  const [result, setResult] = useState([]);

  const [loading, setLoading] = useState(true);
  const [resultLoading, setResultLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const response = await axios({
      method: "get",
      url: "/user/requests/" + req.req_id,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      console.log(response.data.request);
      setRequests(response.data.request);
    } else {
      window.alert("Request not found");
    }
    setLoading(false);
  }

  const handleSubmit = async () => {
    setResultLoading(true);
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
        diseaseCategory: request.diseaseCategory,
      },
    });
    if (response.status === 200) {
      console.log(response.data.prediction);
      setResult(response.data.prediction);
      const spec = response.data.spec;
      if (request.diseaseCategory === "0") {
        const specs = [
          "gender",
          "chest_pain_type",
          "fasting_BP",
          "resting_electrocardiographic",
          "exercise_induced_angina",
          "slope_peak_ex",
          "no_of_major_vessels",
          "thal",
          "num",
        ];

        if (specs.includes(spec)) {
          const key = heartSelect[spec];
          const value = Number(response.data.prediction);
          const val = key[value - 1].label;
          setResult(val);
        }
        setResultLoading(false);
      } else if (request.diseaseCategory === "1") {
        const specs = [
          "GENDER",
          "SMOKING",
          "ALLERGY",
          "WHEEZING",
          "ALCOHOL_CONSUMING",
          "COUGHING",
          "SHORTNESS_OF_BREATH",
          "SWALLOWING_DIFFICULTY",
          "CHEST_PAIN",
          "LUNG_CANCER",
          "ANXIETY",
          "YELLOW_FINGERS",
          "PEER_PRESSURE",
          "CHRONIC_DISEASE",
          "FATIGUE",
        ];
        if (specs.includes(spec)) {
          const key = lungSelect[spec];
          const value = Number(response.data.prediction);
          const val = key[value - 1].label;
          setResult(val);
        }

        setResultLoading(false);
      }
    } else {
      setResultLoading(false);
      window.alert("Request not found");
    }
  };

  useEffect(() => {
    fetchData();
    console.log("requesttt ", request);
  }, []);

  return (
    <Box
      sx={{
        pt: 6,
        pb: { xs: 6, md: 6 },
        px: { xs: 3, sm: 6, md: 6 },
      }}
    >
      <SectionHeading title="Predict Result" align="left" underline="True" />
      {loading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid
            item
            xs={6}
            sm={6}
            md={4}
            sx={{
              px: { xs: 3, sm: 4, md: 14, lg: 20 },
            }}
          >
            <ModelResultForm
              formData={formData}
              setFormData={setFormData}
              spec={request.spec}
              diseaseCategory={request.diseaseCategory}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={4}
            sx={{
              px: { xs: 3, sm: 4, md: 14, lg: 20 },
              mt: 4,
            }}
          >
            <CustomButton
              backgroundColor="#217BF4"
              color="#fff"
              buttonText="Predict"
              onClick={handleSubmit}
            />
          </Grid>

          <Grid mt={6}>
            {result.length === 0 ? (
              <></>
            ) : (
              <>
                {resultLoading ? (
                  <CircularProgress />
                ) : (
                  <PredictionResult
                    spec={request.spec}
                    result={result}
                    loading={resultLoading}
                  />
                )}
              </>
            )}
          </Grid>
        </form>
      )}
    </Box>
  );
};

export default ModelResult;
