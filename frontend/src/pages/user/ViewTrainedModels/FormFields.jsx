import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { useEffect } from "react";
import CustomTextField from "../components/customTextField/CustomTextField";

const FormFields = ({ formData, setFormData, spec }) => {
  const fields = [
    {
      key: "age",
      label: "Age",
      type: "number",
      min: 29,
      max: 80,
      value: formData.age,
      onChange: (event) =>
        setFormData({ ...formData, age: event.target.value }),
    },
    {
      key: "resting_BP",
      label: "Resting Blood Pressure",
      type: "number",
      min: 90,
      max: 200,
      value: formData.restingBP,
      onChange: (event) =>
        setFormData({ ...formData, restingBP: event.target.value }),
    },

    {
      key: "serum_cholestoral",
      label: "Serum Cholestoral",
      type: "number",
      min: 90,
      max: 200,
      value: formData.serumCholestoral,
      onChange: (event) =>
        setFormData({ ...formData, serumCholestoral: event.target.value }),
    },

    {
      key: "fasting_BP",
      label: "Fasting Blood Sugar",
      type: "number",
      min: 0,
      max: 1,
      value: formData.fastingBP,
      onChange: (event) =>
        setFormData({ ...formData, fastingBP: event.target.value }),
    },

    {
      key: "resting_electrocardiographic",
      label: "Resting Electrocardiographic",
      type: "number",
      min: 0,
      max: 2,
      value: formData.restingElectrocardiographic,
      onChange: (event) =>
        setFormData({
          ...formData,
          restingElectrocardiographic: event.target.value,
        }),
    },

    {
      key: "maximum_heartRate",
      label: "Maximum Heart Rate",
      type: "number",
      min: 60,
      max: 200,
      value: formData.maximumHeartRate,
      onChange: (event) =>
        setFormData({ ...formData, maximumHeartRate: event.target.value }),
    },

    {
      key: "exercise_induced_angina",
      label: "Exercise Induced Angina",
      type: "number",
      min: 0,
      max: 1,
      value: formData.exerciseInducedAngina,
      onChange: (event) =>
        setFormData({ ...formData, exerciseInducedAngina: event.target.value }),
    },

    {
      key: "oldpeak",
      label: "Oldpeak",
      type: "number",
      min: 0,
      max: 6.2,
      value: formData.oldpeak,
      onChange: (event) =>
        setFormData({ ...formData, oldpeak: event.target.value }),
    },

    {
      key: "slope_peak_ex",
      label: "Slope Peak Ex",
      type: "number",
      min: 0,
      max: 2,
      value: formData.slopePeakEx,
      onChange: (event) =>
        setFormData({ ...formData, slopePeakEx: event.target.value }),
    },

    {
      key: "no_of_major_vessels",
      label: "No of Major Vessels",
      type: "number",
      min: 0,
      max: 3,
      value: formData.noOfMajorVessels,
      onChange: (event) =>
        setFormData({ ...formData, noOfMajorVessels: event.target.value }),
    },
    {
      key: "thal",
      label: "Thal",
      type: "number",
      min: 3,
      max: 7,
      value: formData.thal,
      onChange: (event) =>
        setFormData({ ...formData, thal: event.target.value }),
    },
    {
      key: "num",
      label: "angiographic disease status",
      type: "number",
      min: 0,
      max: 1,
      value: formData.num,
      onChange: (event) =>
        setFormData({ ...formData, num: event.target.value }),
    },
  ];
  let filteredFields = fields.filter((field) => field.key !== spec);

  return (
    <div>
      {filteredFields.map((field) => (
        <CustomTextField
          key={field.label}
          label={field.label}
          type={field.type}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: field.min,
            max: field.max,
          }}
          value={field.value}
          onChange={field.onChange}
        />
      ))}

      <FormControl sx={{ mt: 2, minWidth: 250, mx: 2 }}>
        <InputLabel id="gender-select-label">Gender</InputLabel>
        <Select
          labelId="gender-select-label"
          variant="standard"
          value={formData.gender}
          onChange={(event) =>
            setFormData({ ...formData, gender: event.target.value })
          }
        >
          <MenuItem key={1} value={1}>
            Male
          </MenuItem>
          <MenuItem key={0} value={0}>
            Female
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ mt: 2, minWidth: 250, mx: 2 }}>
        <InputLabel id="chestpain-select-label">Chest Pain Type</InputLabel>
        <Select
          labelId="chestpain-select-label"
          variant="standard"
          value={formData.chestPainType}
          onChange={(event) =>
            setFormData({ ...formData, chestPainType: event.target.value })
          }
        >
          <MenuItem key={1} value={1}>
            Typical Angina
          </MenuItem>
          <MenuItem key={2} value={2}>
            Atypical Angina
          </MenuItem>
          <MenuItem key={3} value={3}>
            Non-Anginal Pain
          </MenuItem>
          <MenuItem key={4} value={4}>
            Asymptomatic
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FormFields;
