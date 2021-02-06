import React, { useContext, useReducer, createContext } from "react";

const initialState = {
  fullName: "Arnas Jelizarovas",
  phoneNumber: 8605150847,
  email: "",
  originAddress: "",
  destinationAddress: "",

  date: getFormattedDate(new Date()),
  hourlyRate: "",
  travelTime: "",
  travelFee: "",

  startTime: "",
  endTime: "",
  breaks: "",
  totalHours: "",
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
    throw new Error(
      "useClientDispatch must be used within a ClientDispatchProvider"
    );
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

  return (
    <ClientContext.Provider value={state}>
      <ClientDispatchContext.Provider value={dispatch}>
        {children}
      </ClientDispatchContext.Provider>
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
