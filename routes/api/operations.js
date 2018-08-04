const express = require("express");
const router = express.Router();
const mongoose = require("mongoose").set("debug", true);
const passport = require("passport");

// Log model
const DomesticLog = require("../../models/DomesticLog");
const InternationalLog = require("../../models/InternationalLog");

// Validators
const validateStatusInput = require("../../validation/status");

// ////////////////////////////////////
// @route   POST api/operations/domestic/:id
// @desc    Edit domestic operations
// @access  Private

router.post(
  "/domestic/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    // Only admin and operations can access
    if (req.user.userType !== "admin" && req.user.userType !== "operations") {
      return res.status(400).json({ unauthorized: "Unauthorized" });
    }

    // const { errors, isValid } = validateLogInput(req.body);

    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    // If the field was empty it will check so that it will default to n/a instead of an empty object
    const operationsData = {};

    operationsData.operations = {};

    operationsData.operations.preloading = {};
    operationsData.operations.loading = {};
    operationsData.operations.unloading = {};
    req.body.preloadingIsFinished;
    // Preloading
    if (req.body.preloadingIsFinished)
      operationsData.operations.preloading.isFinished =
        req.body.preloadingIsFinished;

    if (req.body.preloadingIsFinished === true) {
      if (req.body.preloadingRemarks)
        operationsData.operations.preloading.remarks =
          req.body.preloadingRemarks;

      if (req.body.preloadingDateFinished)
        operationsData.operations.preloading.dateFinished =
          req.body.preloadingDateFinished;
    } else {
      operationsData.operations.preloading.remarks = "n/a";
    }

    // Loading
    if (req.body.loadingIsFinished)
      operationsData.operations.loading.isFinished = req.body.loadingIsFinished;

    if (req.body.loadingIsFinished === true) {
      if (req.body.loadingRemarks)
        operationsData.operations.loading.remarks = req.body.loadingRemarks;

      if (req.body.loadingDateFinished)
        operationsData.operations.loading.dateFinished =
          req.body.loadingDateFinished;
    } else {
      operationsData.operations.loading.remarks = "n/a";
    }

    // Unloading
    if (req.body.unloadingIsFinished)
      operationsData.operations.unloading.isFinished =
        req.body.unloadingIsFinished;

    if (req.body.unloadingIsFinished === true) {
      if (req.body.unloadingRemarks)
        operationsData.operations.unloading.remarks = req.body.unloadingRemarks;

      if (req.body.unloadingDateFinished)
        operationsData.operations.unloading.dateFinished =
          req.body.unloadingDateFinished;
    } else {
      operationsData.operations.unloading.remarks = "n/a";
    }

    operationsData.dateModified = Date.now();

    DomesticLog.findByIdAndUpdate(
      req.params.id,
      { $set: operationsData },
      { new: true }
    )
      .then(log => res.json(log))
      .catch(err => res.err);
  }
);

// ////////////////////////////////////
// @route   POST api/operations/international/:id
// @desc    Edit international operations
// @access  Private
router.post(
  "/international/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    // Only admin and operations can access
    if (req.user.userType !== "admin" && req.user.userType !== "operations") {
      return res.status(400).json({ unauthorized: "Unauthorized" });
    }

    // const { errors, isValid } = validateLogInput(req.body);

    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    // If the field was empty it will check so that it will default to n/a instead of an empty object
    const operationsData = {};

    operationsData.operations = {};

    operationsData.operations.preloading = {};
    operationsData.operations.loading = {};
    operationsData.operations.unloading = {};
    req.body.preloadingIsFinished;
    // Preloading
    if (req.body.preloadingIsFinished)
      operationsData.operations.preloading.isFinished =
        req.body.preloadingIsFinished;

    if (req.body.preloadingIsFinished === true) {
      if (req.body.preloadingRemarks)
        operationsData.operations.preloading.remarks =
          req.body.preloadingRemarks;

      if (req.body.preloadingDateFinished)
        operationsData.operations.preloading.dateFinished =
          req.body.preloadingDateFinished;
    } else {
      operationsData.operations.preloading.remarks = "n/a";
    }

    // Loading
    if (req.body.loadingIsFinished)
      operationsData.operations.loading.isFinished = req.body.loadingIsFinished;

    if (req.body.loadingIsFinished === true) {
      if (req.body.loadingRemarks)
        operationsData.operations.loading.remarks = req.body.loadingRemarks;

      if (req.body.loadingDateFinished)
        operationsData.operations.loading.dateFinished =
          req.body.loadingDateFinished;
    } else {
      operationsData.operations.loading.remarks = "n/a";
    }
    // Unloading
    if (req.body.unloadingIsFinished)
      operationsData.operations.unloading.isFinished =
        req.body.unloadingIsFinished;

    if (req.body.unloadingIsFinished === true) {
      if (req.body.unloadingRemarks)
        operationsData.operations.unloading.remarks = req.body.unloadingRemarks;

      if (req.body.unloadingDateFinished)
        operationsData.operations.unloading.dateFinished =
          req.body.unloadingDateFinished;
    } else {
      operationsData.operations.unloading.remarks = "n/a";
    }

    operationsData.dateModified = Date.now();

    InternationalLog.findByIdAndUpdate(
      req.params.id,
      { $set: operationsData },
      { new: true }
    )
      .then(log => res.json(log))
      .catch(err => res.err);
  }
);

