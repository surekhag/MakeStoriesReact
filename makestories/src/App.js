import React from "react";
import "./App.css";
import { ToastProvider } from "react-toast-notifications";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import SignIn from "./components/Login/SignIn";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastProvider>
          <Switch>
            <Route exact path="/login" component={SignIn} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
            <Redirect from="/" to="/login" />
          </Switch>
        </ToastProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
