export const signOutSelector = (state) => state.loginReducer.signOutSuccess;
export const loginErrroSelector = (state) => state.loginReducer.loginError;
export const currentUserSelector = (state) => state.loginReducer.currentUser;
export const addUserSelector = (state) => state.userReducer.addUserError;
export const updateSuceessSelector = (state) =>
  state.userReducer.updateUserSuccess;
export const updateErrSelector = (state) => state.userReducer.updateUserError;
