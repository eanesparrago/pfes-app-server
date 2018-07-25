const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Log model
const DomesticLog = require("../../models/DomesticLog");
const InternationalLog = require("../../models/InternationalLog");

// User model
const User = require("../../models/User");

// Log validation
const validateLogInput = require("../../validation/log");

// ////////////////////////////////////
// @route   GET api/logs/test
// @desc    Test logs route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Logs works" }));

// ////////////////////////////////////
// @route   GET api/logs/domestic
// @desc    Get domestic logs
// @access  Private
// router.get("/domestic")
router.get(
  "/domestic",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    DomesticLog.find()
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
    console.log(req.user);
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

    newLog.domJo = req.body.domJo;
    newLog.user = req.body.user;
    if (req.body.shipperConsignee)
      newLog.shipperConsignee = req.body.shipperConsignee;
    if (req.body.associate) newLog.associate = req.body.associate;
    if (req.body.modeOfTransport)
      newLog.modeOfTransport = req.body.modeOfTransport;
    if (req.body.commodity) newLog.commodity = req.body.commodity;
    if (req.body.blAwb) newLog.blAwb = req.body.blAwb;
    if (req.body.origin) newLog.origin = req.body.origin;
    if (req.body.destination) newLog.destination = req.body.destination;
    if (req.body.etd) newLog.etd = req.body.etd;
    if (req.body.eta) newLog.eta = req.body.eta;
    if (req.body.status) newLog.status = req.body.status;

    const newDomesticLog = new DomesticLog(
      newLog
      // domJo: req.body.domJo,
      // status: req.body.status,
      // user: req.user.id,
      // shipperConsignee: req.body.shipperConsignee,
      // associate: req.body.associate,
      // modeOfTransport: req.body.modeOfTransport,
      // commodity: req.body.commodity,
      // blAwb: req.body.associate,
      // origin: req.body.origin,
      // destination: req.body.destination,
      // etd: req.body.etd,
      // eta: req.body.eta,
      // status: req.body.status,
      // operations: {},
      // rating: req.body.rating,
    );

    DomesticLog.findOne({ domJo: req.body.domJo }).then(log => {
      if (log) {
        errors.domJo = "That DOM/JO# already exists";
        return res.status(400).json(errors);
      }

      newDomesticLog.save().then(log => res.json(log));
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
    console.log(req.user);
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

    newLog.domJo = req.body.domJo;
    newLog.user = req.body.user;
    if (req.body.shipperConsignee)
      newLog.shipperConsignee = req.body.shipperConsignee;
    if (req.body.associate) newLog.associate = req.body.associate;
    if (req.body.modeOfTransport)
      newLog.modeOfTransport = req.body.modeOfTransport;
    if (req.body.commodity) newLog.commodity = req.body.commodity;
    if (req.body.blAwb) newLog.blAwb = req.body.blAwb;
    if (req.body.origin) newLog.origin = req.body.origin;
    if (req.body.destination) newLog.destination = req.body.destination;
    if (req.body.etd) newLog.etd = req.body.etd;
    if (req.body.eta) newLog.eta = req.body.eta;
    // if (req.body.status) newLog.status = req.body.status;
    newLog.status = req.body.status;

    const newInternationalLog = new InternationalLog(
      newLog
      // domJo: req.body.domJo,
      // status: req.body.status,
      // user: req.user.id,
      // shipperConsignee: req.body.shipperConsignee,
      // associate: req.body.associate,
      // modeOfTransport: req.body.modeOfTransport,
      // commodity: req.body.commodity,
      // blAwb: req.body.associate,
      // origin: req.body.origin,
      // destination: req.body.destination,
      // etd: req.body.etd,
      // eta: req.body.eta,
      // status: req.body.status,
      // operations: {},
      // rating: req.body.rating,
    );

    InternationalLog.findOne({ domJo: req.body.domJo }).then(log => {
      if (log) {
        errors.domJo = "That DOM/JO# already exists";
        return res.status(400).json(errors);
      }

      newInternationalLog.save().then(log => res.json(log));
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
    console.log(req.user);
    // Only admin and sales can edit logs
    if (req.user.userType !== "admin" && req.user.userType !== "sales") {
      return res.json({ unauthorized: "Unauthorized" });
    }

    const { errors, isValid } = validateLogInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newDomesticLog = {
      domJo: req.body.domJo,
      shipperConsignee: req.body.shipperConsignee,
      associate: req.body.associate,
      modeOfTransport: req.body.modeOfTransport,
      commodity: req.body.commodity,
      blAwb: req.body.associate,
      origin: req.body.origin,
      destination: req.body.destination,
      etd: new Date(Date.now()).toISOString(),
      eta: new Date(Date.now()).toISOString(),
      status: req.body.status,
      operations: {},
      rating: req.body.rating,
      user: req.user.id
    };

    DomesticLog.findOne({ domJo: req.body.domJo }).then(log => {
      if (log) {
        // Update
        DomesticLog.findOneAndUpdate(
          { domJo: req.body.domJo },
          { $set: newDomesticLog },
          { new: true }
        ).then(log => res.json(log));
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
    console.log(req.user);
    // Only admin and sales can edit logs
    if (req.user.userType !== "admin" && req.user.userType !== "sales") {
      return res.json({ unauthorized: "Unauthorized" });
    }

    const { errors, isValid } = validateLogInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newInternationalLog = {
      domJo: req.body.domJo,
      shipperConsignee: req.body.shipperConsignee,
      associate: req.body.associate,
      modeOfTransport: req.body.modeOfTransport,
      commodity: req.body.commodity,
      blAwb: req.body.associate,
      origin: req.body.origin,
      destination: req.body.destination,
      etd: new Date(Date.now()).toISOString(),
      eta: new Date(Date.now()).toISOString(),
      status: req.body.status,
      operations: {},
      rating: req.body.rating,
      user: req.user.id
    };

    InternationalLog.findOne({ domJo: req.body.domJo }).then(log => {
      if (log) {
        // Update
        InternationalLog.findOneAndUpdate(
          { domJo: req.body.domJo },
          { $set: newInternationalLog },
          { new: true }
        ).then(log => res.json(log));
      }
    });
  }
);

// ////////////////////////////////////
// @route   POST api/logs/domestic/operations/
// @desc    Edit domestic operations log
// @access  Private
router.post(
  "/domestic/operations/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req.user);
    // Only admin and operations can edit operations status
    // if (req.user.userType !== "admin" && req.user.userType !== "operations") {
    //   return res.json({ unauthorized: "Unauthorized" });
    // }

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
        ).then(log => res.json(log));
      }
    });
  }
);

// ////////////////////////////////////
// @route   POST api/logs/international/operations/
// @desc    Edit international operations log
// @access  Private
router.post(
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
        ).then(log => res.json(log));
      }
    });
  }
);

// ////////////////////////////////////
// @route   DELETE api/logs/domestic
// @desc    Delete domestic log
// @access  Private
router.delete(
  "/domestic",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Only admin can delete logs
    if (req.user.userType !== "admin") {
      return res.json({ unauthorized: "Unauthorized" });
    }

    DomesticLog.remove({ domJo: req.body.domJo }).then(() => {
      res.json({ success: true });
    });
  }
);

module.exports = router;
