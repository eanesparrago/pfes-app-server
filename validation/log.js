const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLogInput(data) {
  let errors = {};

  // Shipper
  if (!Validator.isLength(data.shipperConsignee, { max: 100 })) {
    errors.shipperConsignee =
      "Shipper/Consignee must not exceed 100 characters";
  }
  if (Validator.isEmpty(data.shipperConsignee)) {
    errors.shipperConsignee = "Shipper/Consignee is required";
  }

  // Commodity
  if (!Validator.isLength(data.commodity, { max: 100 })) {
    errors.commodity = "Commodity must not exceed 100 characters";
  }
  if (Validator.isEmpty(data.commodity)) {
    errors.commodity = "Commodity is required";
  }

  // Mode of Transport
  if (Validator.isEmpty(data.modeOfTransport)) {
    errors.modeOfTransport = "Mode of Transport is required";
  }

  // BL/AWB
  if (!Validator.isLength(data.blAwb, { max: 100 })) {
    errors.blAwb = "BL/AWB must not exceed 100 characters";
  }

  // Origin
  if (!Validator.isLength(data.origin, { max: 100 })) {
    errors.origin = "Origin must not exceed 100 characters";
  }
  if (Validator.isEmpty(data.origin)) {
    errors.origin = "Origin is required";
  }

  // Destination
  if (!Validator.isLength(data.destination, { max: 100 })) {
    errors.destination = "Destination must not exceed 100 characters";
  }
  if (Validator.isEmpty(data.destination)) {
    errors.destination = "Destination is required";
  }

  // Contact Email
  if (!Validator.isEmpty(data.contactEmail)) {
    if (!Validator.isEmail(data.contactEmail)) {
      errors.contactEmail = "Email is invalid";
    }
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
