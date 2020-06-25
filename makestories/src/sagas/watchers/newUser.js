import { put, takeLatest, call } from "redux-saga/effects";
import { ADD_NEW_USER } from "../../actions/actionTypes";
import { setCurrentUserData, addUserError } from "../../actions/userActions";
import { signup } from "../../firebaseFunctions/firebaseFunctions";
function* workerNewUserSaga({ userInfo }) {
  try {
    const response = yield signup(userInfo);
    console.log("response", response);

    if (response) {
      //Not saving password
      const {
        email,
        phoneNumber,
        photoURL,
        firstName,
        lastName,
        address,
        age,
      } = userInfo;
      const { uid } = response;
      yield put(
        setCurrentUserData({
          email,
          //   password,
          phoneNumber,
          photoURL,
          uid,
          firstName,
          lastName,
          address,
          age,
        })
      );
    }
  } catch (e) {
    if (e.message) {
      yield put(addUserError(e.message));
    }
  }
}

export function* watchNewUserSaga() {
  yield takeLatest(ADD_NEW_USER, workerNewUserSaga);
}
