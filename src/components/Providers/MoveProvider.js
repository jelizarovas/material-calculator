import React, { useContext, useReducer, createContext, useEffect } from "react";
import { defaultMove } from "../../utils/defaultMove";
// import { useKeyPress } from "../../utils/useKeyPress";
// const small = useKeyPress("q");
// console.log(small);
// const medium = useKeyPress("w");
// const large = useKeyPress("e");
// const mattressbag = useKeyPress("r");
// const wardrobeRent = useKeyPress("t");
// const wardrobeBuy = useKeyPress("y");
// const num1 = useKeyPress("1");
// const num2 = useKeyPress("2");q
// const num3 = useKeyPress("3");
// const num4 = useKeyPress("4");
// const num5 = useKeyPress("5");

// useEffect(() => {
//   if (small) {
//     dispatch({ type: "keyAdd", payload: "q3lYEM" });
//   }
//   return () => {};
// }, [small]);

const MoveContext = createContext();
const MoveDispatchContext = createContext();

const useMove = () => {
  const context = useContext(MoveContext);
  if (context === undefined) {
    throw new Error("useMove must be used within a MoveProvider");
  }
  return context;
};
const useMoveDispatch = () => {
  const context = useContext(MoveDispatchContext);
  if (context === undefined) {
    throw new Error("useMoveDispatch must be used within a MoveDispatchProvider");
  }
  return context;
};

