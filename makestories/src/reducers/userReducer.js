import { ADD_USER_ERROR, CLEAR_USER_MESSAGE } from "../actions/actionTypes";

const initialState = {
  addUserError: null,
};

const userReducer = (state = initialState, action) => {
  console.log("reducer", action);
  switch (action.type) {
    case ADD_USER_ERROR:
      return {
        ...state,
        addUserError: action.message,
      };

    case CLEAR_USER_MESSAGE:
      return {
        ...state,
        addUserError: null,
      };

    default:
      return state;
  }
};

export default userReducer;
