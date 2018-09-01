const express = require("express");
const router = express.Router();
const passport = require("passport");

// Log model
const DomesticLog = require("../../models/DomesticLog");
const InternationalLog = require("../../models/InternationalLog");

const DomesticActivity = require("../../models/DomesticActivity");
const InternationalActivity = require("../../models/InternationalActivity");

// User model
const User = require("../../models/User");

// Log validation
const validateLogInput = require("../../validation/log");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// ////////////////////////////////////
// @route   GET api/logs/test
// @desc    Test logs route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Logs works" }));

// ////////////////////////////////////
// @route   GET api/logs/domestic
// @desc    Get domestic logs
// @access  Private
router.get(
  "/domestic",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    DomesticLog.find()
      .sort({ _id: -1 })
      .then(logs => {
        if (!logs) {
          errors.noLogs = "There are no job orders";
          return res.status(404).json(errors);
        }
        res.json(logs);
      })
      .catch(err =>
        res.status(404).json({ profile: "There are no job orders" })
      );
  }
);

// ////////////////////////////////////
// @route   GET api/logs/international
// @desc    Get international logs
// @access  Private
router.get(
  "/international",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    InternationalLog.find()
      .sort({ _id: -1 })
      .then(logs => {
        if (!logs) {
          errors.noLogs = "There are no job orders";
          return res.status(404).json(errors);
        }
        res.json(logs);
      })
      .catch(err =>
        res.status(404).json({ profile: "There are no job orders" })
      );
  }
);

// ////////////////////////////////////
// @route   POST api/logs/domestic
// @desc    Create domestic log
// @access  Private
router.post(
  "/domestic",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Only admin and sales can create logs
    if (req.user.userType !== "admin" && req.user.userType !== "sales") {
      return res.status(400).json({ unauthorized: "Unauthorized" });
    }

    const { errors, isValid } = validateLogInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // If the field was empty it will check so that it will default to n/a instead of an empty object
    const newLog = {};

    newLog.user = req.body.user;
    if (req.body.shipperConsignee)
      newLog.shipperConsignee = capitalizeFirstLetter(
        req.body.shipperConsignee.trim()
      );

    if (req.body.modeOfTransport)
      newLog.modeOfTransport = req.body.modeOfTransport;

    // Commodity type and description
    newLog.commodity = {};

    if (req.body.commodityType) {
      newLog.commodity.type = req.body.commodityType;
    } else {
      newLog.commodity.type = "";
    }
    newLog.commodity.description = capitalizeFirstLetter(
      req.body.commodityDescription.trim()
    );

    if (req.body.blAwb) {
      newLog.blAwb = req.body.blAwb.trim();
    } else {
      newLog.blAwb = "n/a";
    }

    newLog.origin = {};
    newLog.portOfDeparture = {};
    newLog.portOfArrival = {};
    newLog.destination = {};

    newLog.origin.provinceKey = req.body.originProvinceKey;
    newLog.origin.provinceName = req.body.originProvinceName;
    newLog.origin.city = req.body.originCity;
    newLog.origin.location = capitalizeFirstLetter(
      req.body.originLocation.trim()
    );

    newLog.portOfDeparture.provinceKey = req.body.portOfDepartureProvinceKey;
    newLog.portOfDeparture.provinceName = req.body.portOfDepartureProvinceName;
    newLog.portOfDeparture.city = req.body.portOfDepartureCity;
    newLog.portOfDeparture.location = capitalizeFirstLetter(
      req.body.portOfDepartureLocation.trim()
    );

    newLog.portOfArrival.provinceKey = req.body.portOfArrivalProvinceKey;
    newLog.portOfArrival.provinceName = req.body.portOfArrivalProvinceName;
    newLog.portOfArrival.city = req.body.portOfArrivalCity;
    newLog.portOfArrival.location = capitalizeFirstLetter(
      req.body.portOfArrivalLocation.trim()
    );

    newLog.destination.provinceKey = req.body.destinationProvinceKey;
    newLog.destination.provinceName = req.body.destinationProvinceName;
    newLog.destination.city = req.body.destinationCity;
    newLog.destination.location = capitalizeFirstLetter(
      req.body.destinationLocation.trim()
    );

    if (req.body.pickupDate) newLog.pickupDate = req.body.pickupDate;
    if (req.body.etd) newLog.etd = req.body.etd;
    if (req.body.eta) newLog.eta = req.body.eta;

    if (req.body.status) newLog.status = req.body.status;

    newLog.tags = {};

    if (req.body.tagUrgent) newLog.tags.urgent = req.body.tagUrgent;
    if (req.body.tagInsured) newLog.tags.insured = req.body.tagInsured;

    newLog.contact = {};

    if (req.body.contactName) {
      newLog.contact.name = capitalizeFirstLetter(req.body.contactName.trim());
    } else {
      newLog.contact.name = "";
    }

    if (req.body.contactNumber) {
      newLog.contact.number = req.body.contactNumber.trim();
    } else {
      newLog.contact.number = "";
    }

    if (req.body.contactEmail) {
      newLog.contact.email = req.body.contactEmail.trim();
    } else {
      newLog.contact.email = "";
    }

    if (req.body.additional) {
      newLog.additional = req.body.additional.trim();
    } else {
      newLog.additional = "n/a";
    }

    newLog.associate = `${req.user.firstName} ${req.user.lastName}`;

    newLog.user = req.user.id;

    const newDomesticLog = new DomesticLog(newLog);

    newDomesticLog.save().then(log => {
      res.json(log);

      // Activity
      const newActivity = new DomesticActivity({
        userID: req.user.id,
        userName: req.user.userName,
        userFullName: `${req.user.firstName} ${req.user.lastName}`,
        userType: req.user.userType,
        logID: log._id,
        logNumber: log.domJo,
        logShipper: log.shipperConsignee,
        actionType: "Create Job Order",
        actionSummary: `${req.user.firstName} ${req.user.lastName} (${
          req.user.userName
        }) created ${log.type} Job Order #${log.domJo} (${
          log.shipperConsignee
        }).`
      });

      newActivity.save();
    });
  }
);

