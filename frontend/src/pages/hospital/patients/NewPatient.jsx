import { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "../../../util/axios";

import { CustomButton } from "../../../components/elements/customButton";
import { SectionHeading } from "../../user/components/sectionHeading/SectionHeading";

const NewPatient = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    console.log("hospital id:", localStorage.getItem("hospitalToken"));
    if (!file) {
      console.log("No file selected");
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log('form',formData);
      const response = await axios({
        method: "post",
        url: "/hospital/uploadcsv",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${localStorage.getItem("hospitalToken")}`,
        },
      });

      console.log("response:", response);
    } catch (error) {
      console.log(error);
    }
  };

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
        Add Multiple patients by uploading a CSV file
      </Typography>
      <Grid container alignItems="center" justifyContent="center" mt={2}>
        <Grid item xs={6} md={2} mx={4}>
          {/* <Button variant="outline" component="label" py={12}> */}
          <input type={"file"} accept={".csv"} onChange={handleFileChange} />
          {/* </Button> */}
        </Grid>
        <Grid item xs={6} md={2} mx={4} my={2}>
          <CustomButton
            backgroundColor="#217BF4"
            color="#fff"
            buttonText="Upload"
            onClick={handleUpload}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewPatient;
