import React, { useContext, useReducer, createContext, useEffect } from "react";

const initialState = {
  fullName: "",
  phoneNumber: "",
  email: "",
  originAddress: "",
  destinationAddress: "",
  additionalStops: "",
  notes: "",

  estimateIsBinding: false,
  valuation: "basic",

  valuationRate: 1.4,
  valuationCost: "",
  valuationRateWithDeductible: 1.15,
  valuationCostWithDeductible: "",
  shipmentValue: "",

  totalValuation: "",

  personnel: [],

  date: getFormattedDate(new Date()),
  hourlyRate: "",
  travelTime: "",
  travelFee: "",

  startTime: "",
  arriveTime: "",
  departTime: "",
  endTime: "",
  breakTime: "",
  totalHours: "",

  distance: "",
  grossWeight: "",
  tareWeight: "",
  netWeight: "",
  mileageRate: "",

  estimatedWeight: "",

  totalTransportation: "",

  materials: {},
  totalMaterials: "",
  otherFees: {},
  totalOtherFees: "",

  subtotal: "",
  adjustment: "",
  totalMovingCharges: "",
  totalAmountPaid: "",
  remainingBalance: "",

  signature: "",
  initials: "",
  crewSignature: "",

  agreedToEstimate: true,
  estimateAgreedDate: getFormattedDate(new Date()),
  crewLeadAssigned: true,
  jobComplete: true,
};

const ClientContext = createContext();
const ClientDispatchContext = createContext();

const useClient = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error("useClient must be used within a ClientProvider");
  }
  return context;
};
const useClientDispatch = () => {
  const context = useContext(ClientDispatchContext);
  if (context === undefined) {
    throw new Error("useClientDispatch must be used within a ClientDispatchProvider");
  }
  return context;
};

const clientReducer = (state, { field, value }) => {
  return {
    ...state,
    [field]: value,
  };
};

const ClientProvider = ({ children }) => {
  const [state, dispatch] = useReducer(clientReducer, initialState);

  const {
    valuation,
    valuationCost,
    valuationCostWithDeductible,
    shipmentValue,
    valuationRate,
    valuationRateWithDeductible,
    estimatedWeight,
  } = state;

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
    if (shipmentValue < estimatedWeight * 5) {
      dispatch({
        field: "shipmentValue",
        value: estimatedWeight * 5,
      });
    }
  }, [estimatedWeight, shipmentValue, dispatch]);

  return (
    <ClientContext.Provider value={state}>
      <ClientDispatchContext.Provider value={dispatch}>{children}</ClientDispatchContext.Provider>
    </ClientContext.Provider>
  );
};

export { ClientProvider, useClient, useClientDispatch };

function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return month + "/" + day + "/" + year;
}