// ////////////////////////////////////
// @route   POST api/logs/international
// @desc    Create international log
// @access  Private
router.post(
  "/international",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Only admin and sales can create logs
    if (req.user.userType !== "admin" && req.user.userType !== "sales") {
      return res.json({ unauthorized: "Unauthorized" });
    }

    const { errors, isValid } = validateLogInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // If the field was empty it will check so that it will default to n/a instead of an empty object
    const newLog = {};

    newLog.user = req.body.user;
    if (req.body.shipperConsignee)
      newLog.shipperConsignee = capitalizeFirstLetter(
        req.body.shipperConsignee.trim()
      );
    if (req.body.modeOfTransport)
      newLog.modeOfTransport = req.body.modeOfTransport;

    // Commodity type and description
    newLog.commodity = {};

    if (req.body.commodityType) {
      newLog.commodity.type = req.body.commodityType;
    } else {
      newLog.commodity.type = "";
    }
    newLog.commodity.description = capitalizeFirstLetter(
      req.body.commodityDescription.trim()
    );

    if (req.body.blAwb) {
      newLog.blAwb = req.body.blAwb.trim();
    } else {
      newLog.blAwb = "n/a";
    }

    newLog.origin = {};
    newLog.portOfDeparture = {};
    newLog.portOfArrival = {};
    newLog.destination = {};

    newLog.origin.country = req.body.originCountry;
    newLog.origin.location = capitalizeFirstLetter(
      req.body.originLocation.trim()
    );

    newLog.portOfDeparture.country = req.body.portOfDepartureCountry;
    newLog.portOfDeparture.location = capitalizeFirstLetter(
      req.body.portOfDepartureLocation.trim()
    );

    newLog.portOfArrival.country = req.body.portOfArrivalCountry;
    newLog.portOfArrival.location = capitalizeFirstLetter(
      req.body.portOfArrivalLocation.trim()
    );

    newLog.destination.country = req.body.destinationCountry;
    newLog.destination.location = capitalizeFirstLetter(
      req.body.destinationLocation.trim()
    );

    if (req.body.pickupDate) newLog.pickupDate = req.body.pickupDate;
    if (req.body.etd) newLog.etd = req.body.etd;
    if (req.body.eta) newLog.eta = req.body.eta;

    if (req.body.status) newLog.status = req.body.status;

    newLog.tags = {};

    if (req.body.tagUrgent) newLog.tags.urgent = req.body.tagUrgent;
    if (req.body.tagInsured) newLog.tags.insured = req.body.tagInsured;

    newLog.contact = {};

    if (req.body.contactName) {
      newLog.contact.name = capitalizeFirstLetter(req.body.contactName.trim());
    } else {
      newLog.contact.name = "";
    }

    if (req.body.contactNumber) {
      newLog.contact.number = req.body.contactNumber.trim();
    } else {
      newLog.contact.number = "";
    }

    if (req.body.contactEmail) {
      newLog.contact.email = req.body.contactEmail.trim();
    } else {
      newLog.contact.email = "";
    }

    if (req.body.additional) {
      newLog.additional = req.body.additional.trim();
    } else {
      newLog.additional = "n/a";
    }

    newLog.associate = `${req.user.firstName} ${req.user.lastName}`;

    newLog.user = req.user.id;

    const newInternationalLog = new InternationalLog(newLog);

    InternationalLog.findOne({ domJo: req.body.domJo }).then(log => {
      if (log) {
        errors.domJo = "That DOM/JO# already exists";
        return res.status(400).json(errors);
      }

      newInternationalLog.save().then(log => {
        res.json(log);

        // Activity
        const newActivity = new InternationalActivity({
          userID: req.user.id,
          userName: req.user.userName,
          userFullName: `${req.user.firstName} ${req.user.lastName}`,
          userType: req.user.userType,
          logID: log._id,
          logNumber: log.domJo,
          logShipper: log.shipperConsignee,
          actionType: "Create Job Order",
          actionSummary: `${req.user.firstName} ${req.user.lastName} (${
            req.user.userName
          }) created ${log.type} Job Order #${log.domJo} (${
            log.shipperConsignee
          }).`
        });

        newActivity.save();
      });
    });
  }
);

