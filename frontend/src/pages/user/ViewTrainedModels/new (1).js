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
      min: 20,
      max: 75,
      value: formData.age,
      onChange: (event) =>
        setFormData({ ...formData, age: event.target.value }),
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
            <MenuItem key={0} value={0}>
            Female
            </MenuItem>
            <MenuItem key={1} value={1}>
            Male
            </MenuItem>
        </Select>
        </FormControl>

        <FormControl sx={{ mt: 2, minWidth: 250, mx: 2 }}>
        <InputLabel id="smoking-select-label">Smoking</InputLabel>
        <Select
            labelId="smoking-select-label"
            variant="standard"
            value={formData.smoking}
            onChange={(event) =>
            setFormData({ ...formData, smoking: event.target.value })
            }
        >
            <MenuItem key={1} value={1}>
            No
            </MenuItem>
            <MenuItem key={2} value={2}>
            Yes
            </MenuItem>
        </Select>
        </FormControl>

        <FormControl sx={{ mt: 2, minWidth: 250, mx: 2 }}>
        <InputLabel id="yellowfingers-select-label">Yellow Fingers</InputLabel>
        <Select
            labelId="yellowfingers-select-label"
            variant="standard"
            value={formData.yellowFingers}
            onChange={(event) =>
            setFormData({ ...formData, yellowFingers: event.target.value })
            }
        >
            <MenuItem key={1} value={1}>
            No
            </MenuItem>
            <MenuItem key={2} value={2}>
            Yes
            </MenuItem>
        </Select>
        </FormControl>

        <FormControl sx={{ mt: 2, minWidth: 250, mx: 2 }}>
        <InputLabel id="anxiety-select-label">Anxiety</InputLabel>
        <Select
            labelId="anxiety-select-label"
            variant="standard"
            value={formData.anxiety}
            onChange={(event) =>
            setFormData({ ...formData, anxiety: event.target.value })
            }
        >
            <MenuItem key={1} value={1}>
            No
            </MenuItem>
            <MenuItem key={2} value={2}>
            Yes
            </MenuItem>
        </Select>
        </FormControl>

        

        <FormControl sx={{ mt: 2, minWidth: 250, mx: 2 }}>
        <InputLabel id="peerpressure-select-label">Peer Pressure</InputLabel>
        <Select
            labelId="peerpressure-select-label"
            variant="standard"
            value={formData.peerPressure}
            onChange={(event) =>
            setFormData({ ...formData, peerPressure: event.target.value })
            }
        >
            <MenuItem key={1} value={1}>
            No
            </MenuItem>
            <MenuItem key={2} value={2}>
            Yes
            </MenuItem>
        </Select>


            </FormControl>



            <FormControl sx={{ mt: 2, minWidth: 250, mx: 2 }}>
    <InputLabel id="chronicdisease-select-label">Chronic Disease</InputLabel>
    <Select
        labelId="chronicdisease-select-label"
        variant="standard"
        value={formData.chronicDisease}
        onChange={(event) =>
        setFormData({ ...formData, chronicDisease: event.target.value })
        }
    >
        <MenuItem key={1} value={1}>
        No
        </MenuItem>
        <MenuItem key={2} value={2}>
        Yes
        </MenuItem>
    </Select>
    </FormControl>

    <FormControl sx={{ mt: 2, minWidth: 250, mx: 2 }}>
    <InputLabel id="fatigue-select-label">Fatigue</InputLabel>
    <Select
        labelId="fatigue-select-label"
        variant="standard"
        value={formData.fatigue}
        onChange={(event) =>
        setFormData({ ...formData, fatigue: event.target.value })
        }
    >
        <MenuItem key={1} value={1}>
        No
        </MenuItem>
        <MenuItem key={2} value={2}>
        Yes
        </MenuItem>
    </Select>
    </FormControl>
    

        <FormControl sx={{ mt: 2, minWidth: 250, mx: 2 }}>
    <InputLabel id="allergy-select-label">Allergy</InputLabel>
    <Select
        labelId="allergy-select-label"
        variant="standard"
        value={formData.allergy}
        onChange={(event) =>
        setFormData({ ...formData, allergy: event.target.value })
        }
    >
        <MenuItem key={1} value={1}>
        No
        </MenuItem>
        <MenuItem key={2} value={2}>
        Yes
        </MenuItem>
    </Select>
    </FormControl>


        <FormControl sx={{ mt: 2, minWidth: 250, mx: 2 }}>
    <InputLabel id="wheezing-select-label">Wheezing</InputLabel>
    <Select
        labelId="wheezing-select-label"
        variant="standard"
        value={formData.wheezing}
        onChange={(event) =>
        setFormData({ ...formData, wheezing: event.target.value })
        }
    >
        <MenuItem key={1} value={1}>
        No
        </MenuItem>
        <MenuItem key={2} value={2}>
        Yes
        </MenuItem>
    </Select>
    </FormControl>



        <FormControl sx={{ mt: 2, minWidth: 250, mx: 2 }}>
    <InputLabel id="alcoholconsuming-select-label">Alcohol Consuming</InputLabel>
    <Select
        labelId="alcoholconsuming-select-label"
        variant="standard"
        value={formData.alcoholConsuming}
        onChange={(event) =>
        setFormData({ ...formData, alcoholConsuming: event.target.value })
        }
    >
        <MenuItem key={1} value={1}>
        No
        </MenuItem>
        <MenuItem key={2} value={2}>
        Yes
        </MenuItem>
    </Select>
    </FormControl>


    <FormControl sx={{ mt: 2, minWidth: 250, mx: 2 }}>
  <InputLabel id="coughing-select-label">Coughing</InputLabel>
  <Select
    labelId="coughing-select-label"
    variant="standard"
    value={formData.coughing}
    onChange={(event) =>
      setFormData({ ...formData, coughing: event.target.value })
    }
  >
    <MenuItem key={1} value={1}>
      No
    </MenuItem>
    <MenuItem key={2} value={2}>
      Yes
    </MenuItem>
  </Select>
