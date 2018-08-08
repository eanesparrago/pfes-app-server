const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLogInput(data) {
  let errors = {};

  data.domJo = !isEmpty(data.domJo) ? data.domJo : "";

  if (Validator.isEmpty(data.domJo)) {
    errors.domJo = "DOM/JO# is required and must be unique";
  }

  if (!Validator.isLength(data.shipperConsignee, { max: 100 })) {
    errors.shipperConsignee =
      "Shipper/Consignee must not exceed 100 characters";
  }

  if (!Validator.isLength(data.commodity, { max: 100 })) {
    errors.commodity = "Commodity must not exceed 100 characters";
  }

  if (!Validator.isLength(data.blAwb, { max: 100 })) {
    errors.blAwb = "BL/AWB must not exceed 100 characters";
  }

  if (!Validator.isLength(data.origin, { max: 100 })) {
    errors.origin = "Origin must not exceed 100 characters";
  }

  if (!Validator.isLength(data.destination, { max: 100 })) {
    errors.destination = "Destination must not exceed 100 characters";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
