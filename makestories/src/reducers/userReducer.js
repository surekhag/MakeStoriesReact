import {
  ADD_USER_ERROR,
  CLEAR_USER_MESSAGE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from "../actions/actionTypes";

const initialState = {
  addUserError: null,
  updateUserSuccess: null,
  updateUserError: null,
};

const userReducer = (state = initialState, action) => {
  console.log("reducer", action);
  switch (action.type) {
    case ADD_USER_ERROR:
      return {
        ...state,
        addUserError: action.message,
      };
    case UPDATE_USER_SUCCESS:
      console.log(action);
      return {
        ...state,
        updateUserSuccess: action.message,
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        updateUserError: action.message,
      };
    case CLEAR_USER_MESSAGE:
      return {
        ...state,
        addUserError: null,
        updateUserError: null,
        updateUserSuccess: null,
      };

    default:
      return state;
  }
};

export default userReducer;
