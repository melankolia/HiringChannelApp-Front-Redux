import { combineReducers } from "redux";
import user from "./user";
import company from "./company";

const reducers = combineReducers({
  user,
  company
});

export default reducers;
