const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLogInput(data) {
  let errors = {};

  data.domJo = !isEmpty(data.domJo) ? data.domJo : "";

  if (Validator.isEmpty(data.domJo)) {
    errors.domJo = "DOM/JO# is required and must be unique";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
