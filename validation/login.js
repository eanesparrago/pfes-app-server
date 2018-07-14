const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.userName)) {
    errors.userName = "Incorrect login information";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Incorrect login information";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
