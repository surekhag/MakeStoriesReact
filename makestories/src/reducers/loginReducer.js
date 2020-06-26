import {
  CURRENT_USER,
  CLEAR_MESSAGE,
  SIGNIN_ERROR,
  SIGN_OUT_SUCCESS,
} from "../actions/actionTypes";
const initialState = {
  error: "null",
  currentUser: null,
  loginError: null,
  signOutSuccess: null,
};

const loginReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.userInfo,
      };
    case SIGNIN_ERROR:
      console.log(action.message);
      return {
        ...state,
        loginError: action.message,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        signOutSuccess: action.message,
      };

    case CLEAR_MESSAGE:
      return {
        ...state,
        loginError: null,
        signOutSuccess: null,
      };

    default:
      return state;
  }
};

export default loginReducer;
