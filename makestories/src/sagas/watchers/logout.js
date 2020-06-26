import { put, takeLatest, call } from "redux-saga/effects";
import { SIGN_OUT } from "../../actions/actionTypes";
import { doSignOut } from "../../firebaseFunctions/firebaseFunctions";
import { setCurrentUserData, SignOutSuccess } from "../../actions/userActions";
function* workerSignOutSaga() {
  console.log("signout saga");
  try {
    yield doSignOut();
    yield put(setCurrentUserData(null));
    yield put(SignOutSuccess({ message: "Logged Out Successfully" }));
  } catch (e) {
    yield put(setCurrentUserData(null));
    yield put(SignOutSuccess({ message: "Logged Out Successfully" }));
  }
}

export function* watchSignOutSaga() {
  yield takeLatest(SIGN_OUT, workerSignOutSaga);
}
