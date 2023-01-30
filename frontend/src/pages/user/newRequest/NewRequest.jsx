import React, { useState } from "react";

import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CustomButton } from "../../../components/elements/customButton";
import CustomDropdown from "../../../components/elements/customDropdown/CustomDropdown";
import { SectionHeading } from "../components/sectionHeading/SectionHeading";
import TextFieldGrid from "../../../components/elements/textFieldGrid/TextFieldGrid";

const NewRequest = () => {
  const [formData, setFormData] = useState({
    gender: "",
    ageLimit: "",
    price: "",
    diseaseCategory: "",
    diseaseName: "",
    patientCity: "",
    restingECG: "",
    cholesterol: "",
    fastingBloodSugar: "",
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    console.log("submit");
    const response = await fetch("http://localhost:5000/api/user/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(formData);
    const data = await response.json();
    window.alert("Request Submitted");
    console.log(data);
  };

  return (
    <Box
      sx={{
        pt: 6,
        pb: { xs: 6, md: 6 },
        px: { xs: 3, sm: 6, md: 6 },
      }}
    >
      <SectionHeading title="Request a model" align="center" />
      <Typography
        variant="p"
        sx={{
          color: "#656464",
        }}
      >
        Please provide all the specs to start the training of new model
      </Typography>

      <Grid container alignItems="center" justifyContent="center" mt={2}>
        <Grid item xs={12} md={3.5} m={1}>
          <CustomDropdown label="Gender" />
        </Grid>
        <TextFieldGrid
          label="Age Limit"
          name="ageLimit"
          value={formData.ageLimit}
          onChange={handleInputChange}
        />
        <TextFieldGrid
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
        <TextFieldGrid
          label="Disease Category"
          name="diseaseCategory"
          value={formData.diseaseCategory}
          onChange={handleInputChange}
        />
        <TextFieldGrid
          label="Disease Name"
          name="diseaseName"
          value={formData.diseaseName}
          onChange={handleInputChange}
        />
        <TextFieldGrid
          label="Patient's City"
          name="patientCity"
          value={formData.patientCity}
          onChange={handleInputChange}
        />
        <TextFieldGrid
          label="Resting ECG"
          name="restingECG"
          value={formData.restingECG}
          onChange={handleInputChange}
        />
        <TextFieldGrid
          label="Cholestrol"
          name="cholesterol"
          value={formData.cholesterol}
          onChange={handleInputChange}
        />
        <TextFieldGrid
          label="Fasting Blood Sugar"
          name="fastingBloodSugar"
          value={formData.fastingBloodSugar}
          onChange={handleInputChange}
        />
        <Grid item xs={12} md={11} m={2}>
          <CustomButton
            backgroundColor="#217BF4"
            color="#fff"
            buttonText="Make Request"
            onClick={handleSubmit}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewRequest;
