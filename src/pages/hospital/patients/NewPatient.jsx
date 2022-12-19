import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { CustomButton } from "../../../components/elements/customButton";
import CustomDropdown from "../../../components/elements/customDropdown/CustomDropdown";
import { SectionHeading } from "../../user/components/sectionHeading/SectionHeading";
import TextFieldGrid from "../../user/components/textFieldGrid/TextFieldGrid";

const TrainingResults = () => {
  return (
    <Box
      sx={{
        pt: 6,
        pb: { xs: 6, md: 6 },
        px: { xs: 3, sm: 6, md: 6 },
      }}
    >
      <SectionHeading title="Add a patient" align="center" />
      <Typography
        mt={2}
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#217BF4",
        }}
      >
        Personal Information
      </Typography>

      <Grid container alignItems="center" justifyContent="center" mt={2}>
        <Grid item xs={12} md={3.5} m={1}>
          <CustomDropdown label="Gender" />
        </Grid>
        <TextFieldGrid label="Age Limit" />
        <TextFieldGrid label="Resting ECG" />
        <TextFieldGrid label="Max. Heart Rate" />
        <TextFieldGrid label="Cholestrol" />
        <TextFieldGrid label="Fasting Blood Sugar" />
      </Grid>
      <Typography
        mt={2}
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#217BF4",
        }}
      >
        Medical Information
      </Typography>
      <Grid container alignItems="center" justifyContent="center" mt={2}>
        <Grid item xs={12} md={3.5} m={1}>
          <CustomDropdown label="Gender" />
        </Grid>
        <TextFieldGrid label="Age Limit" />
        <TextFieldGrid label="Resting ECG" />
        <TextFieldGrid label="Max. Heart Rate" />
        <TextFieldGrid label="Cholestrol" />
        <TextFieldGrid label="Fasting Blood Sugar" />

        <Grid item xs={12} md={11} m={2}>
          <CustomButton
            backgroundColor="#217BF4"
            color="#fff"
            buttonText="Predict"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrainingResults;
