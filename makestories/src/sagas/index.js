import { all, fork } from "redux-saga/effects";

import { watchLoginSaga } from "./watchers/login";
import { watchNewUserSaga } from "./watchers/newUser";
export default function* root() {
  yield all([fork(watchLoginSaga), fork(watchNewUserSaga)]);
}
