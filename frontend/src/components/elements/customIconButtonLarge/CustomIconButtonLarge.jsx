import { useNavigate } from "react-router-dom";

import { Box, Grid, Typography, IconButton } from "@mui/material";

export function CustomIconButtonLarge(props) {
  const navigate = useNavigate();
  const handleClick = () => navigate(props.href);

  return (
    <Box
      backgroundColor={props.bgColor}
      py={6}
      mb={2}
      onClick={() => handleClick()}
      sx={{ cursor: "pointer" }}
    >
      <Grid container justifyContent="center">
        <IconButton
          aria-label="delete"
          size="large"
          disableRipple
          sx={{ color: "#0A093D" }}
        >
          <props.Icon fontSize="medium" />
          <Typography
            ml={1}
            fontSize={({ xs: 22 }, { md: 15 })}
            fontWeight={500}
            color="#0A093D"
          >
            {props.text}
          </Typography>
        </IconButton>
      </Grid>
    </Box>
  );
}
