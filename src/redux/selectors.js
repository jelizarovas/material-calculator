import { VISIBILITY_FILTERS } from "../constants";

export const getWaresState = (store) => store.wares;

export const getWareList = (store) => (getWaresState(store) ? getWaresState(store).allIds : []);

export const getWareById = (store, id) => (getWaresState(store) ? { ...getWaresState(store).byIds[id], id } : {});

/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
export const getWares = (store) => getWareList(store).map((id) => getWareById(store, id));

export const getWaresByVisibilityFilter = (store, visibilityFilter) => {
  const allWares = getWares(store);
  switch (visibilityFilter) {
    case VISIBILITY_FILTERS.COMPLETED:
      return allWares.filter((ware) => ware.completed);
    case VISIBILITY_FILTERS.INCOMPLETE:
      return allWares.filter((ware) => !ware.completed);
    case VISIBILITY_FILTERS.ALL:
    default:
      return allWares;
  }
};
