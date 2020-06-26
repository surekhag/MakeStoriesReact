import { put, takeLatest, call } from "redux-saga/effects";
import { ADD_NEW_USER, UPDATE_USER } from "../../actions/actionTypes";
import {
  setCurrentUserData,
  addUserError,
  updateUserSuccess,
  updateUserError,
} from "../../actions/userActions";
import {
  signup,
  updateDetails,
  doPasswordUpdate,
} from "../../firebaseFunctions/firebaseFunctions";
function* workerNewUserSaga({ userInfo }) {
  try {
    const response = yield signup(userInfo);
    console.log("response", response);
    // console.log("in saga response", )
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
    console.log("in saga err");
    if (e.message) {
      yield put(addUserError(e.message));
    }
  }
}

export function* watchNewUserSaga() {
  yield takeLatest(ADD_NEW_USER, workerNewUserSaga);
}

function* workerUpdateUserSaga({ userInfo }) {
  console.log("in saga ", userInfo);
  const { password, ...userWithoutPassword } = userInfo;
  console.log("pas ", password, " withour oass ", userWithoutPassword);
  try {
    yield updateDetails(userWithoutPassword);
    if (password) {
      yield doPasswordUpdate(password);
    }

    yield put(
      updateUserSuccess({ message: "User info has been updated successfully" })
    );
  } catch (e) {
    if (e.message) {
      yield put(updateUserError(e.message));
    }
  }
}
export function* watchUpdateUserSaga() {
  yield takeLatest(UPDATE_USER, workerUpdateUserSaga);
}
