//TODO CREATE ACTION TYPES
// import { ADD_WARE, TOGGLE_WARE } from "../actionTypes";

const initialState = {
  materials: [],
  miscFees: [],
};

export default function move(state = initialState, { field, value = "", type, groupName, payload, id = null }) {
  if (!type && field) {
    return {
      ...state,
      [field]: value,
    };
  } else {
    const group = state[groupName];
    switch (type) {
      case "fieldsUpdate": {
        return {
          ...state,
          ...payload,
        };
      }
      case "groupUpdate": {
        if (!id || !groupName || !group) return { ...state };
        return {
          ...state,
          [groupName]: group?.find((g) => g.id === id)
            ? group?.map((g) => (id === g.id ? { ...g, ...payload } : g))
            : [...group, { id, ...payload }],
        };
      }
      case "groupClear": {
        if (!groupName) return { ...state };
        return {
          ...state,
          [groupName]: [],
        };
      }
      case "groupRemove": {
        if (!id || !groupName) return { ...state };
        return {
          ...state,
          [groupName]: group.filter((g) => g.id !== id),
        };
      }
      case "clearData": {
        return initialState;
      }
      default:
        return state;
    }
  }
}
