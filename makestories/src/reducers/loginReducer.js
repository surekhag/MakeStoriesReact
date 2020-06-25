import {
  CURRENT_USER,
  ADD_NEW_USER,
  UPDATE_USER,
  CLEAR_MESSAGE,
  SIGNIN_ERROR,
} from "../actions/actionTypes";
const initialState = {
  // users: [
  //   {
  //     firstName: "surekha",
  //     lastName: "Gadkari",
  //     username: "surekhag",
  //     password: "12345678",
  //     contact_number: "7894561230",
  //     email: "mails.surekhag@gmail.com",
  //   },
  // ],
  error: "null",
  currentUser: null,
  loginError: null,
};

const loginReducer = (state = initialState, action) => {
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
    case CLEAR_MESSAGE:
      return {
        ...state,
        loginError: null,
      };

    default:
      return state;
  }
};

export default loginReducer;
