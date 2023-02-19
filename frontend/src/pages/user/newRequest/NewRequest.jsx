import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { SectionHeading } from "../components/sectionHeading/SectionHeading";
import { CustomButton } from "../../../components/elements/customButton";

import {
  Typography,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

import { styled } from "@mui/material/styles";

const NewRequest = () => {
  const handleSubmit = async () => {
    console.log(selectedHospitals);
    console.log(selectedSpec);

    const formData = {
      hospitals: selectedHospitals,
      spec: selectedSpec,
    };
    const response = await fetch("http://localhost:5000/api/user/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    window.alert("Request Submitted");
    console.log(data);
  };
  const [selectedHospitals, setSelectedHospitals] = useState([]);
  const [selectedHospitalsField, setSelectedHospitalsField] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("");

  const [hospitalNames, setHospitalNames] = useState([]);
  const [specs, setSpecs] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const response = await fetch("http://localhost:5000/api/user/hospitals");
      const data = await response.json();
      setHospitalNames(data.hospitalNames);
      setSpecs(data.specs);
    };

    fetchMenuItems();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedHospitals(event.target.value);
    setSelectedHospitalsField(event.target.value.join(", "));
  };

  const handleSpecSelectChange = (event) => {
    setSelectedSpec(event.target.value);
    console.log(selectedSpec);
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
        variant="body1"
        sx={{
          color: "#656464",
        }}
      >
        Please provide all the specs to start the training of new model
      </Typography>

      <Box sx={{ mx: 6, my: 2, backgroundColor: "#F1F6FD" }}>
        <Grid container alignItems="left" justifyContent="left" mt={2}>
          <Grid item xs={12} md={12} m={2} p={2}>
            <div>
              <FormControl sx={{ mt: 2, minWidth: 300, mx: 6 }}>
                <InputLabel id="hospitals-select-label">Hospitals</InputLabel>
                <Select
                  labelId="hospitals-select"
                  id="multi-select"
                  multiple
                  variant="standard"
                  value={selectedHospitals}
                  onChange={handleSelectChange}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {hospitalNames.map((hospital) => (
                    <MenuItem key={hospital} value={hospital}>
                      {hospital}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ mt: 2, minWidth: 300, mx: 6 }}>
                <InputLabel id="spec-select">Label you want prediction on</InputLabel>
                <Select
                  labelId="spec-select"
                  id="spec-select"
                  variant="standard"
                  value={selectedSpec}
                  onChange={handleSpecSelectChange}
                >
                  {specs.map((spec) => (
                    <MenuItem key={spec} value={spec}>
                      {spec}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Grid>
        </Grid>

        <Grid container alignItems="left" justifyContent="left" mt={2}>
          <Grid item xs={12} md={12} m={2} p={2}>
            <CustomButton
              backgroundColor="#217BF4"
              color="#fff"
              buttonText="Make Request"
              onClick={handleSubmit}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default NewRequest;