// ////////////////////////////////////
// @route   POST api/logs/domestic/edit
// @desc    Edit domestic log
// @access  Private
router.post(
  "/domestic/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Only admin and sales can edit logs
    if (req.user.userType !== "admin" && req.user.userType !== "sales") {
      return res.status(401).json({ unauthorized: "Unauthorized" });
    }

    const { errors, isValid } = validateLogInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newLog = {};

    if (req.body.shipperConsignee) {
      newLog.shipperConsignee = capitalizeFirstLetter(
        req.body.shipperConsignee.trim()
      );
    }

    newLog.commodity = {};

    if (req.body.commodityType) {
      newLog.commodity.type = req.body.commodityType;
    } else {
      newLog.commodity.type = "";
    }
    newLog.commodity.description = capitalizeFirstLetter(
      req.body.commodityDescription.trim()
    );

    if (req.body.modeOfTransport) {
      newLog.modeOfTransport = req.body.modeOfTransport;
    }

    if (req.body.blAwb) {
      newLog.blAwb = req.body.blAwb.trim();
    } else {
      newLog.blAwb = "n/a";
    }

    newLog.origin = {};
    newLog.destination = {};

    newLog.origin.provinceKey = req.body.originProvinceKey;
    newLog.origin.provinceName = req.body.originProvinceName;
    newLog.origin.city = req.body.originCity;
    newLog.origin.location = capitalizeFirstLetter(
      req.body.originLocation.trim()
    );

    if (
      req.body.modeOfTransport === "Sea" ||
      req.body.modeOfTransport === "Air"
    ) {
      newLog.portOfDeparture = {};
      newLog.portOfArrival = {};

      newLog.portOfDeparture.provinceKey = req.body.portOfDepartureProvinceKey;
      newLog.portOfDeparture.provinceName =
        req.body.portOfDepartureProvinceName;
      newLog.portOfDeparture.city = req.body.portOfDepartureCity;
      newLog.portOfDeparture.location = capitalizeFirstLetter(
        req.body.portOfDepartureLocation.trim()
      );

      newLog.portOfArrival.provinceKey = req.body.portOfArrivalProvinceKey;
      newLog.portOfArrival.provinceName = req.body.portOfArrivalProvinceName;
      newLog.portOfArrival.city = req.body.portOfArrivalCity;
      newLog.portOfArrival.location = capitalizeFirstLetter(
        req.body.portOfArrivalLocation.trim()
      );
    }

    newLog.destination.provinceKey = req.body.destinationProvinceKey;
    newLog.destination.provinceName = req.body.destinationProvinceName;
    newLog.destination.city = req.body.destinationCity;
    newLog.destination.location = capitalizeFirstLetter(
      req.body.destinationLocation.trim()
    );

    if (req.body.pickupDate) newLog.pickupDate = req.body.pickupDate;
    if (req.body.etd) newLog.etd = req.body.etd;
    if (req.body.eta) newLog.eta = req.body.eta;

    newLog.status = req.body.status;

    newLog.tags = {};

    if (req.body.tagUrgent) newLog.tags.urgent = req.body.tagUrgent;
    if (req.body.tagInsured) newLog.tags.insured = req.body.tagInsured;

    newLog.contact = {};

    if (req.body.contactName) {
      newLog.contact.name = capitalizeFirstLetter(req.body.contactName.trim());
    } else {
      newLog.contact.name = "";
    }

    if (req.body.contactNumber) {
      newLog.contact.number = req.body.contactNumber.trim();
    } else {
      newLog.contact.number = "";
    }

    if (req.body.contactEmail) {
      newLog.contact.email = req.body.contactEmail.trim();
    } else {
      newLog.contact.email = "";
    }

    if (req.body.additional) {
      newLog.additional = req.body.additional.trim();
    } else {
      newLog.additional = "n/a";
    }

    newLog.dateModified = Date.now();

    const newDomesticLog = newLog;

    DomesticLog.findOne({ domJo: req.body.domJo }).then(log => {
      if (log) {
        // Check to see if the sales account does not match the user ID
        if (req.user.userType === "sales") {
          if (req.user.id !== String(log.user)) {
            return res.status(401).json({ unauthorized: "Unauthorized" });
          }
        }

        // Update
        DomesticLog.findOneAndUpdate(
          { domJo: req.body.domJo },
          { $set: newDomesticLog },
          { new: true }
        ).then(log => {
          res.json(log);

          // Activity
          const newActivity = new DomesticActivity({
            userID: req.user.id,
            userName: req.user.userName,
            userFullName: `${req.user.firstName} ${req.user.lastName}`,
            userType: req.user.userType,
            logID: log._id,
            logNumber: log.domJo,
            logShipper: log.shipperConsignee,
            actionType: "Edit Job Order",
            actionSummary: `${req.user.firstName} ${req.user.lastName} (${
              req.user.userName
            }) edited ${log.type} Job Order #${log.domJo} (${
              log.shipperConsignee
            }).`
          });

          newActivity.save();
        });
      }
    });
  }
);

