import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import CustomTextField from "../components/customTextField/CustomTextField";

import { selects } from "./selects.data";

const ModelResultForm = ({ formData, setFormData, spec }) => {
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
      key: "no_of_major_vessels",
      label: "No of Major Vessels",
      type: "number",
      min: 0,
      max: 3,
      value: formData.noOfMajorVessels,
      onChange: (event) =>
        setFormData({ ...formData, noOfMajorVessels: event.target.value }),
    },
  ];

  const lungSelectFields = [
    {
      key: "GENDER",
      label: "Gender",
      value: formData.GENDER,
      onChange: (event) =>
        setFormData({ ...formData, GENDER: event.target.value }),
      options: [],
    },
    {
      key: "SMOKING",
      label: "Smoking",
      value: formData.SMOKING,
      onChange: (event) =>
        setFormData({ ...formData, SMOKING: event.target.value }),
      options: [],
    },
    {
      key: "YELLOW_FINGERS",
      label: "Yellow Fingers",
      value: formData.YELLOW_FINGERS,
      onChange: (event) =>
        setFormData({ ...formData, YELLOW_FINGERS: event.target.value }),
      options: [],
    },
    {
      key: "ANXIETY",
      label: "Anxiety",
      value: formData.ANXIETY,
      onChange: (event) =>
        setFormData({ ...formData, ANXIETY: event.target.value }),
      options: [],
    },
    {
      key: "PEER_PRESSURE",
      label: "Peer Pressure",
      value: formData.PEER_PRESSURE,
      onChange: (event) =>
        setFormData({ ...formData, PEER_PRESSURE: event.target.value }),
      options: [],
    },
    {
      key: "CHRONIC DISEASE",
      label: "Chronic Disease",
      value: formData.CHRONIC_DISEASE,
      onChange: (event) =>
        setFormData({ ...formData, CHRONIC_DISEASE: event.target.value }),
      options: [],
    },
    {
      key: "FATIGUE",
      label: "Fatigue",
      value: formData.FATIGUE,
      onChange: (event) =>
        setFormData({ ...formData, FATIGUE: event.target.value }),
      options: [],
    },
    {
      key: "ALLERGY",
      label: "Allergy",
      value: formData.ALLERGY,
      onChange: (event) =>
        setFormData({ ...formData, ALLERGY: event.target.value }),
      options: [],
    },
    {
      key: "WHEEZING",
      label: "Wheezing",
      value: formData.WHEEZING,
      onChange: (event) =>
        setFormData({ ...formData, WHEEZING: event.target.value }),
      options: [],
    },
    {
      key: "ALCOHOL CONSUMING",
      label: "Alcohol Consuming",
      value: formData.ALCOHOL_CONSUMING,
      onChange: (event) =>
        setFormData({ ...formData, ALCOHOL_CONSUMING: event.target.value }),
      options: [],
    },

    {
      key: "COUGHING",
      label: "Coughing",
      value: formData.COUGHING,

      onChange: (event) =>
        setFormData({ ...formData, COUGHING: event.target.value }),
      options: [],
    },
    {
      key: "SHORTNESS OF BREATH",

      label: "Shortness of Breath",
      value: formData.SHORTNESS_OF_BREATH,
      onChange: (event) =>
        setFormData({ ...formData, SHORTNESS_OF_BREATH: event.target.value }),
      options: [],
    },
    {
      key: "SWALLOWING DIFFICULTY",
      label: "Swallowing Difficulty",
      value: formData.SWALLOWING_DIFFICULTY,
      onChange: (event) =>
        setFormData({ ...formData, SWALLOWING_DIFFICULTY: event.target.value }),
      options: [],
    },
    {
      key: "CHEST PAIN",
      label: "Chest Pain",
      value: formData.CHEST_PAIN,
      onChange: (event) =>
        setFormData({ ...formData, CHEST_PAIN: event.target.value }),
      options: [],
    },
    {
      key: "LUNG_CANCER",
      label: "Lung Cancer",
      value: formData.LUNG_CANCER,
      onChange: (event) =>
        setFormData({ ...formData, LUNG_CANCER: event.target.value }),
      options: [],
    },
  ];

  const selectFields = [
    {
      key: "gender",
      label: "Gender",
      value: formData.gender,
      onChange: (event) =>
        setFormData({ ...formData, gender: event.target.value }),
      options: selects.gender,
    },
    {
      key: "chest_pain_type",
      label: "Chest Pain Type",
      value: formData.chestPainType,
      onChange: (event) =>
        setFormData({ ...formData, chestPainType: event.target.value }),
      options: selects.chest_pain_type,
    },
    {
      key: "fasting_BP",
      label: "Fasting Blood Sugar",
      value: formData.fastingBP,
      onChange: (event) =>
        setFormData({ ...formData, fastingBP: event.target.value }),
      options: selects.fasting_BP,
    },
    {
      key: "resting_electrocardiographic",
      label: "Resting Electrocardiographic",
      value: formData.restingElectrocardiographic,
      onChange: (event) =>
        setFormData({
          ...formData,
          restingElectrocardiographic: event.target.value,
        }),
      options: selects.resting_electrocardiographic,
    },
    {
      key: "exercise_induced_angina",
      label: "Exercise Induced Angina",
      value: formData.exerciseInducedAngina,
      onChange: (event) =>
        setFormData({ ...formData, exerciseInducedAngina: event.target.value }),
      options: selects.exercise_induced_angina,
    },
    {
      key: "slope_peak_ex",
      label: "Slope Peak Excercise ",
      value: formData.slopePeakEx,
      onChange: (event) =>
        setFormData({ ...formData, slopePeakEx: event.target.value }),
      options: selects.slope_peak_ex,
    },
    {
      key: "thal",
      label: "Thalassemia",
      value: formData.thal,
      onChange: (event) =>
        setFormData({ ...formData, thal: event.target.value }),
      options: selects.thal,
    },

    {
      key: "num",
      label: "Heart Narrowing",
      value: formData.num,
      onChange: (event) =>
        setFormData({ ...formData, num: event.target.value }),
      options: selects.num,
    },
  ];

  let filteredFields = fields.filter((field) => field.key !== spec);
  let filteredSelectFields = selectFields.filter((field) => field.key !== spec);

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

      {filteredSelectFields.map((field) => (
        <FormControl key={field.label} sx={{ mt: 2, minWidth: 250, mx: 2 }}>
          <InputLabel id={`${field.label}-select-label`}>
            {field.label}
          </InputLabel>
          <Select
            labelId={`${field.label}-select-label`}
            variant="standard"
            value={field.value}
            onChange={field.onChange}
          >
            {field.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </div>
  );
};

export default ModelResultForm;
