const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEditUserInput(data) {
  let errors = {};

  data.userType = !isEmpty(data.userType) ? data.userType : "";
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.contact = !isEmpty(data.contact) ? data.contact : "";

  // userType validation
  if (Validator.isEmpty(data.userType)) {
    errors.userType = "User type is required";
  }

  // firstName validation
  if (!Validator.isLength(data.firstName, { min: 3, max: 30 })) {
    errors.firstName = "Firstname must be between 2 to 30 characters";
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "Firstname is required";
  }

  // lastName validation
  if (!Validator.isLength(data.lastName, { min: 3, max: 30 })) {
    errors.lastName = "Lastname must be between 2 to 30 characters";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Lastname is required";
  }

  // email validation
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  // contact validation
  if (Validator.isEmpty(data.contact)) {
    errors.contact = "Contact is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
