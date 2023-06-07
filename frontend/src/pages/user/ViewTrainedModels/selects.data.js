export const selects = {
    gender: [
      { value: 1, label: "Male" },
      { value: 0, label: "Female" },
    ],
    thal: [
      { value: 1, label: "Normal" },
      { value: 2, label: "Fixed Defect" },
      { value: 3, label: "Reversible Defect" },
    ],
    num: [
      { value: 0, label: "Less than 50% Diameter Narrowing" },
      { value: 1, label: "Greater than 50% Diameter Narrowing" },
    ],
    slope_peak_ex: [
      { value: 0, label: "Upsloping" },
      { value: 1, label: "Flat" },
      { value: 2, label: "Downsloping" },
    ],
    exercise_induced_angina: [
      { value: 0, label: "No" },
      { value: 1, label: "Yes" },
    ],
    resting_electrocardiographic: [
      { value: 0, label: "Normal" },
      { value: 1, label: "Having ST-T Wave Abnormality" },
      { value: 2, label: "Probable Left Ventricular Hypertrophy" },
    ],
    fasting_BP: [
      { value: 0, label: "Less than 120 mg/dl" },
      { value: 1, label: "Greater than 120 mg/dl" },
    ],
    chest_pain_type: [
      { value: 1, label: "Typical Angina" },
      { value: 2, label: "Atypical Angina" },
      { value: 3, label: "Non-Anginal Pain" },
      { value: 4, label: "Asymptomatic" },
    ],
  };
  

export const lungSelect = {
    GENDER: [{
        value: 0,
        label: "female"
    }, {
        value: 1,
        label: "male",
    }],
    AGE: [{
        value: 0,
        label: "0-10"
    }, {
        value: 1,
        label: "11-20",
    }, {
        value: 2,
        label: "21-30",
    }],
    SMOKING: [{
        value: 0,
        label: "No"
    }, {
        value: 1,
        label: "Yes",
    }],
    ALLERGY: [{
        value: 0,
        label: "No"
    }, {
        value: 1,
        label: "Yes",
    }],
    WHEEZING: [{
        value: 0,
        label: "No"
    }, {
        value: 1,
        label: "Yes",
    }],
    ALCOHOL_CONSUMING: [{
        value: 0,
        label: "No"
    }, {
        value: 1,
        label: "Yes",

    }],
    COUGHING: [{
        value: 0,
        label: "No"
    }, {
        value: 1,
        label: "Yes",
    }],
    SHORTNESS_OF_BREATH: [{
        value: 0,
        label: "No"
    }, {
        value: 1,
        label: "Yes",
    }],
    SWALLOWING_DIFFICULTY: [{
        value: 0,
        label: "No"
    }, {
        value: 1,
        label: "Yes",
    }],
    CHEST_PAIN: [{
        value: 0,
        label: "No"
    }, {
        value: 1,
        label: "Yes",
    }],
    LUNG_CANCER: [{
        value: 0,
        label: "No Lung Cancer"
    }, {
        value: 1,
        label: "Lung Cancer Detected",
    }],
}


    