import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CustomButton } from "../../../components/elements/customButton";
import CustomDropdown from "../../../components/elements/customDropdown/CustomDropdown";
import { SectionHeading } from "../components/sectionHeading/SectionHeading";
import TextFieldGrid from "../../../components/elements/textFieldGrid/TextFieldGrid";

const TrainingResults = () => {
  return (
    <Box
      sx={{
        pt: 6,
        pb: { xs: 6, md: 6 },
        px: { xs: 3, sm: 6, md: 6 },
      }}
    >
      <SectionHeading title="Model Result" align="center" />
      <Typography
        variant="p"
        sx={{
          color: "#656464",
        }}
      >
        Please provide the all the parameters to make prediction by the model
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
      <Box mt={2}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#217BF4",
          }}
        >
          Results
        </Typography>
        <Typography
          variant="p"
          sx={{
            color: "#656464",
          }}
        >
          The user has a 10% chance of having a heart disease.
        </Typography>
      </Box>
    </Box>
  );
};

export default TrainingResults;
