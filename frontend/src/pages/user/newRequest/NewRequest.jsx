import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";

import NewRequestForm from "./NewRequestForm";
import NewRequestSummary from "./NewRequestSummary";
import { CustomButton } from "../../../components/elements/customButton";
import { SectionHeading } from "../../../components/elements/sectionHeading/SectionHeading";

import { startPayment } from "../../../util/payment";
import axios from "../../../util/axios";

import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const NewRequest = () => {
  const [selectedHospitals, setSelectedHospitals] = useState([]);
  const [selectedHospitalsNames, setSelectedHospitalsNames] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState("");
  const [specs, setSpecs] = useState([]);
  const [hospitalMap, setHospitalMap] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [category, setCategory] = useState("");
  const [iterations, setIterations] = useState(1);
  const [adminEth, setAdminEth] = useState(0);
  const [txs, setTxs] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  useEffect(() => {
    fetchMenuItems();
  }, [category]);

  const fetchMenuItems = async () => {
    const response = await axios.get(`/user/hospitals?category=${category}`);
    const { hospitalNames, specs: fetchedSpecs, adminAddress } = response.data;

    const hospitalData = hospitalNames.reduce((data, hospital) => {
      const [name, id, price, totalPatients] = hospital.split(", ");
      data[id] = {
        name,
        price: Number(price),
        totalPatients: Number(totalPatients),
        id,
      };
      return data;
    }, {});

    setHospitalMap(hospitalData);
    setSpecs(fetchedSpecs[category]);
    setAdminEth(adminAddress);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSubmit = async () => {
    const payment = await startPayment(setTxs, totalPrice, adminEth);
    if (payment) {
      const totalHospitals = selectedHospitals.length;
      const formData = {
        hospitals: selectedHospitals,
        spec: selectedSpec,
        totalHospitals,
        totalPrice,
        totalPatients,
        iterations,
        category,
      };

      const response = await axios({
        method: "post",
        url: "/user/request",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formData,
      });
      if (response.status === 200) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Request Sent! Please wait 24 hours for approval.");
        setSnackbarOpen(true);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error making request, please try again");
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarSeverity("error");
      setSnackbarMessage("Payment failed");
      setSnackbarOpen(true);
    }
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setCategory(value);
    fetchMenuItems();
  };

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectedHospitals(value);
    const hospitalIds = value.map((hospital) => hospitalMap[hospital].name);
    setSelectedHospitalsNames(hospitalIds);
    console.log(selectedHospitalsNames);
    const price = value.reduce(
      (total, hospital) => total + hospitalMap[hospital].price,
      0
    );
    setTotalPrice(price);
    const patients = value.reduce(
      (total, hospital) => total + hospitalMap[hospital].totalPatients,
      0
    );
    setTotalPatients(patients);
  };

  const handleSpecSelectChange = (event) => {
    const { value } = event.target;
    setSelectedSpec(value);
  };

  return (
    <Box
      sx={{
        pt: 6,
        px: 6,
        pb: 4,
      }}
    >
      <SectionHeading title="New Request" align="left" underline="True" />
      <Grid
        item
        xs={6}
        sm={6}
        md={4}
        sx={{
          px: { xs: 3, sm: 4, md: 14, lg: 20 },
        }}
      >
        <NewRequestForm
          category={category}
          handleCategoryChange={handleCategoryChange}
          selectedSpec={selectedSpec}
          handleSpecSelectChange={handleSpecSelectChange}
          specs={specs}
          selectedHospitals={selectedHospitals}
          handleSelectChange={handleSelectChange}
          selectedHospitalsNames={selectedHospitalsNames}
          hospitalMap={hospitalMap}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        sx={{
          px: { xs: 3, sm: 6, md: 14, lg: 20 },
        }}
      >
        <NewRequestSummary
          totalPrice={totalPrice}
          totalPatients={totalPatients}
        />
        <CustomButton
          backgroundColor="#217BF4"
          color="#fff"
          buttonText="Submit Request"
          onClick={handleSubmit}
        />
      </Grid>
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
    </Box>
  );
};

export default NewRequest;
