import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import wares from "./wares";
import move from "./move";

import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  visibilityFilter,
  wares,
  move,
});

export default rootReducer;
