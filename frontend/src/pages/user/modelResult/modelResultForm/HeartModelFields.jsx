import ModelFields from "./ModelFields";

import { heartSelect } from "./selects.data";

const HeartModelFields = ({ formData, setFormData, spec }) => {
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

  return (
    <ModelFields
      formData={formData}
      setFormData={setFormData}
      spec={spec}
      modelFields={heartModelFields}
      modelSelectFields={heartModelSelectFields}
    />
  );
};

export default HeartModelFields;
