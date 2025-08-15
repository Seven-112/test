import { call, put, takeLatest } from "redux-saga/effects";
import { fetchCatalogSuccess, fetchCatalogFailure, FETCH_CATALOG_REQUEST } from "./actions";
import { Catalog } from "@/utils/type";

function fetchCatalogApi() {
  return fetch("/api/data").then(res => {
    if (!res.ok) throw new Error("Failed to fetch catalog");
    return res.json() as Promise<Catalog>;
  });
}

function* fetchCatalogSaga() {
  try {
    const catalog: Catalog = yield call(fetchCatalogApi);
    yield put(fetchCatalogSuccess(catalog));
  } catch (error: any) {
    yield put(fetchCatalogFailure(error.message || "Failed to fetch catalog"));
  }
}
  
export default function* catalogWatcherSaga() {
  yield takeLatest(FETCH_CATALOG_REQUEST, fetchCatalogSaga);
}
