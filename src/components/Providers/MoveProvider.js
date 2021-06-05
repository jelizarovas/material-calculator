import React, { useContext, useReducer, createContext, useEffect } from "react";
// import { defaultMove } from "../../utils/defaultMove";
import { money_round, convertToHHMM, timeToDecimal } from "../../utils/helperFunctions";
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

const moveReducer = (state, { field, value = "", type, groupName, payload, id = null }) => {
  console.log({ field, type, payload, id, value });
  if (!type && field) {
    return {
      ...state,
      [field]: value,
    };
  } else {
    const group = state[groupName];
    switch (type) {
      case "fieldsUpdate": {
        //UPDATE MULTIPLE FIELDS
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
        return {};
      }
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
    return {};
    // return defaultMove;
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
    materials = [],
    miscFees = [],
    isTravelFeeFixed,
    travelFee,
    totalValuation,
    cubicWeight,
    // adjustment,
    netWeight,
    grossWeight,
    tareWeight,
    weightType,
    mileageRate,
    totalMovingCharges,
    totalAmountPaid,
    flatIsMaterialsIncluded,
    // remainingBalance,
    paymentOption,
    totalTransportation,
    jobType,
    flatAmount,
    totalMaterials,
    totalMiscFees,
  } = state;

  /*########## INITIAL VALUES ##########*/
  // useEffect(() => {
  //   if (state === {}) dispatch({
  //     type: "fieldsUpdate",
  //     payload: baseValues
  //   }))
  //   return () => {
  //     cleanup
  //   }
  // }, [state])

  /*########## TOTAL VALUATION ##########*/

  useEffect(() => {
    dispatch({
      field: "totalValuation",
      value: valuation === "basic" ? 0 : valuation === "replacement" ? valuationCost : valuationCostWithDeductible,
    });
  }, [valuation, valuationCost, valuationCostWithDeductible, dispatch]);

  /*########## VALUATION COSTS ##########*/
  useEffect(() => {
    // if (shipmentValue < estimatedWeight * 5) {
    //   dispatch({
    //     field: "shipmentValue",
    //     value: estimatedWeight * 5,
    //   });
    // }
    dispatch({
      type: "fieldsUpdate",
      payload: {
        valuationCost: Math.ceil((Number(shipmentValue) / 100) * Number(valuationRate) * 100) / 100,
        valuationCostWithDeductible:
          Math.ceil((Number(shipmentValue) / 100) * Number(valuationRateWithDeductible) * 100) / 100,
      },
    });
  }, [shipmentValue, valuationRate, valuationRateWithDeductible, dispatch]);

  /*########## SHIPMENT VALUE ##########*/
  useEffect(() => {
    // if (shipmentValue < estimatedWeight * 5) {
    dispatch({
      field: "shipmentValue",
      value: Number(estimatedWeight) * 5,
    });
    // }
  }, [estimatedWeight, dispatch]);

  /*########## TOTAL MATERIALS ##########*/
  useEffect(() => {
    // let value = 0;
    // if (!!jobType && jobType === "flatRate" && !!flatIsMaterialsIncluded && flatIsMaterialsIncluded === true) {
    //   value = 0
    // }
    // if (!!materials) {
    // dispatch({
    //   field: "totalMaterials",
    //   value:
    //     jobType === "flatRate" && flatIsMaterialsIncluded === true
    //       ? "0"
    //       : materials.reduce((sum, { units = 0, rate = 0 }) => sum + Number(units) * Number(rate), 0),
    // });
    // }
  }, [materials, jobType, flatIsMaterialsIncluded, dispatch]);

  /*########## TOTAL MISC FEES ##########*/
  useEffect(() => {
    // dispatch({
    //   field: "totalMiscFees",
    //   value: miscFees.reduce((sum, { value = 0, selected = false }) => sum + (selected ? Number(value) : 0), 0),
    // });
  }, [miscFees, flatIsMaterialsIncluded, dispatch]);

  /*########## TOTAL HOURS ##########*/
  useEffect(() => {
    const begin = timeToDecimal(isTravelFeeFixed ? arriveTime : startTime);
    let finish = timeToDecimal(isTravelFeeFixed ? departTime : endTime);
    //TODO add break to total time calculation
    // const breaks = timeToDecimal(breakTime);

    if (begin > finish) finish += 12;
    const th = finish - begin; //- breaks;

    dispatch({
      field: "totalHours",
      value: convertToHHMM(th >= 0 ? th : 0),
    });
  }, [totalHours, startTime, endTime, arriveTime, departTime, breakTime, isTravelFeeFixed, dispatch]);

  /*########## TRAVEL FEE ##########*/
  useEffect(() => {
    let value = "0";
    const field = "travelfee";

    if (!!hourlyRate && !!travelTime) value = (Number(hourlyRate) * Number(travelTime)).toString();

    dispatch({ field, value });
  }, [travelTime, hourlyRate, dispatch]);
  useEffect(() => {
    let value = 0;
    const field = "netWeight";

    if (!!weightType && !!cubicWeight && weightType === "cubicWeight") {
      value = cubicWeight;
    }

    if (!!weightType && weightType === "weightTicket") {
      const diff = Number(!!grossWeight ? grossWeight : 0) - Number(!!tareWeight ? tareWeight : 0);
      value = diff > 0 ? diff : 0;
    }
    dispatch({ field, value });
  }, [weightType, cubicWeight, netWeight, grossWeight, tareWeight, dispatch]);

  /*########## TOTAL TRANSPORTATION ##########*/
  useEffect(() => {
    let value = 0;
    const field = "totalTransportation";

    if (jobType === "flatRate" && !!flatAmount) value = Number(flatAmount);
    if (jobType === "local" && !!hourlyRate && !!totalHours) {
      console.log({ hourlyRate, totalHours, isTravelFeeFixed, travelFee });
      value = Number(timeToDecimal(totalHours)) * Number(hourlyRate);
      if (!!isTravelFeeFixed && !!travelFee) value += Number(travelFee);
    }
    if (jobType === "longDistance" && !!netWeight && !!mileageRate) value = Number(netWeight) * Number(mileageRate);
    value.toString();

    dispatch({ field, value });
  }, [jobType, flatAmount, totalHours, hourlyRate, netWeight, mileageRate, travelFee, isTravelFeeFixed, dispatch]);

  /*########## SUBTOTAL ##########*/
  useEffect(() => {
    dispatch({
      field: "subtotal",
      value: sum([totalTransportation, totalMiscFees, totalMaterials, totalValuation]).toString(),
    });
  }, [
    totalTransportation,
    totalMiscFees,
    totalMaterials,
    totalValuation,
    // adjustment,
    // totalMovingCharges,
    // totalAmountPaid,
    // remainingBalance,
  ]);

  // //TODO totalMiscFees

  /*########## ADJUSTMENT & TOTAL MOVINGCHARGES ##########*/
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
      type: "fieldsUpdate",
      payload: {
        adjustment: money_round(adjustmentNumber).toString(),
        totalMovingCharges: money_round(totalMovingChargesNumber).toString(),
      },
    });

    return () => {};
  }, [paymentOption, subtotal]);

  /*########## REMAINING BALANCE ##########*/
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

function sum(arr) {
  if (!!arr) return 0;
  const reducer = (accumulator, currentValue) => (!!currentValue ? accumulator + Number(currentValue) : accumulator);
  const sumIs = arr.reduce(reducer);
  console.log({ sumIs });
  return sumIs;
}
