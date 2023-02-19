import React, { useState, useEffect } from "react";

import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CustomButton } from "../../../components/elements/customButton";
import CustomDropdown from "../../../components/elements/customDropdown/CustomDropdown";
import { SectionHeading } from "../components/sectionHeading/SectionHeading";
import TextFieldGrid from "../../../components/elements/textFieldGrid/TextFieldGrid";

import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
  IconButton,
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";

import styled from "@emotion/styled";

const useStyles = styled((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  inputBox: {
    display: "flex",
    alignItems: "center",
  },
  inputLabel: {
    marginRight: theme.spacing(1),
  },
}));

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

  const classes = useStyles();
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedField, setSelectedField] = useState("");

  const handleSelectChange = (event) => {
    setSelectedValues(event.target.value);
    setSelectedField(event.target.value.join(", "));
  };

  const handleClearClick = () => {
    setSelectedValues([]);
    setSelectedField("");
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

      <Box sx={{ mx: 6, my: 2, backgroundColor: "#F1F6FD " }}>
        <Grid container alignItems="left" justifyContent="left" mt={2}>
          <Grid item xs={12} md={12} m={2} p={2}>
            <Typography
              variant="p"
              sx={{
                color: "#656464",
              }}
            >
              Please provide all the specs to start the training of new model
            </Typography>
            <div>
              <div className={classes.inputBox}>
                <InputLabel className={classes.inputLabel}>
                  Hospitals:
                </InputLabel>
                <Input value={selectedField} disabled={!selectedField} />
                {selectedField && (
                  <IconButton onClick={handleClearClick}>
                    <ClearIcon />
                  </IconButton>
                )}
              </div>
              <FormControl className={classes.formControl}>
                <InputLabel id="multi-select-label">Select</InputLabel>
                <Select
                  labelId="multi-select-label"
                  id="multi-select"
                  multiple
                  value={selectedValues}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="option1">Option 1</MenuItem>
                  <MenuItem value="option2">Option 2</MenuItem>
                  <MenuItem value="option3">Option 3</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
        </Grid>
      </Box>

      {/* <Grid container alignItems="center" justifyContent="center" mt={2}>
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
      </Grid> */}
    </Box>
  );
};

export default NewRequest;
