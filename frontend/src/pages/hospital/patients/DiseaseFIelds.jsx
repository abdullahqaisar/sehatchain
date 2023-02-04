import React from "react";
import { Grid } from "@mui/material";
import TextFieldGrid from "../../../components/elements/textFieldGrid/TextFieldGrid";

const DiseaseFields = ({ formData, handleInputChange }) => {
  const diseaseFields = [
    {
      label: "Disease Name",
      name: "diseaseName",
      value: formData.diseaseName,
    },
    {
      label: "Disease Category",
      name: "diseaseCategory",
      value: formData.diseaseCategory,
    },
    {
      label: "Resting ECG",
      name: "restingECG",
      value: formData.restingECG,
    },
    {
      label: "Max Heart Rate",
      name: "maxHeartRate",
      value: formData.maxHeartRate,
    },
    {
      label: "Cholesterol",
      name: "cholesterol",
      value: formData.cholesterol,
    },
    {
      label: "Fasting Blood Sugar",
      name: "fastingBloodSugar",
      value: formData.fastingBloodSugar,
    },
  ];

  return (
    <Grid container alignItems="center" justifyContent="center">
      {diseaseFields.map((field) => (
        <TextFieldGrid
          label={field.label}
          name={field.name}
          value={field.value}
          onChange={handleInputChange}
        />
      ))}
    </Grid>
  );
};

export default DiseaseFields;
