import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { catalogReducer } from "./modules/catalog/reducer";
import catalogSaga from "./modules/catalog/saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  catalog: catalogReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

function* rootSaga() {
  yield all([catalogSaga()]);
}

sagaMiddleware.run(rootSaga);
