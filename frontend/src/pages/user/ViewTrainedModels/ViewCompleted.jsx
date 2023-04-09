import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import axios from "../../../util/axios";
import { CustomButton } from "../../../components/elements/customButton";
import CustomTextField from "../components/customTextField/CustomTextField";
import FormFields from "./FormFields";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  MenuItem,
} from "@mui/material";

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

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

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
    window.alert("Request Submitted");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <FormFields
          formData={formData}
          setFormData={setFormData}
          spec={request.spec}
        />
      </div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          value={formData.gender}
          onChange={(event) =>
            setFormData({ ...formData, gender: event.target.value })
          }
        >
          <FormControlLabel value="1" control={<Radio />} label="Male" />
          <FormControlLabel value="0" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Chest Pain Type</FormLabel>
        <RadioGroup
          aria-label="chest-pain-type"
          value={formData.chestPainType}
          onChange={(event) =>
            setFormData({ ...formData, chestPainType: event.target.value })
          }
        >
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="Typical Angina"
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label="Atypical Angina"
          />
          <FormControlLabel
            value="3"
            control={<Radio />}
            label="Non-Anginal Pain"
          />
          <FormControlLabel
            value="4"
            control={<Radio />}
            label="Asymptomatic"
          />
        </RadioGroup>
      </FormControl>
      <Grid container alignItems="left" justifyContent="left" mt={2}>
        <Grid item xs={12} md={12} m={2} p={2}>
          <CustomButton
            backgroundColor="#217BF4"
            color="#fff"
            buttonText="Predict"
            onClick={handleSubmit}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ViewCompleted;
