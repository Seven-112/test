import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCatalogRequest } from "@/store/modules/catalog/actions";
import { selectCatalog, selectCatalogLoading, selectCatalogError } from "@/store/modules/catalog/selectors";

export const useCatalog = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectCatalog);
  const loading = useSelector(selectCatalogLoading);
  const error = useSelector(selectCatalogError);

  useEffect(() => {
    if (!data) {
      dispatch(fetchCatalogRequest());
    } else {
      console.log("data: ", data);
    }
  }, [dispatch, data]);

  return { data, loading, error };
};