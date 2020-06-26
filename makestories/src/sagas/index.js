import { all, fork } from "redux-saga/effects";

import { watchLoginSaga } from "./watchers/login";
import { watchNewUserSaga, watchUpdateUserSaga } from "./watchers/newUser";
import { watchSignOutSaga } from "./watchers/logout";
export default function* root() {
  yield all([
    fork(watchLoginSaga),
    fork(watchNewUserSaga),
    fork(watchUpdateUserSaga),
    fork(watchSignOutSaga),
  ]);
}
