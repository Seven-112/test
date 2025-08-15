import {
  FETCH_CATALOG_REQUEST,
  FETCH_CATALOG_SUCCESS,
  FETCH_CATALOG_FAILURE,
} from "./actions";
import { Catalog } from "@/utils/type";

type CatalogState = {
  data: Catalog | null;
  loading: boolean;
  error: string | null;
};

const initialState: CatalogState = {
  data: null,
  loading: false,
  error: null,
};

export const catalogReducer = (state = initialState, action: any): CatalogState => {
  switch (action.type) {
    case FETCH_CATALOG_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CATALOG_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_CATALOG_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
