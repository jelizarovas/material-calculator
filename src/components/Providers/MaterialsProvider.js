import React, { useContext, useReducer, createContext, useEffect } from "react";

const MaterialsContext = createContext();
const MaterialsDispatchContext = createContext();

const useMaterials = () => {
  const context = useContext(MaterialsContext);
  if (context === undefined) {
    throw new Error("useMaterials must be used within a MaterialsProvider");
  }
  return context;
};
const useMaterialsDispatch = () => {
  const context = useContext(MaterialsDispatchContext);
  if (context === undefined) {
    throw new Error("useMaterialsDispatch must be used within a MaterialsDispatchProvider");
  }
  return context;
};

const materialsReducer = (state, { field, value, type, groupName = "materials", payload, id = null }) => {
  if (!type) {
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
        return {
          ...state,
          [groupName]: group?.find((g) => g.id === id)
            ? group.map((g) => (id === g.id ? { ...g, ...payload } : g))
            : [...group, { id, ...payload }],
        };
      }
      case "groupClear": {
        return {
          ...state,
          [groupName]: [],
        };
      }
      case "groupRemove": {
        return {
          ...state,
          [groupName]: group.filter((g) => g.id !== id),
        };
      }
      default:
        return state;
    }
  }
};

const getInitialState = () => {
  if ("materials" in localStorage) {
    try {
      return JSON.parse(localStorage.getItem("materials"));
    } catch (err) {
      return {};
    }
  } else {
    return { materials: [] };
  }
};

const withLocalStorageCache = (reducer) => {
  return (state, action) => {
    const newState = reducer(state, action);
    localStorage.setItem("materials", JSON.stringify(newState));
    return newState;
  };
};

const MaterialsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(withLocalStorageCache(materialsReducer), getInitialState());

  const { materials } = state;

  useEffect(() => {
    dispatch({
      field: "totalMaterials",
      value: materials && materials.reduce((sum, { units, rate }) => sum + Number(units) * Number(rate), 0),
    });
  }, [materials, dispatch]);

  return (
    <MaterialsContext.Provider value={state}>
      <MaterialsDispatchContext.Provider value={dispatch}>{children}</MaterialsDispatchContext.Provider>
    </MaterialsContext.Provider>
  );
};

export { MaterialsProvider, useMaterials, useMaterialsDispatch };
