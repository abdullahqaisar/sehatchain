import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { CustomButton } from "../../../components/elements/customButton";
import CustomDropdown from "../../../components/elements/customDropdown/CustomDropdown";
import { SectionHeading } from "../../user/components/sectionHeading/SectionHeading";
import TextFieldGrid from "../../../components/elements/textFieldGrid/TextFieldGrid";

const NewPatient = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    address: "",
    contact: "",
    gender: "",
    diseaseName: "",
    diseaseCategory: "",
    restingECG: "",
    maxHeartRate: "",
    cholesterol: "",
    fastingBloodSugar: "",
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    console.log("submit");
    const response = await fetch(
      "http://localhost:5000/api/hospital/addpatient",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    console.log(formData);
    const data = await response.json();
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
      <SectionHeading title="Add a patient" align="center" />
      <Typography
        mt={2}
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#217BF4",
        }}
      >
        Personal Information
      </Typography>

      <Grid container alignItems="center" justifyContent="center" mt={2}>
        <TextFieldGrid
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextFieldGrid
          label="Age"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
        />
        <TextFieldGrid
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextFieldGrid
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <TextFieldGrid
          label="Contact No."
          name="contact"
          value={formData.contact}
          onChange={handleInputChange}
        />
        <Grid item xs={12} md={3.5} m={1}>
          <CustomDropdown label="Gender" />
        </Grid>
      </Grid>
      <Typography
        mt={2}
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#217BF4",
        }}
      >
        Medical Information
      </Typography>
      <Grid container alignItems="center" justifyContent="center" mt={2}>
        <TextFieldGrid
          label="Disease Name"
          name="diseaseName"
          value={formData.diseaseName}
          onChange={handleInputChange}
        />

        <TextFieldGrid
          label="Disease Category"
          name="diseaseCategory"
          value={formData.diseaseCategory}
          onChange={handleInputChange}
        />

        <TextFieldGrid
          label="Resting ECG"
          name="restingECG"
          value={formData.restingECG}
          onChange={handleInputChange}
        />

        <TextFieldGrid
          label="Max. Heart Rate"
          name="maxHeartRate"
          value={formData.maxHeartRate}
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
            buttonText="Add Patient"
            onClick={handleSubmit}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewPatient;
