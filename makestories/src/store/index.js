import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../reducers";
import sagas from "../sagas";

// const enhancers = [];

const sagaMiddleware = createSagaMiddleware({
  onError: (err) => {
    if (err.response && err.response.data) {
      const errorData = err.response.data;
      store.dispatch({ type: "SET_ERROR_STATE", errorData });
    }
  },
});

const middleware = [sagaMiddleware];
const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddleware.run(sagas);

export default store;
