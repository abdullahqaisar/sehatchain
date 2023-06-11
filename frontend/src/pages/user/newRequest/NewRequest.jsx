import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { CustomButton } from "../../../components/elements/customButton";
import CustomSelect from "../components/customSelect/CustomSelect";
import { ethers } from "ethers";

import {
  Typography,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { categories } from "../../../util/diseaseCategory.data";
import { SectionHeading } from "../../../components/elements/sectionHeading/SectionHeading";

const startPayment = async (setTxs, ether, addr) => {
  console.log(ether, addr);
  ether = String(ether);
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether),
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
    return tx;
  } catch (err) {
    console.log(err);
  }
};

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
    const response = await fetch(
      `http://localhost:5000/api/user/hospitals?category=${category}`
    );
    const {
      hospitalNames,
      specs: fetchedSpecs,
      adminAddress,
    } = await response.json();

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
        pb: { xs: 6, md: 6 },
        px: { xs: 3, sm: 6, md: 6 },
      }}
    >
      <SectionHeading title="New Request" align="left" underline="True" />
      <Grid item xs={6} sm={6} md={4}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CustomSelect
            label="Category"
            value={category}
            onChange={handleCategoryChange}
            options={Object.keys(categories).map((key) => ({
              value: key,
              label: categories[key],
            }))}
          />
          <CustomSelect
            label="Specialization"
            value={selectedSpec}
            onChange={handleSpecSelectChange}
            options={specs.map((spec) => ({
              value: spec,
              label: spec,
            }))}
          />
          <FormControl sx={{ mt: 2, mx: 6 }}>
            <InputLabel id="hospitals-select-label">Hospitals</InputLabel>
            <Select
              labelId="hospitals-select"
              id="multi-select"
              multiple
              value={selectedHospitals}
              onChange={handleSelectChange}
              renderValue={() => selectedHospitalsNames.join(", ")}
              sx={{
                bgcolor: "#F1F6FD",
                width: "100%",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#98CDFF",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#98CDFF",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#98CDFF",
                },
              }}
            >
              {hospitalMap &&
                Object.keys(hospitalMap).map((id) => (
                  <MenuItem key={id} value={id}>
                    {hospitalMap[id].name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ mt: 1, mx: 6 }}>
            Total Price: {totalPrice}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1, mx: 6 }}>
            Total Patients: {totalPatients}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CustomButton
          backgroundColor="#217BF4"
          color="#fff"
          buttonText="Pay Now and Start Training"
          onClick={handleSubmit}
        />
      </Grid>
    </Box>
  );
};

export default NewRequest;
