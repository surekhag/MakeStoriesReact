import { put, takeLatest, call } from "redux-saga/effects";
import { SIGNIN } from "../../actions/actionTypes";
import { setCurrentUserData, loginError } from "../../actions/userActions";
import {
  signin,
  // getUserInfo,
  // signInUserdata,
} from "../../firebaseFunctions/firebaseFunctions";
function* workerLoginSaga({ userInfo }) {
  console.log("in saga", userInfo);
  const { email, password } = userInfo;
  console.log("saga", email, password);
  try {
    const response = yield signin(email, password);

    // const userData = yield getUserInfo();
    // console.log("response", response, "userdata", userData);
    if (response && response.user) {
      const {
        email,
        // phoneNumber,
        // photoURL,
        uid,
        // firstName,
        // lastName,
        // address,
        // age,
      } = response.user;
      // console.log("saga res", email, phoneNumber, photoURL, uid);
      yield put(
        setCurrentUserData({
          email,
          // phoneNumber,
          // photoURL,
          uid,
          // firstName,
          // lastName,
          // address,
          // age,
        })
      );
    }
  } catch (e) {
    if (e.message) {
      yield put(loginError(e.message));
    }
  }
}

export function* watchLoginSaga() {
  yield takeLatest(SIGNIN, workerLoginSaga);
}