</FormControl>


<FormControl sx={{ mt: 2, minWidth: 250, mx: 2 }}>
  <InputLabel id="shortnessofbreath-select-label">Shortness of Breath</InputLabel>
  <Select
    labelId="shortnessofbreath-select-label"
    variant="standard"
    value={formData.shortnessOfBreath}
    onChange={(event) =>
      setFormData({ ...formData, shortnessOfBreath: event.target.value })
    }
  >
    <MenuItem key={1} value={1}>
      No
    </MenuItem>
    <MenuItem key={2} value={2}>
      Yes
    </MenuItem>
  </Select>
</FormControl>


<FormControl sx={{ mt: 2, minWidth: 250, mx: 2 }}>
  <InputLabel id="swallowingdifficulty-select-label">Swallowing Difficulty</InputLabel>
  <Select
    labelId="swallowingdifficulty-select-label"
    variant="standard"
    value={formData.swallowingDifficulty}
    onChange={(event) =>
      setFormData({ ...formData, swallowingDifficulty: event.target.value })
    }
  >
    <MenuItem key={1} value={1}>
      No
    </MenuItem>
    <MenuItem key={2} value={2}>
      Yes
    </MenuItem>
  </Select>
</FormControl>


<FormControl sx={{ mt: 2, minWidth: 250, mx: 2 }}>
  <InputLabel id="chestpain-select-label">Chest Pain</InputLabel>
  <Select
    labelId="chestpain-select-label"
    variant="standard"
    value={formData.chestPain}
    onChange={(event) =>
      setFormData({ ...formData, chestPain: event.target.value })
    }
  >
    <MenuItem key={1} value={1}>
      No
    </MenuItem>
    <MenuItem key={2} value={2}>
      Yes
    </MenuItem>
  </Select>
</FormControl>




<FormControl sx={{ mt: 2, minWidth: 250, mx: 2 }}>
  <InputLabel id="lungcancer-select-label">Lung Cancer</InputLabel>
  <Select
    labelId="lungcancer-select-label"
    variant="standard"
    value={formData.lungCancer}
    onChange={(event) =>
      setFormData({ ...formData, lungCancer: event.target.value })
    }
  >
    <MenuItem key={0} value={0}>
      No Lung Cancer
    </MenuItem>
    <MenuItem key={1} value={1}>
      Lung Cancer Detected
    </MenuItem>
  </Select>
</FormControl>









 


    </div>
  );
};

export default FormFields;