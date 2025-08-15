import { Catalog } from "@/utils/type";

export const FETCH_CATALOG_REQUEST = "catalog/FETCH_CATALOG_REQUEST";
export const FETCH_CATALOG_SUCCESS = "catalog/FETCH_CATALOG_SUCCESS";
export const FETCH_CATALOG_FAILURE = "catalog/FETCH_CATALOG_FAILURE";

export const fetchCatalogRequest = () => ({ type: FETCH_CATALOG_REQUEST });
export const fetchCatalogSuccess = (catalog: Catalog) => ({
  type: FETCH_CATALOG_SUCCESS,
  payload: catalog,
});
export const fetchCatalogFailure = (error: string) => ({
  type: FETCH_CATALOG_FAILURE,
  payload: error,
});