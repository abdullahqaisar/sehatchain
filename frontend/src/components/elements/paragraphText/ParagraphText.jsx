import { Typography } from "@mui/material";

export function ParagraphText(props) {
  return (
    <Typography
      sx={{
        textAlign: props.align,
        fontSize: { xs: 16, md: 16 },
        fontWeight: "400",
        color: "#001E3C",
        mb: 1,
      }}
    >
      {props.text}
    </Typography>
  );
}
