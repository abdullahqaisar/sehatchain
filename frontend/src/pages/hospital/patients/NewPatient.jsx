import { Box } from "@mui/system";
import { SectionHeading } from "../../../components/elements/sectionHeading/SectionHeading";

import NewPatientForm from "./NewPatientForm";

const NewPatient = () => {
  return (
    <Box
      sx={{
        pt: 6,
        pb: { xs: 6, md: 6 },
        px: { xs: 3, sm: 6, md: 6 },
      }}
      alignItems="left"
      justifyContent="left"
    >
      <SectionHeading title="Add Patients Data" align="left" underline="True" />
      <NewPatientForm />
    </Box>
  );
};

export default NewPatient;
