import { RootState } from "@/store";

export const selectCatalog = (state: RootState) => state.catalog.data;
export const selectCatalogLoading = (state: RootState) => state.catalog.loading;
export const selectCatalogError = (state: RootState) => state.catalog.error;
