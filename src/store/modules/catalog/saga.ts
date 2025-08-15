import { call, put, takeLatest } from "redux-saga/effects";
import { fetchCatalogSuccess, fetchCatalogFailure, FETCH_CATALOG_REQUEST } from "./actions";
import { Catalog } from "@/utils/type";

async function fetchCatalogApi() {
  const res = await fetch("/api/data");
  if (!res.ok) throw new Error("Failed to fetch catalog");
  return await (res.json() as Promise<Catalog>);
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
