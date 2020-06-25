import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import signInSignUp from "../../material-ui/styles/signInSignUp";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { loginToSite, clearMessages } from "../../actions/userActions";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://makestories.io">
        Make Stories
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => signInSignUp(theme));

const SignIn = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const currentUserData = useSelector(
    (state) => state.loginReducer.currentUser
  );
  const loginError = useSelector((state) => state.loginReducer.loginError);
  const { addToast } = useToasts();

  useEffect(() => {
    if (currentUserData) {
      addToast("Logged In Suceessfully !", {
        appearance: "success",
        autoDismiss: true,
      });
      setCurrentUser(currentUserData);
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

  const handleSubmitForm = (e) => {
    e.preventDefault();

    //to do validations

    if (email && password) {
      const userInfo = { email, password };
      dispatch(loginToSite(userInfo));
    }
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

            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmitForm}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required={true}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => {
                  setemail(event.target.value);
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required={true}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => {
                  setpassword(event.target.value);
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!email || !password}
              >
                Sign In
              </Button>
              <div className={classes.alignLink}>
                Don't have an Account? <Link to="/register">Sign Up</Link>
              </div>
            </form>
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