const moveReducer = (state, { field, value, type, payload }) => {
  if (!type) {
    return {
      ...state,
      [field]: value,
    };
  } else {
    const materials = state.materials;
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
          if (payload.units === 0) return { ...state, materials: materials.filter((m) => m.id !== payload.id) };
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

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// const getDataFromAPI = async () => {
//   await delay(2000);
//   return {
//     my: "data"
//   };
// };

const getInitialState = () => {
  if ("move" in localStorage) {
    try {
      return JSON.parse(localStorage.getItem("move"));
    } catch (err) {
      return {};
    }
  } else {
    return defaultMove;
  }
};

const withLocalStorageCache = (reducer) => {
  return (state, action) => {
    const newState = reducer(state, action);
    localStorage.setItem("move", JSON.stringify(newState));
    return newState;
  };
};

const MoveProvider = ({ children }) => {
  const [state, dispatch] = useReducer(withLocalStorageCache(moveReducer), getInitialState());

  const {
    valuation,
    valuationCost,
    valuationCostWithDeductible,
    shipmentValue,
    valuationRate,
    valuationRateWithDeductible,
    estimatedWeight,
    hourlyRate,
    travelTime,
    totalHours,
    startTime,
    endTime,
    arriveTime,
    departTime,
    breakTime,
    subtotal,
    materials,
    // adjustment,
    totalMovingCharges,
    totalAmountPaid,
    flatIsMaterialsIncluded,
    // remainingBalance,
    paymentOption,
    totalTransportation,
    jobType,
    flatAmount,
    totalMaterials,
    totalOtherFees,
  } = state;

  useEffect(() => {
    dispatch({
      field: "totalMaterials",
      value:
        jobType === "flatRate" && flatIsMaterialsIncluded === true
          ? 0
          : materials.reduce((sum, { units, rate }) => sum + Number(units) * Number(rate), 0),
    });
  }, [materials, jobType, flatIsMaterialsIncluded, dispatch]);

  useEffect(() => {
    dispatch({
      field: "totalValuation",
      value: valuation === "basic" ? 0 : valuation === "replacement" ? valuationCost : valuationCostWithDeductible,
    });
  }, [valuation, valuationCost, valuationCostWithDeductible, dispatch]);

  useEffect(() => {
    // if (shipmentValue < estimatedWeight * 5) {
    //   dispatch({
    //     field: "shipmentValue",
    //     value: estimatedWeight * 5,
    //   });
    // }
    dispatch({
      field: "valuationCost",
      value: Math.ceil((shipmentValue / 100) * valuationRate * 100) / 100,
    });
    dispatch({
      field: "valuationCostWithDeductible",
      value: Math.ceil((shipmentValue / 100) * valuationRateWithDeductible * 100) / 100,
    });
  }, [shipmentValue, valuationRate, valuationRateWithDeductible, dispatch]);

  useEffect(() => {
    // if (shipmentValue < estimatedWeight * 5) {
    dispatch({
      field: "shipmentValue",
      value: estimatedWeight * 5,
    });
    // }
  }, [estimatedWeight, dispatch]);

  useEffect(() => {
    let dt = timeToDecimal(departTime);
    const at = timeToDecimal(arriveTime);
    const bt = timeToDecimal(breakTime);

    if (dt < at) dt += 12;

    dispatch({
      field: "totalHours",
      value: convertToHHMM(dt - at - bt),
    });
  }, [totalHours, startTime, endTime, arriveTime, departTime, breakTime, dispatch]);

  useEffect(() => {
    dispatch({
      field: "travelFee",
      value: (Number(hourlyRate) * Number(travelTime)).toString(),
    });
  }, [travelTime, hourlyRate, dispatch]);

  useEffect(() => {
    if (jobType === "flatRate") {
      dispatch({
        field: "totalTransportation",
        value: Number(flatAmount).toString(),
      });
    }
  }, [jobType, flatAmount, dispatch]);

  useEffect(() => {
    dispatch({
      field: "subtotal",
      value: (
        Number(totalTransportation) +
        Number(totalOtherFees) +
        Number(totalMaterials) +
        Number(valuationCost)
      ).toString(),
    });

    return () => {};
  }, [
    totalTransportation,
    totalOtherFees,
    totalMaterials,
    valuationCost,
    // adjustment,
    // totalMovingCharges,
    // totalAmountPaid,
    // remainingBalance,
  ]);

  //TODO totalOtherFees

  //TODO adjustment
  useEffect(() => {
    let adjustment = 0;

    switch (paymentOption) {
      case "cash":
        adjustment = -5 / 100;
        break;
      case "card":
        adjustment = 3 / 100;
        break;

      default:
        break;
    }

    const adjustmentNumber = Number(subtotal) * adjustment;
    const totalMovingChargesNumber = Number(subtotal) * (1 + Number(adjustment));
    dispatch({
      field: "adjustment",
      value: money_round(adjustmentNumber).toString(),
    });
    dispatch({
      field: "totalMovingCharges",
      value: money_round(totalMovingChargesNumber).toString(),
    });
    return () => {};
  }, [paymentOption, subtotal]);

  useEffect(() => {
    const remainingBalanceNumber = Number(totalMovingCharges) - Number(totalAmountPaid);

    dispatch({
      field: "remainingBalance",
      value: money_round(remainingBalanceNumber).toString(),
    });
  }, [totalAmountPaid, totalMovingCharges]);
  //TODO totalAmountPaid

  //TODO remianing balance

  return (
    <MoveContext.Provider value={state}>
      <MoveDispatchContext.Provider value={dispatch}>{children}</MoveDispatchContext.Provider>
    </MoveContext.Provider>
  );
};

export { MoveProvider, useMove, useMoveDispatch };

function timeToDecimal(t) {
  var arr = t.split(":");
  var dec = parseInt((arr[1] / 6) * 10, 10);

  return parseFloat(parseInt(arr[0], 10) + "." + (dec < 10 ? "0" : "") + dec);
}

function convertToHHMM(info) {
  var hrs = parseInt(Number(info));
  var min = Math.round((Number(info) - hrs) * 60);
  return hrs + ":" + (min < 10 ? "0" : "") + min;
}

// function time_convert(num)
//  {
//   var hours = Math.floor(num / 60);
//   var minutes = (num *60)  % 60;
//   return hours + ":" + minutes;
// }

function money_round(num) {
  return Math.ceil(num * 100) / 100;
}
