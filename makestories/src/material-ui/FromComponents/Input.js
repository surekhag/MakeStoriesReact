import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { ErrorMessage } from "formik";
import CustomInput from "../CustomInput/CustomInput";
const useStyles = makeStyles({
  colorRed: {
    color: "red",
  },
});

export default function Input({ name, value, labelText, onChange, type }) {
  const classes = useStyles();
  return (
    <>
      <CustomInput
        labelText={labelText}
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          value: value,
          name: name,
          onChange: onChange,
          type: type,
        }}
      />
      <ErrorMessage className={classes.colorRed} name={name} component="div" />
    </>
  );
}
