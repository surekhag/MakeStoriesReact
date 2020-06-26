import { put, takeLatest } from "redux-saga/effects";
import { SIGNIN } from "../../actions/actionTypes";
import { setCurrentUserData, loginError } from "../../actions/userActions";
import { signin } from "../../firebaseFunctions/firebaseFunctions";
function* workerLoginSaga({ userInfo }) {
  const { email, password } = userInfo;
  try {
    const response = yield signin(email, password);
    if (response && response.user) {
      const { email, uid } = response.user;
      yield put(
        setCurrentUserData({
          email,
          uid,
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
