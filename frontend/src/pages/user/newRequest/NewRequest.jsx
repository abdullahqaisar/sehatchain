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

  const fields = [
    {
      label: "Age Limit",
      name: "ageLimit",
      value: formData.ageLimit,
    },
    {
      label: "Price",
      name: "price",
      value: formData.price,
    },
    {
      label: "Disease Category",
      name: "diseaseCategory",
      value: formData.diseaseCategory,
    },
    {
      label: "Disease Name",
      name: "diseaseName",
      value: formData.diseaseName,
    },
    {
      label: "Patient's City",
      name: "patientCity",
      value: formData.patientCity,
    },
    {
      label: "Resting ECG",
      name: "restingECG",
      value: formData.restingECG,
    },
    {
      label: "Cholestrol",
      name: "cholesterol",
      value: formData.cholesterol,
    },
    {
      label: "Fasting Blood Sugar",
      name: "fastingBloodSugar",
      value: formData.fastingBloodSugar,
    },
  ];

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

        {fields.map((field) => (
          <TextFieldGrid
            key={field.name}
            label={field.label}
            name={field.name}
            value={field.value}
            onChange={handleInputChange}
          />
        ))}
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
