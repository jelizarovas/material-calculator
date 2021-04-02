// import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import { useCallback, useState } from "react";
import { mergeDefaultWProvider } from "./helperFunctions";
import { vibrate } from "./vibrate";

export const useGroup = (groupName, defaultState, providerState, dispatch) => {
  const [group, setGroup] = useState(mergeDefaultWProvider(defaultState, providerState));

  const update = useCallback(
    (id, data = {}) => {
      if (!providerState.find((g) => g.id === id)) {
        data = { ...defaultState.find((g) => g.id === id), ...data };
        ["Icon", "Guide"].forEach((e) => delete data[e]);
      }
      dispatch({ groupName, type: "groupUpdate", id, payload: data });
      setGroup((g) => g.map((i) => (id === i.id ? { ...i, ...data } : i)));
    },
    [dispatch, groupName, providerState, defaultState]
  );
  const add = useCallback(
    (propsObj = {}) => {
      const id = nanoid(6);
      const data = { name: `Custom - ${id}`, ...propsObj, isCustom: true };
      dispatch({ groupName, type: "groupUpdate", id, payload: data });
      setGroup((g) => [...g, { id, ...data }]);
    },
    [dispatch, groupName]
  );
  const remove = useCallback(
    (id) => {
      dispatch({ groupName, type: "groupRemove", id });
      setGroup((g) => g.filter((i) => i.id !== id));
    },
    [dispatch, groupName]
  );

  const clear = useCallback(() => {
    dispatch({ groupName, type: "groupClear" });
    setGroup(defaultState);
    vibrate(500);
  }, [groupName, dispatch, defaultState]);

  return [group, setGroup, update, add, remove, clear];
};
