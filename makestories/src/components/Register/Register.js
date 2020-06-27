import React, { useRef, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import GridContainer from "../../material-ui/Grid/GridContainer";
import GridItem from "../../material-ui/Grid/GridItem";
import Avatar from "@material-ui/core/Avatar";
import Card from "../../material-ui/Card/Card";
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
import {
  updateErrSelector,
  updateSuceessSelector,
  addUserSelector,
  currentUserSelector,
} from "../../selectors/selectors";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import signInSignUp from "../../material-ui/styles/signInSignUp";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputFields from "../../material-ui/FromComponents/InputFields";
import { useToasts } from "react-toast-notifications";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { submitDataWithImage } from "../../firebaseFunctions/firebaseFunctions";
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
  const [isLoading, setLoading] = useState(false);

  const [updatedUser, setUpdatedUser] = useState(null);
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

  const [updatedImage, setUpdatedImage] = useState(photoURL);
  const currentUser = useSelector(currentUserSelector);
  const addUserError = useSelector(addUserSelector);
  const updateSuccess = useSelector(updateSuceessSelector);
  const updateError = useSelector(updateErrSelector);
  const userForm = useRef(null);

  useEffect(() => {
    if (!userToUpdate) dispatch(setCurrentUserData());
  }, [dispatch, userToUpdate]);

  useEffect(() => {
    if (updateSuccess && userToUpdate) {
      addToast(updateSuccess, {
        appearance: "success",
        autoDismiss: true,
      });
      dispatch(clearUserMessages());
      updatedUser.photoURL = updatedImage;
      setUser(updatedUser);
      setLoading(false);
    }
  }, [
    updateSuccess,
    addToast,
    dispatch,
    updatedUser,
    updatedImage,
    userToUpdate,
  ]);

  useEffect(() => {
    if (updateError) {
      addToast(updateError, {
        appearance: "error",
        autoDismiss: true,
      });
      dispatch(clearUserMessages());
      setLoading(false);
    }
  }, [updateError, addToast, dispatch]);

  useEffect(() => {
    if (currentUser && !userToUpdate) {
      setUser(currentUser);
      addToast("User has been registered successfully!", {
        appearance: "success",
        autoDismiss: true,
      });
      setLoading(false);
    }
  }, [currentUser, addToast, userToUpdate]);

  useEffect(() => {
    if (addUserError) {
      addToast(addUserError, {
        appearance: "error",
        autoDismiss: true,
      });
      dispatch(clearUserMessages());
      setLoading(false);
    }
  }, [addUserError, addToast, dispatch]);

  const submitFormValues = (values) => {
    setLoading(true);
    if (userToUpdate) {
      setUpdatedUser(values);
      if (values.password && values.password.length < 8) {
        addToast("Password must be at least 8 characters long!", {
          appearance: "error",
          autoDismiss: true,
        });
        return false;
      }
      console.log("here above keyys");
      const finalValues = getFinalDataForUpdate(values, userToUpdate);
      const val = Object.keys(finalValues).length === 0;
      console.log("obj empty", val);
      if (val) {
        setUser(userToUpdate);
        setLoading(false);
      } else {
        if (finalValues.photoURL) {
          //Submit data with updated image
          submitDataWithImage(
            finalValues,
            dispatch,
            updateUser,
            setUpdatedImage,
            addNewUser,
            userToUpdate
          );
          setLoading(true);
        } else {
          setUpdatedUser(values);
          setLoading(true);
          dispatch(updateUser(finalValues));
        }
      }
    } else {
      if (values.photoURL) {
        //New user with image
        submitDataWithImage(
          values,
          dispatch,
          updateUser,
          setUpdatedImage,
          addNewUser,
          userToUpdate
        );
        setLoading(true);
      } else {
        dispatch(addNewUser(values));
        setLoading(true);
      }
    }
  };

  const handleCancelActivity = () => {
    if (userToUpdate) {
      setUser(userToUpdate);
    }
  };

  const dataValidation = userToUpdate ? updateValidations : creatNewValidations;

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
            <Loader
              type="Oval"
              color="#00BFFF"
              height={30}
              width={30}
              style={{ display: isLoading ? "block" : "none" }}
            />

            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              {userToUpdate ? "Update User" : "Sign Up"}
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
                                  id="raised-button-file"
                                  type="file"
                                  name="photoURL"
                                  onChange={(event) => {
                                    setFieldValue(
                                      "photoURL",
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          </GridContainer>
                        </CardBody>

                        <CardFooter>
                          {userToUpdate ? (
                            <>
                              <GridItem xs={12} sm={12} md={12}>
                                <div className={classes.alignLink}>
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
                                </div>
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
                                    SIGN UP
                                  </Button>
                                  <div className={classes.alignLink}>
                                    Already have an account ? &nbsp;
                                    <Link
                                      className={classes.handleAnchor}
                                      to="/login"
                                    >
                                      Sign In
                                    </Link>
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
