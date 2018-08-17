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

  // Origin/Destination
  if (data.type === "Domestic") {
    if (Validator.isEmpty(data.originProvinceKey)) {
      errors.originProvinceKey = "Origin province is required";
    }

    if (Validator.isEmpty(data.originCity)) {
      errors.originCity = "Origin city/municipality is required";
    }

    if (Validator.isEmpty(data.originLocation)) {
      errors.originLocation = "Origin location is required";
    }

    if (!Validator.isLength(data.originLocation, { max: 100 })) {
      errors.originLocation = "Origin location must not exceed 100 characters";
    }

    if (Validator.isEmpty(data.destinationProvinceKey)) {
      errors.destinationProvinceKey = "Destination province is required";
    }

    if (Validator.isEmpty(data.destinationCity)) {
      errors.destinationCity = "Destination city/municipality is required";
    }

    if (Validator.isEmpty(data.destinationLocation)) {
      errors.destinationLocation = "Destination location is required";
    }

    if (!Validator.isLength(data.destinationLocation, { max: 100 })) {
      errors.destinationLocation =
        "Destination location must not exceed 100 characters";
    }
  } else if (data.type === "International") {
    if (Validator.isEmpty(data.originCountry)) {
      errors.originCountry = "Origin country is required";
    }

    if (Validator.isEmpty(data.originLocation)) {
      errors.originLocation = "Origin location is required";
    }

    if (!Validator.isLength(data.destinationLocation, { max: 100 })) {
      errors.destinationLocation =
        "Destination location must not exceed 100 characters";
    }

    if (Validator.isEmpty(data.destinationCountry)) {
      errors.destinationCountry = "Destination country is required";
    }

    if (Validator.isEmpty(data.destinationLocation)) {
      errors.destinationLocation = "Destination location is required";
    }

    if (!Validator.isLength(data.destinationLocation, { max: 100 })) {
      errors.destinationLocation =
        "Destination location must not exceed 100 characters";
    }
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
