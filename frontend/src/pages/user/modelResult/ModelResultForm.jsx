import { Box } from "@mui/material";
import CustomTextField from "../components/customTextField/CustomTextField";
import CustomSelect from "../components/customSelect/CustomSelect";

import { heartSelect } from "./selects.data";
import { lungSelect } from "./selects.data";

const ModelResultForm = ({ formData, setFormData, spec, diseaseCategory }) => {
  const heartModelFields = [
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

  const heartModelSelectFields = [
    {
      key: "gender",
      label: "Gender",
      value: formData.gender,
      onChange: (event) =>
        setFormData({ ...formData, gender: event.target.value }),
      options: heartSelect.gender,
    },
    {
      key: "chest_pain_type",
      label: "Chest Pain Type",
      value: formData.chestPainType,
      onChange: (event) =>
        setFormData({ ...formData, chestPainType: event.target.value }),
      options: heartSelect.chest_pain_type,
    },
    {
      key: "fasting_BP",
      label: "Fasting Blood Sugar",
      value: formData.fastingBP,
      onChange: (event) =>
        setFormData({ ...formData, fastingBP: event.target.value }),
      options: heartSelect.fasting_BP,
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
      options: heartSelect.resting_electrocardiographic,
    },
    {
      key: "exercise_induced_angina",
      label: "Exercise Induced Angina",
      value: formData.exerciseInducedAngina,
      onChange: (event) =>
        setFormData({ ...formData, exerciseInducedAngina: event.target.value }),
      options: heartSelect.exercise_induced_angina,
    },
    {
      key: "slope_peak_ex",
      label: "Slope Peak Excercise ",
      value: formData.slopePeakEx,
      onChange: (event) =>
        setFormData({ ...formData, slopePeakEx: event.target.value }),
      options: heartSelect.slope_peak_ex,
    },
    {
      key: "thal",
      label: "Thalassemia",
      value: formData.thal,
      onChange: (event) =>
        setFormData({ ...formData, thal: event.target.value }),
      options: heartSelect.thal,
    },

    {
      key: "num",
      label: "Heart Narrowing",
      value: formData.num,
      onChange: (event) =>
        setFormData({ ...formData, num: event.target.value }),
      options: heartSelect.num,
    },
  ];

  const lungModelFields = [
    {
      key: "AGE",
      label: "Age",
      type: "number",
      min: 29,
      max: 80,
      value: formData.age,
      onChange: (event) =>
        setFormData({ ...formData, age: event.target.value }),
    },
  ];

  const lungModelSelectFields = [
    {
      key: "GENDER",
      label: "Gender",
      value: formData.GENDER,
      onChange: (event) =>
        setFormData({ ...formData, GENDER: event.target.value }),
      options: lungSelect.GENDER,
    },
    {
      key: "SMOKING",
      label: "Smoking",
      value: formData.SMOKING,
      onChange: (event) =>
        setFormData({ ...formData, SMOKING: event.target.value }),
      options: lungSelect.SMOKING,
    },
    {
      key: "YELLOW_FINGERS",
      label: "Yellow Fingers",
      value: formData.YELLOW_FINGERS,
      onChange: (event) =>
        setFormData({ ...formData, YELLOW_FINGERS: event.target.value }),
      options: lungSelect.YELLOW_FINGERS,
    },
    {
      key: "ANXIETY",
      label: "Anxiety",
      value: formData.ANXIETY,
      onChange: (event) =>
        setFormData({ ...formData, ANXIETY: event.target.value }),
      options: lungSelect.ANXIETY,
    },
    {
      key: "PEER_PRESSURE",
      label: "Peer Pressure",
      value: formData.PEER_PRESSURE,
      onChange: (event) =>
        setFormData({ ...formData, PEER_PRESSURE: event.target.value }),
      options: lungSelect.PEER_PRESSURE,
    },
    {
      key: "CHRONIC DISEASE",
      label: "Chronic Disease",
      value: formData.CHRONIC_DISEASE,
      onChange: (event) =>
        setFormData({ ...formData, CHRONIC_DISEASE: event.target.value }),
      options: lungSelect.CHRONIC_DISEASE,
    },
    {
      key: "FATIGUE",
      label: "Fatigue",
      value: formData.FATIGUE,
      onChange: (event) =>
        setFormData({ ...formData, FATIGUE: event.target.value }),
      options: lungSelect.FATIGUE,
    },
    {
      key: "ALLERGY",
      label: "Allergy",
      value: formData.ALLERGY,
      onChange: (event) =>
        setFormData({ ...formData, ALLERGY: event.target.value }),
      options: lungSelect.ALLERGY,
    },
    {
      key: "WHEEZING",
      label: "Wheezing",
      value: formData.WHEEZING,
      onChange: (event) =>
        setFormData({ ...formData, WHEEZING: event.target.value }),
      options: lungSelect.WHEEZING,
    },
    {
      key: "ALCOHOL CONSUMING",
      label: "Alcohol Consuming",
      value: formData.ALCOHOL_CONSUMING,
      onChange: (event) =>
        setFormData({ ...formData, ALCOHOL_CONSUMING: event.target.value }),
      options: lungSelect.ALCOHOL_CONSUMING,
    },

    {
      key: "COUGHING",
      label: "Coughing",
      value: formData.COUGHING,

      onChange: (event) =>
        setFormData({ ...formData, COUGHING: event.target.value }),
      options: lungSelect.COUGHING,
    },
    {
      key: "SHORTNESS OF BREATH",

      label: "Shortness of Breath",
      value: formData.SHORTNESS_OF_BREATH,
      onChange: (event) =>
        setFormData({ ...formData, SHORTNESS_OF_BREATH: event.target.value }),
      options: lungSelect.SHORTNESS_OF_BREATH,
    },
    {
      key: "SWALLOWING DIFFICULTY",
      label: "Swallowing Difficulty",
      value: formData.SWALLOWING_DIFFICULTY,
      onChange: (event) =>
        setFormData({ ...formData, SWALLOWING_DIFFICULTY: event.target.value }),
      options: lungSelect.SWALLOWING_DIFFICULTY,
    },
    {
      key: "CHEST PAIN",
      label: "Chest Pain",
      value: formData.CHEST_PAIN,
      onChange: (event) =>
        setFormData({ ...formData, CHEST_PAIN: event.target.value }),
      options: lungSelect.CHEST_PAIN,
    },
    {
      key: "LUNG_CANCER",
      label: "Lung Cancer",
      value: formData.LUNG_CANCER,
      onChange: (event) =>
        setFormData({ ...formData, LUNG_CANCER: event.target.value }),
      options: lungSelect.LUNG_CANCER,
    },
  ];

  let filteredFields;
  let filteredSelectFields;

  if (diseaseCategory === "0") {
    filteredFields = heartModelFields.filter((field) => field.key !== spec);
    filteredSelectFields = heartModelSelectFields.filter(
      (field) => field.key !== spec
    );
  } else if (diseaseCategory === "1") {
    filteredFields = lungModelFields.filter((field) => field.key !== spec);
    filteredSelectFields = lungModelSelectFields.filter(
      (field) => field.key !== spec
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {filteredFields.map((field) => (
          <CustomTextField
            key={field.label}
            label={field.label}
            type={field.type}
            inputProps={{
              min: field.min,
              max: field.max,
            }}
            value={field.value}
            onChange={field.onChange}
          />
        ))}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {filteredSelectFields.map((field) => (
          <CustomSelect
            key={field.label}
            label={field.label}
            value={field.value}
            onChange={field.onChange}
            options={field.options}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ModelResultForm;
