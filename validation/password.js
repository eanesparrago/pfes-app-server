const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePasswordInput(data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // password validation
  if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  // password2 validation
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords does not match";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
