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
import { db, auth, fStore } from "../../services/Firebase/firebase";
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
  const currentUser = useSelector((state) => state.loginReducer.currentUser);
  const addUserError = useSelector((state) => state.userReducer.addUserError);
  const updateSuccess = useSelector(
    (state) => state.userReducer.updateUserSuccess
  );
  const updateError = useSelector((state) => state.userReducer.updateUserError);
  const userForm = useRef(null);

  useEffect(() => {
    if (!userToUpdate) dispatch(setCurrentUserData());
  }, []);

  useEffect(() => {
    if (updateSuccess && userToUpdate) {
      // setUser(updateSuccess);
      addToast(updateSuccess, {
        appearance: "success",
        autoDismiss: true,
      });
      dispatch(clearUserMessages());
      console.log("userForm ", updatedImage, updatedUser);
      updatedUser.photoURL = updatedImage;
      setUser(updatedUser);
    }
  }, [updateSuccess, addToast]);

  useEffect(() => {
    if (updateError) {
      addToast(updateError, {
        appearance: "error",
        autoDismiss: true,
      });
      dispatch(clearUserMessages());
    }
  }, [updateError, addToast, dispatch]);

  useEffect(() => {
    // console.log("currentUser0", currentUser);
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

  async function getImageUrl(image) {
    const uploadTask = fStore
      .ref(`/images/${image.photoURL.name}`)
      .put(image.photoURL);
    let firebaseImage;
    await uploadTask.on(
      "state_changed",
      (snapShot) => {
        console.log(snapShot);
      },
      (err) => {
        console.log(err);
      },
      () => {
        fStore
          .ref("images")
          .child(image.photoURL.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            image.photoURL = fireBaseUrl;
            console.log("inside save", image);
            if (userToUpdate) {
              dispatch(updateUser(image));
              console.log("update user data no image info", updatedUser);
              // setUpdatedUser
              setUpdatedImage(fireBaseUrl);
            } else {
              dispatch(addNewUser(image));
            }
          });
      }
    );
  }

  const submitFormValues = (values) => {
    console.log("submitted values", userToUpdate, values);
    let imageUrl = null;
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
        console.log("updatedata");
        setUser(userToUpdate);
      } else {
        console.log("yes   data for update", finalValues);
        // console.log(finalValues.photoURL, "ptoto");

        if (finalValues.photoURL) {
          console.log("yes   data for update with image ");
          getImageUrl(finalValues);
        } else {
          console.log("yes   data for update with no  image ");
          setUpdatedUser(values);
          dispatch(updateUser(finalValues));
        }
      }
    } else {
      if (values.photoURL) {
        console.log(" new user with image updates ");
        imageUrl = getImageUrl(values);
        console.log(imageUrl, "imageUrl");
      } else {
        console.log("New user with no image");
        dispatch(addNewUser(values));
      }

      // dispatch(addNewUser(values));
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
                                  // style={{ display: "none" }}
                                  id="raised-button-file"
                                  type="file"
                                  name="photoURL"
                                  onChange={(event) => {
                                    // setFile(event.currentTarget.files[0]);
                                    setFieldValue(
                                      "photoURL",
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                />
                                {/* <img src={photoURL ? photoURL : null} /> */}

                                {/* <ErrorMessage
                                  className={classes.colorRed}
                                  name={"photoURL"}
                                  component="div"
                                /> */}
                              </div>
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
