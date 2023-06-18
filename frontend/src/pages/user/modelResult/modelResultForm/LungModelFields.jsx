import ModelFields from "./ModelFields";
import { lungSelect } from "./selects.data";

const LungModelFields = ({ formData, setFormData, spec }) => {
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
  return (
    <ModelFields
      formData={formData}
      setFormData={setFormData}
      spec={spec}
      modelFields={lungModelFields}
      modelSelectFields={lungModelSelectFields}
    />
  );
};

export default LungModelFields;
