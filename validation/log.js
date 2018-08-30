const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLogInput(data) {
  let errors = {};

  // Contact
  if (!Validator.isLength(data.contactName, { max: 100 })) {
    errors.contactName = "Contact name must not exceed 100 characters";
  }
  if (Validator.isEmpty(data.contactName)) {
    errors.contactName = "Contact name is required";
  }

  if (Validator.isEmpty(data.contactNumber)) {
    errors.contactNumber = "Contact number is required";
  }

  if (Validator.isEmpty(data.contactEmail)) {
    errors.contactEmail = "Contact email is required";
  }

  if (!Validator.isEmpty(data.contactEmail)) {
    if (!Validator.isEmail(data.contactEmail)) {
      errors.contactEmail = "Email is invalid";
    }
  }

  // Shipper
  if (!Validator.isLength(data.shipperConsignee, { max: 100 })) {
    errors.shipperConsignee =
      "Shipper/Consignee must not exceed 100 characters";
  }
  if (Validator.isEmpty(data.shipperConsignee)) {
    errors.shipperConsignee = "Shipper/Consignee is required";
  }

  // Commodity
  if (data.modeOfTransport !== "Air") {
    if (Validator.isEmpty(data.commodityType)) {
      errors.commodityType = "Commodity type is required";
    }
  }

  if (!Validator.isLength(data.commodityDescription, { max: 100 })) {
    errors.commodityDescription =
      "Commodity description must not exceed 100 characters";
  }
  if (Validator.isEmpty(data.commodityDescription)) {
    errors.commodityDescription = "Commodity description is required";
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

    if (!Validator.isLength(data.originLocation, { max: 100 })) {
      errors.originLocation = "Origin address must not exceed 100 characters";
    }
    if (Validator.isEmpty(data.originLocation)) {
      errors.originLocation = "Origin address is required";
    }

    if (Validator.isEmpty(data.destinationProvinceKey)) {
      errors.destinationProvinceKey = "Destination province is required";
    }

    if (Validator.isEmpty(data.destinationCity)) {
      errors.destinationCity = "Destination city/municipality is required";
    }

    if (!Validator.isLength(data.destinationLocation, { max: 100 })) {
      errors.destinationLocation =
        "Destination address must not exceed 100 characters";
    }
    if (Validator.isEmpty(data.destinationLocation)) {
      errors.destinationLocation = "Destination address is required";
    }
  } else if (data.type === "International") {
    if (Validator.isEmpty(data.originCountry)) {
      errors.originCountry = "Origin country is required";
    }

    if (!Validator.isLength(data.originLocation, { max: 100 })) {
      errors.originLocation = "Origin address must not exceed 100 characters";
    }
    if (Validator.isEmpty(data.originLocation)) {
      errors.originLocation = "Origin address is required";
    }

    if (Validator.isEmpty(data.destinationCountry)) {
      errors.destinationCountry = "Destination country is required";
    }

    if (!Validator.isLength(data.destinationLocation, { max: 100 })) {
      errors.destinationLocation =
        "Destination address must not exceed 100 characters";
    }
    if (Validator.isEmpty(data.destinationLocation)) {
      errors.destinationLocation = "Destination address is required";
    }
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
