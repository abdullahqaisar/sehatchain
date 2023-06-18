import { Box } from "@mui/material";
import CustomTextField from "../../components/customTextField/CustomTextField";
import CustomSelect from "../../components/customSelect/CustomSelect";

const ModelFields = ({
  formData,
  setFormData,
  spec,
  modelFields,
  modelSelectFields,
}) => {
  const filteredFields = modelFields.filter((field) => field.key !== spec);
  const filteredSelectFields = modelSelectFields.filter(
    (field) => field.key !== spec
  );

  return (
    <>
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
    </>
  );
};

export default ModelFields;
