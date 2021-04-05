import React from "react";
import ReactDOM from "react-dom";

import { firebaseConfig } from "./firebase/firebaseConfig";

// import "./assets/main.css";
import { Provider } from "react-redux";
// import store from "./redux/store";
import "./index.css";

import App from "./App";

import * as serviceWorker from "./serviceWorker";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
import "firebase/functions"; // <- needed if using httpsCallable
import { createStore, combineReducers } from "redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore"; // <- needed if using firestore

import { composeWithDevTools } from "redux-devtools-extension";

import visibilityFilter from "./redux/reducers/visibilityFilter";
import wares from "./redux/reducers/wares";
import move from "./redux/reducers/move";

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore
firebase.functions(); // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
  // firebase: firebaseReducer,
  visibilityFilter,
  wares,
  move,
  firestore: firestoreReducer, // <- needed if using firestore
});

// Create store with reducers and initial state
// const initialState = {};
const store = createStore(rootReducer, composeWithDevTools());

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
