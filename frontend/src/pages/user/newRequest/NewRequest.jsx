import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Typography, Grid } from "@mui/material";

import NewRequestForm from "./NewRequestForm";
import { CustomButton } from "../../../components/elements/customButton";
import { SectionHeading } from "../../../components/elements/sectionHeading/SectionHeading";

import { startPayment } from "../../../util/payment";
import axios from "../../../util/axios";

const NewRequest = () => {
  const [selectedHospitals, setSelectedHospitals] = useState([]);
  const [selectedHospitalsNames, setSelectedHospitalsNames] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState("");
  const [specs, setSpecs] = useState([]);
  const [hospitalMap, setHospitalMap] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [otherSpecs, setOtherSpecs] = useState([]);
  const [otherSelectedSpecs, setOtherSelectedSpecs] = useState([]);
  const [category, setCategory] = useState("");
  const [iterations, setIterations] = useState(1);
  const [adminEth, setAdminEth] = useState(0);
  const [txs, setTxs] = useState([]);

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
        specsUsed: otherSelectedSpecs,
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
      const data = await response.json();
      window.alert("Request Submitted");
      console.log(data);
    } else {
      window.alert("Payment failed");
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
    setOtherSpecs(specs.filter((spec) => spec !== value));
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 2,
            background: "#F5FAFF",
            py: 2,
            px: 2,
            borderRadius: 2,
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={6}>
              <Typography
                sx={{
                  fontSize: 16,
                  textAlign: { xs: "center", sm: "center", md: "left" },
                }}
                color="#071B2F"
              >
                <b>Total Price:</b> {totalPrice} Eth
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Typography
                sx={{
                  fontSize: 16,
                  textAlign: { xs: "center", sm: "center", md: "right" },
                }}
                color="#071B2F"
              >
                <b>Total Patients:</b> {totalPatients}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <CustomButton
          backgroundColor="#217BF4"
          color="#fff"
          buttonText="Submit Request"
          onClick={handleSubmit}
        />
      </Grid>
    </Box>
  );
};

export default NewRequest;
