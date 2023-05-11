import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { CustomButton } from "../../../components/elements/customButton";
import Web3 from "web3";
import { ethers } from "ethers";

import {
  Typography,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
  TextField,
} from "@mui/material";
import CustomTextField from "../../../components/elements/customTextField/CustomTextField";

const startPayment = async (setTxs, ether, addr) => {
  console.log(ether, addr);
  // convert ether to string
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
  const [usedSpecs, setUsedSpecs] = useState("");
  const [iterations, setIterations] = useState(1);
  const [adminEth, setAdminEth] = useState(0);
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    const response = await fetch("http://localhost:5000/api/user/hospitals");
    const {
      hospitalNames,
      specs: fetchedSpecs,
      adminAddress,
    } = await response.json();

    console.log("Admin ETH", adminAddress);
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
    setSpecs(fetchedSpecs);
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

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectedHospitals(value);
    const hospitalIds = value.map((hospital) => hospitalMap[hospital].name);
    setSelectedHospitalsNames(hospitalIds);
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

  const handleOtherSpecSelectChange = (event) => {
    const { value } = event.target;
    setOtherSelectedSpecs(value);
  };

  return (
    <Box sx={{ pt: 6, pb: { xs: 6, md: 6 }, px: { xs: 3, sm: 6, md: 6 } }}>
      <Grid container alignItems="center" justifyContent="center" mt={2}>
        <Grid item xs={8} md={8} m={2} p={2}>
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
                renderValue={() => selectedHospitalsNames.join(", ")}
              >
                {hospitalMap &&
                  Object.keys(hospitalMap).map((id) => (
                    <MenuItem key={id} value={id}>
                      {hospitalMap[id].name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl sx={{ mt: 2, minWidth: 300, mx: 6 }}>
              <InputLabel id="spec-select-label">Specialization</InputLabel>
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
            <FormControl sx={{ mt: 2, minWidth: 300, mx: 6 }}>
              <InputLabel id="other-spec-select">
                Specs to Predict From
              </InputLabel>
              <Select
                labelId="other-spec-select"
                label="Other Specs"
                id="other-spec-select"
                variant="standard"
                multiple
                value={otherSelectedSpecs}
                onChange={handleOtherSpecSelectChange}
              >
                {otherSpecs.map((spec) => (
                  <MenuItem key={spec} value={spec}>
                    {spec}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Iterations"
              type="number"
              // value={value}
              // onChange={onChange}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={12} m={2} p={2}>
          <Typography variant="h6" sx={{ mt: 2, mx: 6 }}>
            Total Price: {totalPrice}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, mx: 6 }}>
            Total Patients: {totalPatients}
          </Typography>
        </Grid>
        <Grid container alignItems="left" justifyContent="left" mt={2}>
          <Grid item xs={12} md={12} m={2} p={2}>
            <CustomButton
              backgroundColor="#217BF4"
              color="#fff"
              buttonText="Pay Now and Start Training"
              onClick={handleSubmit}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewRequest;
