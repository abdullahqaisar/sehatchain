import { Typography } from "@mui/material";

export function SectionHeading(props) {
  return (
    <>
      <Typography
        component="h2"
        sx={{
          textAlign: props.align,
          fontSize: { xs: 18, md: 18 },
          fontWeight: "700",
          color: "#001E3C",
          mb: 1,
        }}
      >
        {props.title}
      </Typography>
      {props.underline && (
        <div
          style={{
            maxWidth: "5rem",
            borderBottom: "2px solid #AFD8FF",
            marginBottom: "1.5rem",
          }}
        />
      )}
    </>
  );
}