// ////////////////////////////////////
// @route   POST api/logs/international/edit
// @desc    Edit international log
// @access  Private
router.post(
  "/international/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Only admin and sales can edit logs
    if (req.user.userType !== "admin" && req.user.userType !== "sales") {
      return res.json({ unauthorized: "Unauthorized" });
    }

    const { errors, isValid } = validateLogInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newLog = {};

    if (req.body.shipperConsignee) {
      newLog.shipperConsignee = capitalizeFirstLetter(
        req.body.shipperConsignee.trim()
      );
    } else {
      newLog.shipperConsignee = "";
    }

    newLog.commodity = {};

    if (req.body.commodityType) {
      newLog.commodity.type = req.body.commodityType;
    } else {
      newLog.commodity.type = "";
    }
    newLog.commodity.description = capitalizeFirstLetter(
      req.body.commodityDescription.trim()
    );

    if (req.body.modeOfTransport) {
      newLog.modeOfTransport = req.body.modeOfTransport;
    } else {
      newLog.modeOfTransport = "";
    }

    if (req.body.blAwb) {
      newLog.blAwb = req.body.blAwb.trim();
    } else {
      newLog.blAwb = "n/a";
    }

    newLog.origin = {};
    newLog.destination = {};
    newLog.portOfDeparture = {};
    newLog.portOfArrival = {};

    newLog.origin.country = req.body.originCountry;
    newLog.origin.location = capitalizeFirstLetter(
      req.body.originLocation.trim()
    );

    newLog.portOfDeparture.country = req.body.portOfDepartureCountry;
    newLog.portOfDeparture.location = capitalizeFirstLetter(
      req.body.portOfDepartureLocation.trim()
    );

    newLog.portOfArrival.country = req.body.portOfArrivalCountry;
    newLog.portOfArrival.location = capitalizeFirstLetter(
      req.body.portOfArrivalLocation.trim()
    );

    newLog.destination.country = req.body.destinationCountry;
    newLog.destination.location = capitalizeFirstLetter(
      req.body.destinationLocation.trim()
    );

    if (req.body.pickupDate) newLog.pickupDate = req.body.pickupDate;
    if (req.body.etd) newLog.etd = req.body.etd;
    if (req.body.eta) newLog.eta = req.body.eta;

    newLog.status = req.body.status;

    newLog.tags = {};

    if (req.body.tagUrgent) newLog.tags.urgent = req.body.tagUrgent;
    if (req.body.tagInsured) newLog.tags.insured = req.body.tagInsured;

    newLog.contact = {};

    if (req.body.contactName) {
      newLog.contact.name = capitalizeFirstLetter(req.body.contactName.trim());
    } else {
      newLog.contact.name = "";
    }

    if (req.body.contactNumber) {
      newLog.contact.number = req.body.contactNumber.trim();
    } else {
      newLog.contact.number = "";
    }

    if (req.body.contactEmail) {
      newLog.contact.email = req.body.contactEmail.trim();
    } else {
      newLog.contact.email = "";
    }

    if (req.body.additional) {
      newLog.additional = req.body.additional.trim();
    } else {
      newLog.additional = "n/a";
    }

    newLog.dateModified = Date.now();

    const newInternationalLog = newLog;

    InternationalLog.findOne({ domJo: req.body.domJo }).then(log => {
      if (log) {
        // Check to see if the sales account does not match the user ID
        if (req.user.userType === "sales") {
          if (req.user.id !== String(log.user)) {
            return res.status(401).json({ unauthorized: "Unauthorized" });
          }
        }

        // Update
        InternationalLog.findOneAndUpdate(
          { domJo: req.body.domJo },
          { $set: newInternationalLog },
          { new: true }
        ).then(log => {
          res.json(log);

          // Activity
          const newActivity = new InternationalActivity({
            userID: req.user.id,
            userName: req.user.userName,
            userFullName: `${req.user.firstName} ${req.user.lastName}`,
            userType: req.user.userType,
            logID: log._id,
            logNumber: log.domJo,
            logShipper: log.shipperConsignee,
            actionType: "Edit Job Order",
            actionSummary: `${req.user.firstName} ${req.user.lastName} (${
              req.user.userName
            }) edited ${log.type} Job Order #${log.domJo} (${
              log.shipperConsignee
            }).`
          });

          newActivity.save();
        });
      }
    });
  }
);

