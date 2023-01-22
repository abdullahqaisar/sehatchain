import { useNavigate } from "react-router-dom";

import { Box, Grid, Typography, IconButton } from "@mui/material";

export function CustomIconButton(props) {
  const navigate = useNavigate();
  const handleClick = () => navigate(props.href);

  return (
    <Box
      backgroundColor={props.bgColor}
      py={3}
      borderRadius={4}
      mr={({ xs: 0 }, { md: props.mr })}
      ml={({ xs: 0 }, { md: props.ml })}
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
          <props.Icon fontSize="large" />
          <Typography
            ml={2}
            fontSize={({ xs: 22 }, { md: 24 })}
            fontWeight={700}
            color="#0A093D"
          >
            {props.text}
          </Typography>
        </IconButton>
      </Grid>
    </Box>
  );
}
