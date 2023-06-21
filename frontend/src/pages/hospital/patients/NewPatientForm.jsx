import { useState } from "react";
import { Box, Grid } from "@mui/material";
import axios from "../../../util/axios";

import { categories } from "../../../util/diseaseCategory.data";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import { CustomButton } from "../../../components/elements/customButton";
import CustomSelect from "../../../components/elements/customSelect/CustomSelect";
import CustomTextField from "../../../components/elements/customTextField/CustomTextField";

const NewPatientForm = () => {
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState(null);
  const [patients, setPatients] = useState(null);
  const [category, setCategory] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

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
        setSnackbarSeverity("success");
        setSnackbarMessage("File Uploaded Successfully");
        setSnackbarOpen(true);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error uploading file, please try again");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error uploading file, please try again");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <input
        label="Upload CSV"
        type={"file"}
        accept={".csv"}
        onChange={(e) => setFile(e.target.files[0])}
      />
      <CustomSelect
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={Object.keys(categories).map((key) => ({
          value: key,
          label: categories[key],
        }))}
      />

      <CustomTextField
        label="Price per 100 Patients in ETH"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <CustomTextField
        label="Total Patients in CSV"
        type="number"
        value={patients}
        onChange={(e) => setPatients(e.target.value)}
      />
      <Grid sx={{ marginTop: "1rem" }}>
        <CustomButton
          backgroundColor="#217BF4"
          color="#fff"
          buttonText="Upload"
          onClick={handleUpload}
        />
      </Grid>
    </Box>
  );
};

export default NewPatientForm;
