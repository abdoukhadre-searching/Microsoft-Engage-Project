import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

// combiner le  authReducer et l'errorReducer
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});