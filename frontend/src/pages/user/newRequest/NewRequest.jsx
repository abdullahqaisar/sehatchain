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

const NewRequest = () => {
  const [selectedHospitals, setSelectedHospitals] = useState([]);
  const [selectedHospitalsId, setSelectedHospitalsId] = useState([]);

  const [selectedSpec, setSelectedSpec] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [specs, setSpecs] = useState([]);
  const [hospitalMap, setHospitalMap] = useState({});
  useEffect(() => {
    const fetchMenuItems = async () => {
      const response = await fetch("http://localhost:5000/api/user/hospitals");
      const { hospitalNames, specs: fetchedSpecs } = await response.json();

      const hospitals = hospitalNames.map((hospital) => {
        return hospital.split(",")[0];
      });

      hospitalNames.forEach((hospital) => {
        const [name, id] = hospital.split(", ");
        setHospitalMap((prev) => ({ ...prev, [name]: id }));
      });

      setHospitals(hospitals);
      setSpecs(fetchedSpecs);
    };

    fetchMenuItems();
  }, []);

  const handleSubmit = async () => {
    const totalHospitals = selectedHospitals.length;

    const formData = {
      hospitals: selectedHospitalsId,
      spec: selectedSpec,
      totalHospitals,
    };

    const response = await fetch("http://localhost:5000/api/user/request", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    window.alert("Request Submitted");
    console.log(data);
  };

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectedHospitals(value);
    const hospitalIds = value.map((hospital) => hospitalMap[hospital]);
    setSelectedHospitalsId(hospitalIds);
    console.log(hospitalIds);
  };

  const handleSpecSelectChange = (event) => {
    setSelectedSpec(event.target.value);
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
                  {hospitals.map((hospital) => (
                    <MenuItem
                      key={hospital.split(",")[1]}
                      value={hospital.split(",")[0]}
                    >
                      {hospital.split(",")[0]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ mt: 2, minWidth: 300, mx: 6 }}>
                <InputLabel id="spec-select">
                  Label you want prediction on
                </InputLabel>
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
