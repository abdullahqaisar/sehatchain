import { Typography } from "@mui/material";

export function SectionHeading(props) {
  return (
    <>
      <Typography
        component="h2"
        sx={{
          textAlign: props.align,
          fontSize: { xs: 20, md: 30 },
          fontWeight: "700",
          color: "#001E3C",
          mb: 3,
        }}
      >
        {props.title}
      </Typography>
    </>
  );
}
