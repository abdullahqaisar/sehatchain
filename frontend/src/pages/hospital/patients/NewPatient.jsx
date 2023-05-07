import { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "../../../util/axios";

import { CustomButton } from "../../../components/elements/customButton";
import { SectionHeading } from "../../user/components/sectionHeading/SectionHeading";

const NewPatient = () => {
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState(null);
  const [patients, setPatients] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const handleUpload = async (event) => {
    event.preventDefault();
    console.log("hospital id:", localStorage.getItem("hospitalToken"));
    if (!file) {
      console.log("No file selected");
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("price", price);
      console.log("form", formData);
      formData.append("totalPatients", patients);
      const response = await axios({
        method: "post",
        url: "/hospital/uploadcsv",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${localStorage.getItem("hospitalToken")}`,
        },
      });

      console.log("response:", response);
    } catch (error) {
      console.log(error);
    }
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
        Add Multiple patients by uploading a CSV file
      </Typography>
      <Box sx={{ mx: 6, my: 2, backgroundColor: "#F1F6FD" }}>
        <Grid container alignItems="center" justifyContent="center" mt={2}>
          <Grid item xs={12} md={12} m={2} p={2}>
            <input
              type={"file"}
              accept={".csv"}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <TextField
              sx={{ minWidth: 250 }}
              label="Price per 100 Patients in ETH"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              sx={{ minWidth: 250 }}
              label="Total Patients in CSV"
              type="number"
              value={patients}
              onChange={(e) => setPatients(e.target.value)}
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center" justifyContent="center" mt={2}>
          <Grid item xs={12} md={12} m={2} p={2}>
            <CustomButton
              backgroundColor="#217BF4"
              color="#fff"
              buttonText="Upload"
              onClick={handleUpload}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default NewPatient;
