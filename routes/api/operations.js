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
// @payload { isFinished, remarks, dateFinished, stage }
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

    DomesticLog.findById(req.params.id).then(log => {
      const data = {};
      if (req.body.remarks) data.remarks = req.body.remarks;
      if (req.body.dateFinished) data.dateFinished = req.body.dateFinished;

      switch (req.body.stage) {
        case "preloading":
          log.operations.preloading.isFinished = req.body.isFinished;

          if (req.body.isFinished === true) {
            if (req.body.remarks)
              log.operations.preloading.remarks = data.remarks;
            if (req.body.dateFinished)
              log.operations.preloading.dateFinished = data.dateFinished;
          } else if (req.body.isFinished === false) {
            log.operations.preloading.remarks = "n/a";

            log.operations.loading.isFinished = false;
            log.operations.loading.remarks = "n/a";
            log.operations.unloading.isFinished = false;
            log.operations.unloading.remarks = "n/a";
          }

          log.operations.preloading.name = `${req.user.firstName} ${
            req.user.lastName
          }`;

          log.save().then(log => res.json(log));
          break;

        case "loading":
          if (log.operations.preloading.isFinished === false) {
            return res.status(400).json({
              preloadingNotFinished:
                "Can't complete loading if preloading isn't completed yet"
            });
          }

          log.operations.loading.isFinished = req.body.isFinished;

          if (req.body.isFinished === true) {
            if (req.body.remarks) log.operations.loading.remarks = data.remarks;
            if (req.body.dateFinished)
              log.operations.loading.dateFinished = data.dateFinished;
          } else if (req.body.isFinished === false) {
            log.operations.loading.remarks = "n/a";

            log.operations.unloading.isFinished = false;
            log.operations.unloading.remarks = "n/a";
          }

          log.operations.loading.name = `${req.user.firstName} ${
            req.user.lastName
          }`;

          log.save().then(log => res.json(log));
          break;

        case "unloading":
          if (log.operations.preloading.isFinished === false) {
            return res.status(400).json({
              loadingNotFinished:
                "Can't complete unloading if preloading isn't completed yet"
            });
          }
          if (log.operations.loading.isFinished === false) {
            return res.status(400).json({
              preloadingNotFinished:
                "Can't complete unloading if loading isn't completed yet"
            });
          }

          log.operations.unloading.isFinished = req.body.isFinished;

          if (req.body.isFinished === true) {
            if (req.body.remarks)
              log.operations.unloading.remarks = data.remarks;
            if (req.body.dateFinished)
              log.operations.unloading.dateFinished = data.dateFinished;
          } else if (req.body.isFinished === false) {
            log.operations.unloading.remarks = "n/a";
          }

          log.operations.unloading.name = `${req.user.firstName} ${
            req.user.lastName
          }`;

          log.save().then(log => res.json(log));
          break;

        default:
          return res.status(400).json({ unknownStage: "Unknown stage" });
      }
    });
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

    InternationalLog.findById(req.params.id).then(log => {
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
// @payload { stage }
router.post(
  "/domestic/:id/status/:status_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    // Only admin and operations can access
    if (req.user.userType !== "admin" && req.user.userType !== "operations") {
      return res.status(400).json({ unauthorized: "Unauthorized" });
    }

    console.log("stage:", req.body.stage);

    DomesticLog.findById(req.params.id)
      .then(log => {
        switch (req.body.stage) {
          case "preloading":
            if (log.operations.preloading.isFinished === true) {
              return res.status(400).json({
                alreadyFinished: "Can't delete status from a finished stage"
              });
            }
            if (
              log.operations.preloading.statuses.filter(
                status => status._id.toString() === req.params.status_id
              ).length === 0
            ) {
              return res
                .status(404)
                .json({ statusNotFound: "Preloading status not found" });
            } else {
              const removeIndex = log.operations.preloading.statuses
                .map(item => item._id.toString())
                .indexOf(req.params.status_id);

              log.operations.preloading.statuses.splice(removeIndex, 1);

              log.save().then(log => res.json(log));
            }
            break;

          case "loading":
            if (log.operations.loading.isFinished === true) {
              return res.status(400).json({
                alreadyFinished: "Can't delete status from a finished stage"
              });
            }
            if (
              log.operations.loading.statuses.filter(
                status => status._id.toString() === req.params.status_id
              ).length === 0
            ) {
              return res
                .status(404)
                .json({ statusNotFound: "Loading status not found" });
            } else {
              const removeIndex = log.operations.loading.statuses
                .map(item => item._id.toString())
                .indexOf(req.params.status_id);

              log.operations.loading.statuses.splice(removeIndex, 1);

              log.save().then(log => res.json(log));
            }
            break;

          case "unloading":
            if (log.operations.unloading.isFinished === true) {
              return res.status(400).json({
                alreadyFinished: "Can't delete status from a finished stage"
              });
            }
            if (
              log.operations.unloading.statuses.filter(
                status => status._id.toString() === req.params.status_id
              ).length === 0
            ) {
              return res
                .status(404)
                .json({ statusNotFound: "Preloading status not found" });
            } else {
              const removeIndex = log.operations.unloading.statuses
                .map(item => item._id.toString())
                .indexOf(req.params.status_id);

              log.operations.unloading.statuses.splice(removeIndex, 1);

              log.save().then(log => res.json(log));
            }
            break;

          default:
            return res.status(400).json({ unknownStage: "Unknown stage" });
        }
      })
      .catch(err => res.status(404).json({ logNotFound: "No log found" }));
  }
);

// ////////////////////////////////////
// @route   DELETE api/operations/international/:id/status
// @desc    Delete international operations status
// @access  Private
// @payload { stage }
router.post(
  "/international/:id/status/:status_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    // Only admin and operations can access
    if (req.user.userType !== "admin" && req.user.userType !== "operations") {
      return res.status(400).json({ unauthorized: "Unauthorized" });
    }

    console.log("stage:", req.body.stage);

    InternationalLog.findById(req.params.id)
      .then(log => {
        switch (req.body.stage) {
          case "preloading":
            if (log.operations.preloading.isFinished === true) {
              return res.status(400).json({
                alreadyFinished: "Can't delete status from a finished stage"
              });
            }
            if (
              log.operations.preloading.statuses.filter(
                status => status._id.toString() === req.params.status_id
              ).length === 0
            ) {
              return res
                .status(404)
                .json({ statusNotFound: "Preloading status not found" });
            } else {
              const removeIndex = log.operations.preloading.statuses
                .map(item => item._id.toString())
                .indexOf(req.params.status_id);

              log.operations.preloading.statuses.splice(removeIndex, 1);

              log.save().then(log => res.json(log));
            }
            break;

          case "loading":
            if (log.operations.loading.isFinished === true) {
              return res.status(400).json({
                alreadyFinished: "Can't delete status from a finished stage"
              });
            }
            if (
              log.operations.loading.statuses.filter(
                status => status._id.toString() === req.params.status_id
              ).length === 0
            ) {
              return res
                .status(404)
                .json({ statusNotFound: "Loading status not found" });
            } else {
              const removeIndex = log.operations.loading.statuses
                .map(item => item._id.toString())
                .indexOf(req.params.status_id);

              log.operations.loading.statuses.splice(removeIndex, 1);

              log.save().then(log => res.json(log));
            }
            break;

          case "unloading":
            if (log.operations.unloading.isFinished === true) {
              return res.status(400).json({
                alreadyFinished: "Can't delete status from a finished stage"
              });
            }
            if (
              log.operations.unloading.statuses.filter(
                status => status._id.toString() === req.params.status_id
              ).length === 0
            ) {
              return res
                .status(404)
                .json({ statusNotFound: "Preloading status not found" });
            } else {
              const removeIndex = log.operations.unloading.statuses
                .map(item => item._id.toString())
                .indexOf(req.params.status_id);

              log.operations.unloading.statuses.splice(removeIndex, 1);

              log.save().then(log => res.json(log));
            }
            break;

          default:
            return res.status(400).json({ unknownStage: "Unknown stage" });
        }
      })
      .catch(err => res.status(404).json({ logNotFound: "No log found" }));
  }
);

module.exports = router;
