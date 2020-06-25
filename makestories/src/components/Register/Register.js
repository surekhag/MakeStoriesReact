import React, { useRef, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ErrorMessage } from "formik";
import CssBaseline from "@material-ui/core/CssBaseline";
import GridContainer from "../../material-ui/Grid/GridContainer";
import GridItem from "../../material-ui/Grid/GridItem";
import Avatar from "@material-ui/core/Avatar";
import Card from "../../material-ui/Card/Card";
// import CardHeader from "../../material-ui//Card/CardHeader";
import CardBody from "../../material-ui/Card/CardBody";
import CardFooter from "../../material-ui/Card/CardFooter";
import Button from "../../material-ui/CustomButtons/Button";
import {
  creatNewValidations,
  updateValidations,
  userInputList,
  userInputListUpdate,
  getFinalDataForUpdate,
} from "./formData";
import { Link, Redirect } from "react-router-dom";
import signInSignUp from "../../material-ui/styles/signInSignUp";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputFields from "../../material-ui/FromComponents/InputFields";
import { useToasts } from "react-toast-notifications";
import { Formik, Form } from "formik";
// import styles from "../../material-ui/styles/dashboardStyle";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUser,
  addNewUser,
  setCurrentUserData,
  clearUserMessages,
} from "../../actions/userActions";

const useStyles = makeStyles((theme) => signInSignUp(theme));

const Register = (props) => {
  console.log("data", props.location.state);
  const classes = useStyles();
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  let { userToUpdate } = props.location.state || {};

  let initialValues;
  const {
    firstName,
    lastName,
    password,
    email,
    phoneNumber,
    age,
    address,
    photoURL,
  } = userToUpdate ? userToUpdate : {};

  initialValues = {
    firstName,
    lastName,
    password,
    email,
    phoneNumber,
    age,
    address,
    photoURL,
  };

  const [file, setFile] = useState(photoURL);
  const currentUser = useSelector((state) => state.loginReducer.currentUser);
  const addUserError = useSelector((state) => state.userReducer.addUserError);
  const userForm = useRef(null);

  useEffect(() => {
    if (!userToUpdate) dispatch(setCurrentUserData());
  }, []);

  useEffect(() => {
    if (currentUser && !userToUpdate) {
      setUser(currentUser);
      addToast("User has been registered successfully!", {
        appearance: "success",
        autoDismiss: true,
      });
    }
  }, [currentUser, addToast]);

  useEffect(() => {
    if (addUserError) {
      addToast(addUserError, {
        appearance: "error",
        autoDismiss: true,
      });
      dispatch(clearUserMessages());
    }
  }, [addUserError, addToast, dispatch]);

  const submitFormValues = (values) => {
    if (userToUpdate) {
      if (values.password && values.password.length < 8) {
        addToast("Password must be at least 8 characters long!", {
          appearance: "error",
          autoDismiss: true,
        });
        return false;
      }

      const finalValues = getFinalDataForUpdate(values, userToUpdate);

      if (finalValues) {
        console.log("yes   data for update", finalValues);
        dispatch(updateUser(finalValues));
      } else {
        console.log("updatedata");
        setUser(userToUpdate);
      }
    } else {
      dispatch(addNewUser(values));
    }
  };

  const handleCancelActivity = () => {
    if (userToUpdate) {
      setUser(userToUpdate);
    }
  };

  const dataValidation = userToUpdate
    ? creatNewValidations
    : {
        creatNewValidations,
        ...updateValidations,
      };
  return (
    <>
      {user ? (
        <Redirect
          to={{
            pathname: "/home",
            state: { data: user },
          }}
        />
      ) : (
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {userToUpdate ? "Update User" : "Add User"}
            </Typography>
            <GridContainer>
              <Formik
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {
                  submitFormValues(values);
                  setSubmitting(false);
                }}
                validationSchema={dataValidation}
              >
                {({ isSubmitting, values, handleChange, setFieldValue }) => (
                  <GridItem xs={12} sm={12} md={12}>
                    <Card>
                      <Form ref={userForm} className={classes.form}>
                        <CardBody>
                          <GridContainer>
                            <InputFields
                              inputList={
                                userToUpdate
                                  ? userInputListUpdate
                                  : userInputList
                              }
                              values={values}
                              handleChange={handleChange}
                            />
                            <div className={classes.alignImage}>
                              <div>
                                <input
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  id="raised-button-file"
                                  type="file"
                                  name="photoURL"
                                  onChange={(event) => {
                                    setFile(event.currentTarget.files[0]);
                                    setFieldValue(
                                      "photoURL",
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                />

                                <label htmlFor="raised-button-file">
                                  <Button
                                    variant="raised"
                                    component="span"
                                    color="primary"
                                    className={classes.button}
                                  >
                                    Upload Image
                                  </Button>
                                </label>

                                <ErrorMessage
                                  className={classes.colorRed}
                                  name={"photoURL"}
                                  component="div"
                                />
                              </div>
                              {file ? (
                                <img
                                  className={classes.imageContainer}
                                  src={URL.createObjectURL(file)}
                                  alt=""
                                />
                              ) : null}
                            </div>
                          </GridContainer>
                        </CardBody>

                        <CardFooter>
                          {userToUpdate ? (
                            <>
                              <GridItem xs={12} sm={12} md={6}>
                                <Button
                                  id="update"
                                  type="submit"
                                  color="primary"
                                  disabled={isSubmitting}
                                >
                                  UPDATE USER
                                </Button>
                                <Button
                                  color="primary"
                                  disabled={isSubmitting}
                                  onClick={() => handleCancelActivity()}
                                >
                                  BACK TO HOME
                                </Button>
                              </GridItem>
                            </>
                          ) : (
                            <>
                              <GridItem xs={12} sm={12} md={12}>
                                <div className={classes.alignLink}>
                                  <Button
                                    id="add"
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    disabled={isSubmitting}
                                  >
                                    ADD USER
                                  </Button>
                                  <div>
                                    Already have an account ? &nbsp;
                                    <Link to="/login">Sign In</Link>
                                  </div>
                                </div>
                              </GridItem>
                            </>
                          )}
                        </CardFooter>
                      </Form>
                    </Card>
                  </GridItem>
                )}
              </Formik>
            </GridContainer>
          </div>
        </Container>
      )}
    </>
  );
};
export default Register;
