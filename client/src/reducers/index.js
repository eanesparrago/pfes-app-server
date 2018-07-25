import { combineReducers } from "redux";

import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";
import registerReducer from "./registerReducer";
import domesticReducer from "./domesticReducer";
import successReducer from "./successReducer";
import internationalReducer from "./internationalReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  users: usersReducer,
  register: registerReducer,
  domesticLogs: domesticReducer,
  internationalLogs: internationalReducer,
  success: successReducer
});
