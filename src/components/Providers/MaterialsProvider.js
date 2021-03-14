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
    throw new Error(
      "useMaterialsDispatch must be used within a MaterialsDispatchProvider"
    );
  }
  return context;
};

const materialsReducer = (state, { field, value, type, payload }) => {
  if (!type) {
    return {
      ...state,
      [field]: value,
    };
  } else {
    const materials = state.materials || [];
    switch (type) {
      case "changeCount":
        let idExists = false;
        if (materials.length > 0) {
          for (let i = 0; i < materials.length; i++) {
            const { id } = materials[i];
            if (id === payload.id) idExists = true;
          }
        }
        if (idExists) {
          if (payload.units === 0)
            return {
              ...state,
              materials: materials.filter((m) => m.id !== payload.id),
            };
          return {
            ...state,
            materials: materials.map((d) => {
              if (d.id === payload.id) d.units = payload.units;
              if (d.id === payload.id) d.total = payload.total;
              return d;
            }),
          };
        } else {
          return {
            ...state,
            materials: [...materials, payload],
          };
        }
      case "clearCount":
        return {
          ...state,
          materials: [],
        };
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
  const [state, dispatch] = useReducer(
    withLocalStorageCache(materialsReducer),
    getInitialState()
  );

  const { materials } = state;

  useEffect(() => {
    dispatch({
      field: "totalMaterials",
      value:
        materials &&
        materials.reduce(
          (sum, { units, rate }) => sum + Number(units) * Number(rate),
          0
        ),
    });
  }, [materials, dispatch]);

  return (
    <MaterialsContext.Provider value={state}>
      <MaterialsDispatchContext.Provider value={dispatch}>
        {children}
      </MaterialsDispatchContext.Provider>
    </MaterialsContext.Provider>
  );
};

export { MaterialsProvider, useMaterials, useMaterialsDispatch };
