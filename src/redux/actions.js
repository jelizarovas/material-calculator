import { ADD_WARE, TOGGLE_WARE, SET_FILTER } from "./actionTypes";

let nextWareId = 0;

export const addWare = (content) => ({
  type: ADD_WARE,
  payload: {
    id: ++nextWareId,
    content,
  },
});

export const toggleWare = (id) => ({
  type: TOGGLE_WARE,
  payload: { id },
});

export const setFilter = (filter) => ({ type: SET_FILTER, payload: { filter } });
