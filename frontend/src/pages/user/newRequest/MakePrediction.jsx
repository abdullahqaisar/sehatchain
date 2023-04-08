import React, { useState } from "react";
import {
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
  MenuItem,
} from "@mui/material";

function HeartDiseaseForm() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [chestPainType, setChestPainType] = useState("");
  const [restingBP, setRestingBP] = useState("");
  const [serumCholestoral, setSerumCholestoral] = useState("");
  const [fastingBP, setFastingBP] = useState("");
  const [restingElectrocardiographic, setRestingElectrocardiographic] =
    useState("");
  const [maximumHeartRate, setMaximumHeartRate] = useState("");
  const [exerciseInducedAngina, setExerciseInducedAngina] = useState("");
  const [oldpeak, setOldpeak] = useState("");
  const [slopePeakEx, setSlopePeakEx] = useState("");
  const [noOfMajorVessels, setNoOfMajorVessels] = useState("");
  const [thal, setThal] = useState("3");
  const [num, setNum] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data, e.g. submit it to a server
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Age"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: 29,
          max: 80,
        }}
        value={age}
        onChange={(event) => setAge(event.target.value)}
      />
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        >
          <FormControlLabel value="1" control={<Radio />} label="Male" />
          <FormControlLabel value="0" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Chest Pain Type</FormLabel>
        <RadioGroup
          aria-label="chest-pain-type"
          value={chestPainType}
          onChange={(event) => setChestPainType(event.target.value)}
        >
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="Typical Angina"
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label="Atypical Angina"
          />
          <FormControlLabel
            value="3"
            control={<Radio />}
            label="Non-Anginal Pain"
          />
          <FormControlLabel
            value="4"
            control={<Radio />}
            label="Asymptomatic"
          />
        </RadioGroup>
      </FormControl>
      <TextField
        label="Resting Blood Pressure"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: 90,
          max: 200,
        }}
        value={restingBP}
        onChange={(event) => setRestingBP(event.target.value)}
      />
      <TextField
        label="Serum Cholestoral"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: 90,
          max: 200,
        }}
        value={serumCholestoral}
        onChange={(event) => setSerumCholestoral(event.target.value)}
      />
      <TextField
        label="Fasting Blood Sugar"
        type="number"
        inputProps={{
          min: 0,
          max: 1,
        }}
        value={fastingBP}
        onChange={(event) => setFastingBP(event.target.value)}
      />
      <TextField
        label="Resting Electrocardiographic Results"
        type="number"
        inputProps={{
          min: 0,
          max: 2,
        }}
        value={restingElectrocardiographic}
        onChange={(event) => setRestingElectrocardiographic(event.target.value)}
      />
      <TextField
        label="Maximum Heart Rate Achieved"
        type="number"
        inputProps={{
          min: 71,
          max: 202,
        }}
        value={maximumHeartRate}
        onChange={(event) => setMaximumHeartRate(event.target.value)}
      />
      <TextField
        label="Exercise Induced Angina"
        type="number"
        inputProps={{
          min: 0,
          max: 1,
        }}
        value={exerciseInducedAngina}
        onChange={(event) => setExerciseInducedAngina(event.target.value)}
      />
      <TextField
        label="Oldpeak"
        type="number"
        inputProps={{
          min: 0,
          max: 6.2,
          step: 0.1,
        }}
        value={oldpeak}
        onChange={(event) => setOldpeak(event.target.value)}
      />
      <TextField
        label="Slope of Peak Exercise ST Segment"
        type="number"
        inputProps={{
          min: 1,
          max: 3,
        }}
        value={slopePeakEx}
        onChange={(event) => setSlopePeakEx(event.target.value)}
      />
      <TextField
        label="Number of Major Vessels"
        type="number"
        inputProps={{
          min: 0,
          max: 3,
        }}
        value={noOfMajorVessels}
        onChange={(event) => setNoOfMajorVessels(event.target.value)}
      />
      <TextField
        label="Thal"
        select
        value={thal}
        onChange={(event) => setThal(event.target.value)}
        helperText="Please select Thal"
      >
        {[3, 6, 7].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Diagnosis of Heart Disease"
        type="number"
        inputProps={{
          min: 0,
          max: 1,
        }}
        value={num}
        onChange={(event) => setNum(event.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
}

export default HeartDiseaseForm;