// ////////////////////////////////////
// @route   POST api/logs/complete/
// @desc    Submit complete log
// @access  Private
router.post(
  "/complete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.userType !== "admin" && req.user.userType !== "sales") {
      return res.json({ unauthorized: "Unauthorized" });
    }

    if (req.user.userType === "sales") {
      if (req.user.id !== String(req.body.user)) {
        return res.status(401).json({ unauthorized: "Unauthorized" });
      }
    }

    const update = {};

    update.isCompleted = true;
    update.dateCompleted = Date.now();
    update.dateModified = Date.now();
    update.remarks
      ? (update.remarks = capitalizeFirstLetter(req.body.remarks))
      : (update.remarks = "n/a");

    update.status = "Complete";

    if (req.body.type === "Domestic") {
      DomesticLog.findOne({ domJo: req.body.domJo }).then(log => {
        if (log) {
          // Update
          DomesticLog.findOneAndUpdate(
            { domJo: req.body.domJo },
            { $set: update },
            { new: true }
          ).then(log => {
            res.json(log);

            // Activity
            const newActivity = new DomesticActivity({
              userID: req.user.id,
              userName: req.user.userName,
              userFullName: `${req.user.firstName} ${req.user.lastName}`,
              userType: req.user.userType,
              logID: log._id,
              logNumber: log.domJo,
              logShipper: log.shipperConsignee,
              actionType: "Complete Job Order",
              actionSummary: `${req.user.firstName} ${req.user.lastName} (${
                req.user.userName
              }) marked ${log.type} Job Order #${log.domJo} (${
                log.shipperConsignee
              }) as complete.`
            });

            newActivity.save();
          });
        }
      });
    } else if (req.body.type === "International") {
      InternationalLog.findOne({ domJo: req.body.domJo }).then(log => {
        if (log) {
          // Update
          InternationalLog.findOneAndUpdate(
            { domJo: req.body.domJo },
            { $set: update },
            { new: true }
          ).then(log => {
            res.json(log);

            // Activity
            const newActivity = new InternationalActivity({
              userID: req.user.id,
              userName: req.user.userName,
              userFullName: `${req.user.firstName} ${req.user.lastName}`,
              userType: req.user.userType,
              logID: log._id,
              logNumber: log.domJo,
              logShipper: log.shipperConsignee,
              actionType: "Complete Job Order",
              actionSummary: `${req.user.firstName} ${req.user.lastName} (${
                req.user.userName
              }) marked ${log.type} Job Order #${log.domJo} (${
                log.shipperConsignee
              }) as complete.`
            });

            newActivity.save();
          });
        }
      });
    }
  }
);

