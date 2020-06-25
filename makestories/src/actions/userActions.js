import {
  ADD_NEW_USER,
  UPDATE_USER,
  CURRENT_USER,
  SIGNIN,
  CLEAR_MESSAGE,
  SIGNIN_ERROR,
  ADD_USER_ERROR,
  CLEAR_USER_MESSAGE,
} from "./actionTypes";

export function addNewUser(userInfo) {
  console.log("add new", userInfo);
  return {
    type: ADD_NEW_USER,
    userInfo,
  };
}

export function loginToSite(userInfo) {
  return {
    type: SIGNIN,
    userInfo,
  };
}

export function clearUserMessages() {
  return {
    type: CLEAR_USER_MESSAGE,
  };
}
export function clearMessages() {
  return {
    type: CLEAR_MESSAGE,
  };
}

export function addUserError(message) {
  return {
    type: ADD_USER_ERROR,
    message,
  };
}
export function loginError(message) {
  return {
    type: SIGNIN_ERROR,
    message,
  };
}

export function setCurrentUserData(userInfo) {
  return {
    type: CURRENT_USER,
    userInfo,
  };
}
export function updateUser(userInfo) {
  console.log(userInfo, "action");
  return {
    type: UPDATE_USER,
    userInfo,
  };
}
