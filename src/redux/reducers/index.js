import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import wares from "./wares";
import move from "./move";

export default combineReducers({ visibilityFilter, wares, move });
