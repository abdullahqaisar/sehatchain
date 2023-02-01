import { Box, Typography } from "@mui/material";
import { makeStyles  } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  errorNumber: {
    fontSize: "10rem",
    fontWeight: "bold",
    color: "#001E3C",
  },
  errorText: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#001E3C",
    marginTop: "1rem",
  },
});

function PageNotFound() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h3" className={classes.errorNumber}>
        404
      </Typography>
      <Typography variant="h3" className={classes.errorText}>
        Page Not Found
      </Typography>
    </Box>
  );
}

export default PageNotFound;