// ////////////////////////////////////
// @route   POST api/operations/domestic/:id/status
// @desc    Add domestic operations status
// @access  Private
// @payload { comment, dateInput, stage }
router.post(
  "/domestic/:id/status",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    // Only admin and operations can access
    if (req.user.userType !== "admin" && req.user.userType !== "operations") {
      return res.status(400).json({ unauthorized: "Unauthorized" });
    }

    const { errors, isValid } = validateStatusInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newStatus = {};

    if (req.body.dateInput) newStatus.dateInput = req.body.dateInput;
    if (req.body.comment) newStatus.comment = req.body.comment;
    newStatus.name = `${req.user.firstName} ${req.user.lastName}`;
    newStatus.user = req.user.id;

    console.log("USER", req.user);

    DomesticLog.findById(req.params.id).then(log => {
      // const newStatus = {
      //   name: `${req.user.firstName} ${req.user.lastName}`,
      //   user: req.user.id,
      //   comment: req.body.comment,
      //   dateInput: req.body.dateInput
      // };

      log.dateModified = Date.now();

      // Add to statuses array
      switch (req.body.stage) {
        case "preloading":
          if (log.operations.preloading.isFinished === true) {
            return res.status(400).json({
              alreadyFinished: "Can't add status to a finished stage"
            });
          }
          log.operations.preloading.statuses.unshift(newStatus);
          break;

        case "loading":
          if (log.operations.loading.isFinished === true) {
            return res.status(400).json({
              alreadyFinished: "Can't add status to a finished stage"
            });
          }
          log.operations.loading.statuses.unshift(newStatus);
          break;

        case "unloading":
          if (log.operations.unloading.isFinished === true) {
            return res.status(400).json({
              alreadyFinished: "Can't add status to a finished stage"
            });
          }
          log.operations.unloading.statuses.unshift(newStatus);
          break;

        default:
          return res.status(400).json({ unknownStage: "Unknown stage" });
      }

      // Save
      log.save().then(post => res.json(post));
    });
  }
);

// ////////////////////////////////////
// @route   POST api/operations/international/:id/status
// @desc    Add international operations status
// @access  Private
// @payload { comment, dateInput, stage }
router.post(
  "/international/:id/status",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    // Only admin and operations can access
    if (req.user.userType !== "admin" && req.user.userType !== "operations") {
      return res.status(400).json({ unauthorized: "Unauthorized" });
    }

    // const { errors, isValid } = validateLogInput(req.body);

    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    console.log("USER", req.user);

    InternationalLog.findById(req.params.id).then(log => {
      const newStatus = {
        name: `${req.user.firstName} ${req.user.lastName}`,
        user: req.user.id,
        comment: req.body.comment,
        dateInput: req.body.dateInput
      };

      log.dateModified = Date.now();

      // Add to statuses array
      switch (req.body.stage) {
        case "preloading":
          if (log.operations.preloading.isFinished === true) {
            return res.status(400).json({
              alreadyFinished: "Can't add status to a finished stage"
            });
          }
          log.operations.preloading.statuses.unshift(newStatus);
          break;

        case "loading":
          if (log.operations.loading.isFinished === true) {
            return res.status(400).json({
              alreadyFinished: "Can't add status to a finished stage"
            });
          }
          log.operations.loading.statuses.unshift(newStatus);
          break;

        case "unloading":
          if (log.operations.unloading.isFinished === true) {
            return res.status(400).json({
              alreadyFinished: "Can't add status to a finished stage"
            });
          }
          log.operations.unloading.statuses.unshift(newStatus);
          break;

        default:
          return res.status(400).json({ unknownStage: "Unknown stage" });
      }

      // Save
      log.save().then(post => res.json(post));
    });
  }
);

// ////////////////////////////////////
// @route   DELETE api/operations/domestic/:id/status
// @desc    Delete domestic operations status
// @access  Private
router.delete(
  "/domestic/:id/status/:status_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    // Only admin and operations can access
    if (req.user.userType !== "admin" && req.user.userType !== "operations") {
      return res.status(400).json({ unauthorized: "Unauthorized" });
    }

    // DomesticLog.findById(req.params.id)
    //   .then(log => {
    //     if (
    //       log.statuses.filter(
    //         status => status._id.toString() === req.params.status_id
    //       ).length === 0
    //     ) {
    //       return res.status(404).json({ statusNotFound: "Status not found" });
    //     }

    //     const removeIndex = log.statuses
    //       .map(item => item._id.toString())
    //       .indexOf(req.params.status_id);

    //     log.statuses.splice(removeIndex, 1);

    //     log.save().then(log => res.json(log));
    //   })
    //   .catch(err => res.status(404).json({ logNotFound: "No log found" }));

    DomesticLog.findById(req.params.id).then(log => {
      console.log(log);
    });
  }
);

module.exports = router;
