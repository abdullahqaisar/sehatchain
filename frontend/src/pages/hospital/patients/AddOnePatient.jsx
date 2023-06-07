import { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "../../../util/axios";

import PatientFields from "./PatientFields";
import DiseaseFields from "./DiseaseFIelds";

import { CustomButton } from "../../../components/elements/customButton";
import CustomDropdown from "../../../components/elements/customDropdown/CustomDropdown";
import { SectionHeading } from "../../user/components/sectionHeading/SectionHeading";
import TextFieldGrid from "../../../components/elements/textFieldGrid/TextFieldGrid";

const NewPatient = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    address: "",
    contact: "",
    gender: "",
    diseaseName: "",
    diseaseCategory: "",
    restingECG: "",
    maxHeartRate: "",
    cholesterol: "",
    fastingBloodSugar: "",
  });

  const [file, setFile] = useState(null);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (event) => {
    console.log("form data:", file);
    //make an axios api call and send the file to the backend

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios({
        method: "post",
        url: "/hospital/uploadcsv",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("response:", response);
    } catch (error) {
      console.log(error);
    }
  };
  //   try {
  //     const response = await fetch(
  //       "http://localhost:5000/api/hospital/uploadcsv",
  //       {
  //         method: "POST",
  //         body: file,
  //       }
  //     );

  //     const { columnTitles } = await response.json();

  //     console.log(columnTitles);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSubmit = async () => {
    console.log("submit");
    const response = await fetch(
      "http://localhost:5000/api/hospital/addpatient",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    console.log(formData);
    const data = await response.json();
    console.log(data);
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
          <Button variant="outline" component="label" py={12}>
            <form onSubmit={handleUpload}>
              <input
                type={"file"}
                accept={".csv"}
                onChange={handleFileChange}
              />
              <input type="submit" value="Upload File" />
            </form>
          </Button>
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