// ////////////////////////////////////
// @route   POST api/logs/domestic/operations/
// @desc    Edit domestic operations log
// @access  Private
/*router.post(
  "/domestic/operations",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Only admin and operations can edit operations status
    if (req.user.userType !== "admin" && req.user.userType !== "operations") {
      return res.json({ unauthorized: "Unauthorized" });
    }

    const update = {};

    update.operations = {};
    update.operations.preloading = {};
    update.operations.loading = {};
    update.operations.unloading = {};

    if (req.body.preloadingStatus)
      update.operations.preloading.status = req.body.preloadingStatus;
    if (req.body.preloadingRemarks)
      update.operations.preloading.remarks = req.body.preloadingRemarks;

    if (req.body.loadingStatus)
      update.operations.loading.status = req.body.loadingStatus;
    if (req.body.loadingRemarks)
      update.operations.loading.remarks = req.body.loadingRemarks;

    if (req.body.unloadingStatus)
      update.operations.unloading.status = req.body.unloadingStatus;
    if (req.body.unloadingRemarks)
      update.operations.unloading.remarks = req.body.unloadingRemarks;

    DomesticLog.findOne({ domJo: req.body.domJo }).then(log => {
      if (log) {
        // Update
        DomesticLog.findOneAndUpdate(
          { domJo: req.body.domJo },
          { $set: update },
          { new: true }
        ).then(log => {
          res.json(log);

          // Activity
          const newActivity = new DomesticActivity({
            userID: req.user.id,
            userName: req.user.userName,
            userFullName: `${req.user.firstName} ${req.user.lastName}`,
            userType: req.user.userType,
            logID: log._id,
            logNumber: log.domJo,
            logShipper: log.shipperConsignee,
            actionType: "Update Job Order Operations Status",
            actionSummary: `${req.user.firstName} ${req.user.lastName} (${
              req.user.userName
            }) updated ${log.type} Job Order #${log.domJo} (${
              log.shipperConsignee
            }) operations status.`
          });

          newActivity.save();
        });
      }
    });
  }
);*/

