const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.userType = !isEmpty(data.userType) ? data.userType : "";
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.contact = !isEmpty(data.contact) ? data.contact : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // userName validation
  if (!Validator.isLength(data.userName, { min: 2, max: 30 })) {
    errors.userName = "Username must be between 2 to 30 characters";
  }
  if (Validator.isEmpty(data.userName)) {
    errors.userName = "Username is required";
  }

  // userType validation
  if (Validator.isEmpty(data.userType)) {
    errors.userType = "User type is required";
  }

  // firstName validation
  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = "Firstname must be between 2 to 30 characters";
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "Firstname is required";
  }

  // lastName validation
  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
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
  if (!Validator.isLength(data.contact, { min: 4, max: 15 })) {
    errors.contact = "Contact number must be between 4 to 15 characters";
  }

  if (Validator.isEmpty(data.contact)) {
    errors.contact = "Contact is required";
  }

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
