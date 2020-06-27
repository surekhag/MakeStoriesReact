import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import signInSignUp from "../../material-ui/styles/signInSignUp";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataFromDb } from "../../firebaseFunctions/firebaseFunctions";
import GridItem from "../../material-ui/Grid/GridItem";
import GridContainer from "../../material-ui/Grid/GridContainer";
import InputFields from "../../material-ui/FromComponents/InputFields";
import { Link, Redirect } from "react-router-dom";
import Copyright from "../Copyright/copyright";
import { useToasts } from "react-toast-notifications";
import { loginToSite, clearMessages } from "../../actions/userActions";
import { initialValues, userInputList, dataValidation } from "./formValues";
import { Formik, Form } from "formik";
import {
  loginErrroSelector,
  currentUserSelector,
} from "../../selectors/selectors";

const useStyles = makeStyles((theme) => signInSignUp(theme));

const SignIn = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null);
  const currentUserData = useSelector(currentUserSelector);
  const loginError = useSelector(loginErrroSelector);
  const { addToast } = useToasts();

  useEffect(() => {
    if (currentUserData) {
      if (Object.keys(currentUserData).length > 2) {
        addToast("Logged In Suceessfully !", {
          appearance: "success",
          autoDismiss: true,
        });
        setCurrentUser(currentUserData);
      }
      if (Object.keys(currentUserData).length === 2) {
        getUserDataFromDb(setCurrentUser, currentUserData);
      }
    }
  }, [currentUserData, addToast, dispatch]);

  useEffect(() => {
    if (loginError) {
      addToast(loginError, {
        appearance: "error",
        autoDismiss: true,
      });
      dispatch(clearMessages(null));
    }
  }, [loginError, addToast, dispatch]);

  const submitFormValues = (values) => {
    dispatch(loginToSite(values));
  };
  return (
    <>
      {currentUser ? (
        <Redirect
          to={{
            pathname: "/home",
            state: { data: currentUser },
          }}
        />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting }) => {
                submitFormValues(values);
                setSubmitting(false);
              }}
              validationSchema={dataValidation}
            >
              {({
                isSubmitting,
                values,

                handleChange,
              }) => (
                <Form className={classes.form}>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer>
                      <InputFields
                        inputList={userInputList}
                        values={values}
                        handleChange={handleChange}
                      />
                    </GridContainer>
                  </GridItem>

                  <div className={classes.signinButton}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      disabled={isSubmitting}
                    >
                      Sign In
                    </Button>
                  </div>
                  <div className={classes.alignLink}>
                    Don't have an Account? &nbsp;
                    <Link className={classes.handleAnchor} to="/register">
                      Sign Up
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      )}
    </>
  );
};
export default SignIn;
