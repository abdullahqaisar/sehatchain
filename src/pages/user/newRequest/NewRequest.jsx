import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CustomButton } from "../../../components/elements/customButton";
import CustomDropdown from "../../../components/elements/customDropdown/CustomDropdown";
import { SectionHeading } from "../components/sectionHeading/SectionHeading";
import TextFieldGrid from "./TextFieldGrid";

const NewRequest = () => {
  return (
    <Box
      sx={{
        pt: 6,
        pb: { xs: 6, md: 6 },
        px: { xs: 3, sm: 6, md: 6 },
      }}
    >
      <SectionHeading title="Request a model" align="center" />
      <Typography
        variant="p"
        sx={{
          color: "#656464",
        }}
      >
        Please provide all the specs to start the training of new model
      </Typography>

      <Grid container alignItems="center" justifyContent="center" mt={2}>
        <Grid item xs={12} md={3.5} m={1}>
          <CustomDropdown label="Gender" />
        </Grid>
        <TextFieldGrid label="Age Limit" />
        <TextFieldGrid label="Price" />
        <TextFieldGrid label="Disease Category" />
        <TextFieldGrid label="Disease Name" />
        <TextFieldGrid label="Patient's City" />
        <TextFieldGrid label="Resting ECS" />
        <TextFieldGrid label="Cholestrol" />
        <TextFieldGrid label="Fasting Blood Sugar" />
        <Grid item xs={12} md={11} m={2}>
          <CustomButton
            backgroundColor="#217BF4"
            color="#fff"
            buttonText="Make Request"
            href="/sehatchain/login"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewRequest;
