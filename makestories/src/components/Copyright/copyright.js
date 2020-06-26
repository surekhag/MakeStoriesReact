import React from "react";

import Typography from "@material-ui/core/Typography";
export default function Copyright() {
  const style = {
    textDecoration: "none",
    "&:hover": { textDecoration: "underline" },
  };
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <a style={style} color="inherit" href="https://makestories.io">
        Make Stories
      </a>
      &nbsp; {new Date().getFullYear()}
    </Typography>
  );
}