// ////////////////////////////////////
// @route   POST api/logs/international/operations/
// @desc    Edit international operations log
// @access  Private
/*router.post(
  "/international/operations/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Only admin and operations can edit operations status
    if (req.user.userType !== "admin" && req.user.userType !== "operations") {
      return res.json({ unauthorized: "Unauthorized" });
    }

    const update = {};

    update.operations = {};
    update.operations.preloading = {};
    update.operations.loading = {};
    update.operations.unloading = {};

    if (req.body.preloadingStatus)
      update.operations.preloading.status = req.body.preloadingStatus;
    if (req.body.preloadingRemarks)
      update.operations.preloading.remarks = req.body.preloadingRemarks;

    if (req.body.loadingStatus)
      update.operations.loading.status = req.body.loadingStatus;
    if (req.body.loadingRemarks)
      update.operations.loading.remarks = req.body.loadingRemarks;

    if (req.body.unloadingStatus)
      update.operations.unloading.status = req.body.unloadingStatus;
    if (req.body.unloadingRemarks)
      update.operations.unloading.remarks = req.body.unloadingRemarks;

    InternationalLog.findOne({ domJo: req.body.domJo }).then(log => {
      if (log) {
        // Update
        InternationalLog.findOneAndUpdate(
          { domJo: req.body.domJo },
          { $set: update },
          { new: true }
        ).then(log => {
          res.json(log);

          // Activity
          const newActivity = new InternationalActivity({
            userID: req.user.id,
            userName: req.user.userName,
            userFullName: `${req.user.firstName} ${req.user.lastName}`,
            userType: req.user.userType,
            logID: log._id,
            logNumber: log.domJo,
            logShipper: log.shipperConsignee,
            actionType: "Update Job Order Operations Status",
            actionSummary: `${req.user.firstName} ${req.user.lastName} (${
              req.user.userName
            }) updated ${log.type} Job Order #${log.domJo} (${
              log.shipperConsignee
            }) operations status.`
          });

          newActivity.save();
        });
      }
    });
  }
); */

// ////////////////////////////////////
// @route   DELETE api/logs/domestic
// @desc    Delete domestic log
// @access  Private
router.delete(
  "/domestic/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Only admin can delete logs
    if (req.user.userType !== "admin") {
      return res.status(401).json({ unauthorized: "Unauthorized" });
    }

    DomesticLog.findByIdAndRemove(req.params.id).then(() => {
      res.json({ success: true });
    });
  }
);

// ////////////////////////////////////
// @route   DELETE api/logs/domestic
// @desc    Delete international log
// @access  Private
router.delete(
  "/international/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Only admin can delete logs
    if (req.user.userType !== "admin") {
      return res.status(401).json({ unauthorized: "Unauthorized" });
    }

    InternationalLog.findByIdAndRemove(req.params.id).then(() => {
      res.json({ success: true });
    });
  }
);

module.exports = router;
