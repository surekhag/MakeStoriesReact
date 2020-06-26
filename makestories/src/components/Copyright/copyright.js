import React from "react";

import Typography from "@material-ui/core/Typography";
export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <a color="inherit" href="https://makestories.io">
        Make Stories
      </a>
      {new Date().getFullYear()}
    </Typography>
  );
}
// export default Copyright;
