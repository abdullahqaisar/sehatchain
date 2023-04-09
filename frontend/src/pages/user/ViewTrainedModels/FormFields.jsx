import CustomTextField from "../components/customTextField/CustomTextField";

const FormFields = ({ formData, setFormData, spec }) => {
  const fields = [
    {
      label: "Age",
      type: "number",
      min: 29,
      max: 80,
      value: formData.age,
      onChange: (event) =>
        setFormData({ ...formData, age: event.target.value }),
    },
    {
      label: "Resting Blood Pressure",
      type: "number",
      min: 90,
      max: 200,
      value: formData.restingBP,
      onChange: (event) =>
        setFormData({ ...formData, restingBP: event.target.value }),
    },

    {
      label: "Serum Cholestoral",
      type: "number",
      min: 90,
      max: 200,
      value: formData.serumCholestoral,
      onChange: (event) =>
        setFormData({ ...formData, serumCholestoral: event.target.value }),
    },
    {
      label: "Fasting Blood Sugar",
      type: "number",
      min: 0,
      max: 1,
      value: formData.fastingBP,
      onChange: (event) =>
        setFormData({ ...formData, fastingBP: event.target.value }),
    },
    {
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
      label: "Maximum Heart Rate",
      type: "number",
      min: 60,
      max: 200,
      value: formData.maximumHeartRate,
      onChange: (event) =>
        setFormData({ ...formData, maximumHeartRate: event.target.value }),
    },
    {
      label: "Exercise Induced Angina",
      type: "number",
      min: 0,
      max: 1,
      value: formData.exerciseInducedAngina,
      onChange: (event) =>
        setFormData({ ...formData, exerciseInducedAngina: event.target.value }),
    },
    {
      label: "Oldpeak",
      type: "number",
      min: 0,
      max: 6.2,
      value: formData.oldpeak,
      onChange: (event) =>
        setFormData({ ...formData, oldpeak: event.target.value }),
    },
    {
      label: "Slope Peak Ex",
      type: "number",
      min: 0,
      max: 2,
      value: formData.slopePeakEx,
      onChange: (event) =>
        setFormData({ ...formData, slopePeakEx: event.target.value }),
    },
    {
      label: "No of Major Vessels",
      type: "number",
      min: 0,
      max: 3,
      value: formData.noOfMajorVessels,
      onChange: (event) =>
        setFormData({ ...formData, noOfMajorVessels: event.target.value }),
    },
    {
      label: "Thal",
      type: "number",
      min: 3,
      max: 7,
      value: formData.thal,
      onChange: (event) =>
        setFormData({ ...formData, thal: event.target.value }),
    },
  ];

  return (
    <div>
      {fields.map((field) => (
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
    </div>
  );
};

export default FormFields;
