import * as React from "react";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function CustomDropdown(props) {
  const [age, setAge] = React.useState("0");
  const handleChange = (e) => {
    setAge(e.target.value);
  };

  return (
    <Select
      fullWidth
      variant="outlined"
      value={age}
      onChange={handleChange}
      disableUnderline
      label="Gender"
      sx={{
        textAlign: "left",
        color: "#656464",
        borderRadius: 1,
        backgroundColor: "#DBEAFF",
      }}
    >
      <MenuItem value={0}>Gender</MenuItem>
      <MenuItem value={1}>Any</MenuItem>
      <MenuItem value={2}>Male</MenuItem>
      <MenuItem value={3}>Female</MenuItem>
    </Select>
  );
}

export default CustomDropdown;
