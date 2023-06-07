import { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "../../../util/axios";

import { categories } from "../../../util/diseaseCategory.data";

import { CustomButton } from "../../../components/elements/customButton";
import { SectionHeading } from "../../user/components/sectionHeading/SectionHeading";

const NewPatient = () => {
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState(null);
  const [patients, setPatients] = useState(null);
  const [category, setCategory] = useState("");
  const [diseaseName, setDiseaseName] = useState("");

  const handleUpload = async (event) => {
    event.preventDefault();
    console.log("hospital id:", localStorage.getItem("hospitalToken"));
    if (!file) {
      console.log("No file selected");
    }

    try {
      const formData = new FormData();
      formData.append("category", category);
      formData.append("file", file);
      formData.append("price", price);
      // formData.append("diseaseName", diseaseName);
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

      if (response.status === 200) {
        window.alert("File uploaded successfully");
      } else {
        window.alert("Something went wrong! Try again");
      }
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
      alignItems="left"
      justifyContent="left"
    >
      <SectionHeading title="Add a patient" align="center" />
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#217BF4",
        }}
      >
        Add Multiple patients by uploading a CSV file
      </Typography>
      <Box sx={{ mx: 8, my: 1 }} alignItems="left" justifyContent="left">
        <Grid container alignItems="left" justifyContent="left" mt={2}>
          <Grid item xs={10} md={12}>
            <Grid m={1}>
              <FormControl>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select"
                  id="category-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  sx={{ minWidth: 250 }}
                >
                  {Object.keys(categories).map((key) => (
                    <MenuItem key={key} value={key}>
                      {categories[key]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* 
            <Grid>
              <TextField
                sx={{ minWidth: 250 }}
                label="Disease Name"
                value={diseaseName}
                onChange={(e) => setDiseaseName(e.target.value)}
                mx={2}
                px={2}
              />
            </Grid> */}
          </Grid>
        </Grid>

        <Grid container alignItems="left" justifyContent="left" mt={2}>
          <Grid item xs={12} md={12} m={1}>
            <input
              label="Upload CSV"
              type={"file"}
              accept={".csv"}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Grid>
        </Grid>

        <Grid container alignItems="left" justifyContent="left" mt={2}>
          <Grid item xs={12} md={12} m={2} p={2}>
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

        <Grid container alignItems="left" justifyContent="left" mt={2}>
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
