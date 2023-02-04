import React from "react";
import { Grid } from "@mui/material";
import CustomDropdown from "../../../components/elements/customDropdown/CustomDropdown";
import TextFieldGrid from "../../../components/elements/textFieldGrid/TextFieldGrid";

const PatientFields = ({ formData, handleInputChange }) => {
  const patientFields = [
    {
      label: "Name",
      name: "name",
      value: formData.name,
    },
    {
      label: "Age",
      name: "age",
      value: formData.age,
    },
    {
      label: "Email",
      name: "email",
      value: formData.email,
    },
    {
      label: "Address",
      name: "address",
      value: formData.address,
    },
    {
      label: "Contact",
      name: "contact",
      value: formData.contact,
    },
  ];

  return (
    <Grid container alignItems="center" justifyContent="center">
      {patientFields.map((field) => (
        <TextFieldGrid
          label={field.label}
          name={field.name}
          value={field.value}
          onChange={handleInputChange}
        />
      ))}

      <Grid item xs={12} md={3.5} m={1}>
        <CustomDropdown label="Gender" />
      </Grid>
    </Grid>
  );
};

export default PatientFields;
