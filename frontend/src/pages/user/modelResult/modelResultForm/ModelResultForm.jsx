import { Box } from "@mui/material";

import HeartModelFields from "./HeartModelFields";
import LungModelFields from "./LungModelFields";

const ModelResultForm = ({ formData, setFormData, spec, diseaseCategory }) => {
  return (
    <Box>
      {diseaseCategory === "0" ? (
        <HeartModelFields
          formData={formData}
          setFormData={setFormData}
          spec={spec}
        />
      ) : diseaseCategory === "1" ? (
        <LungModelFields
          formData={formData}
          setFormData={setFormData}
          spec={spec}
        />
      ) : null}
    </Box>
  );
};

export default ModelResultForm;
