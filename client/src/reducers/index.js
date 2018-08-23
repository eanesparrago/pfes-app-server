import { combineReducers } from "redux";

import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";
import registerReducer from "./registerReducer";
import successReducer from "./successReducer";
import logReducer from "./logReducer";
import alertReducer from "./alertReducer";
import weatherReducer from "./weatherReducer";
import activityReducer from "./activityReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  users: usersReducer,
  register: registerReducer,

  success: successReducer,
  log: logReducer,
  alert: alertReducer,

  weather: weatherReducer,

  activity: activityReducer
});
