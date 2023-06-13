import React, { useState } from "react";
import { Box } from "@mui/material";
import CustomSelect from "../components/customSelect/CustomSelect";
import CustomMultiSelect from "../components/customMultiSelect/CustomMultiSelect";
import { categories } from "../../../util/diseaseCategory.data";

const NewRequestForm = ({
  category,
  handleCategoryChange,
  selectedSpec,
  handleSpecSelectChange,
  specs,
  selectedHospitals,
  handleSelectChange,
  selectedHospitalsNames,
  hospitalMap,
}) => {
  const handleCategoryChangeWrapper = (event) => {
    handleCategoryChange(event);
    handleSelectChange({ target: { value: [] } });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CustomSelect
        label="Disease Category"
        value={category}
        onChange={handleCategoryChangeWrapper}
        options={Object.keys(categories).map((key) => ({
          value: key,
          label: categories[key],
        }))}
      />
      <CustomMultiSelect
        label="Hospitals"
        value={selectedHospitals}
        onChange={handleSelectChange}
        renderValue={() => selectedHospitalsNames.join(", ")}
        options={
          hospitalMap &&
          Object.keys(hospitalMap).map((id) => ({
            value: id,
            label: hospitalMap[id].name,
          }))
        }
        disabled={!category}
      />
      <CustomSelect
        label="Feature you want to predict"
        value={selectedSpec}
        onChange={handleSpecSelectChange}
        options={specs.map((spec) => ({
          value: spec,
          label: spec,
        }))}
        disabled={!category}
      />
    </Box>
  );
};

export default NewRequestForm;
