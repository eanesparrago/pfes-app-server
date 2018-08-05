const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateStatusInput(data) {
  let errors = {};

  data.comment = !isEmpty(data.comment) ? data.comment : "";

  if (Validator.isEmpty(data.comment)) {
    errors.comment = "Status must not be empty";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
