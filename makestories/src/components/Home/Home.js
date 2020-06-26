import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../material-ui/Grid/GridItem";
import GridContainer from "../../material-ui/Grid/GridContainer";
import Button from "../../material-ui/CustomButtons/Button";
import Card from "../../material-ui/Card/Card";
import CardHeader from "../../material-ui/Card/CardHeader";
import CardBody from "../../material-ui/Card/CardBody";
import Table from "../../material-ui/Table/Table";
import styles from "../../material-ui/styles/dashboardStyle";
import { Redirect } from "react-router-dom";
import { signOutFromSite } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import defaultImage from "../../assets/images/default-user-image.png";
import { clearMessages } from "../../actions/userActions";

import { useToasts } from "react-toast-notifications";
const useStyles = makeStyles(styles);

const Home = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const signOut = useSelector((state) => state.loginReducer.signOutSuccess);
  const data = props.location.state.data;
  console.log("inside home", data);
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState(null);
  const { addToast } = useToasts();
  useEffect(() => {
    if (signOut) {
      addToast(signOut, {
        appearance: "success",
        autoDismiss: true,
      });
      dispatch(clearMessages());
      setRedirect(true);
    }
  }, [signOut, dispatch]);
  const {
    firstName,
    lastName,
    // password,
    email,
    phoneNumber,
    age,
    address,
    photoURL,
  } = data;

  let employeeDataArray = [];
  const headerArray = [];

  employeeDataArray = [
    [
      <span className={classes.boldText}>Name</span>,
      `${firstName} ${lastName}`,
    ],
    [<span className={classes.boldText}>Email</span>, email],
    [<span className={classes.boldText}>contact Number</span>, phoneNumber],
    [<span className={classes.boldText}>Age</span>, age],
    [<span className={classes.boldText}>Address</span>, address],
  ];
  const editUser = () => {
    setUser(data);
  };
  const logout = () => {
    console.log("click log");
    dispatch(signOutFromSite());
  };
  return (
    <>
      {redirect ? <Redirect to="/login" /> : null}
      {user ? (
        <Redirect
          to={{
            pathname: "/register",
            state: { userToUpdate: user },
          }}
        />
      ) : (
        <Container component="main" maxWidth="lg">
          <div className={classes.paper}>
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.profile}>
                <GridItem xs={3} sm={3} md={3}>
                  <img
                    className={classes.imageContainer}
                    src={
                      // photoURL ? URL.createObjectURL(photoURL) : defaultImage
                      photoURL ? photoURL : defaultImage
                    }
                    alt=""
                  />
                </GridItem>
                {/* <GridItem xs={9} sm={9} md={9}>
                  <Typography component="h1" variant="h5">
                    User Profile
                  </Typography>
                </GridItem> */}
              </div>
              <Typography component="h1" variant="h5">
                User Profile
              </Typography>
              <Card>
                <CardBody>
                  <GridContainer>
                    {employeeDataArray && (
                      <Table
                        tableHeaderColor="gray"
                        tableHead={headerArray}
                        tableData={employeeDataArray}
                      />
                    )}
                  </GridContainer>
                </CardBody>
              </Card>

              <div className={classes.stylesForButton}>
                <Button onClick={editUser} variant="contained" color="primary">
                  Edit USER
                </Button>
                <Button onClick={logout} variant="contained" color="primary">
                  LOGOUT
                </Button>
              </div>
            </GridItem>
          </div>
        </Container>
      )}
    </>
  );
};

export default Home;
