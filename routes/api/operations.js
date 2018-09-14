const express = require("express");
const router = express.Router();
const passport = require("passport");

// Log model
const DomesticLog = require("../../models/DomesticLog");
const InternationalLog = require("../../models/InternationalLog");
const DomesticActivity = require("../../models/DomesticActivity");
const InternationalActivity = require("../../models/InternationalActivity");

// Validators
const validateStatusInput = require("../../validation/status");

// ////////////////////////////////////
// @route   POST api/operations/domestic/:id
// @desc    Edit domestic operations
// @access  Private
// @payload { isFinished, remarks, stage }
router.post(
  "/domestic/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Only admin and operations can access
    if (req.user.userType !== "admin" && req.user.userType !== "operations") {
      return res.status(400).json({ unauthorized: "Unauthorized" });
    }

    DomesticLog.findById(req.params.id).then(log => {
      const data = {};
      if (req.body.remarks) data.remarks = req.body.remarks;

      // Activity
      const newActivity = new DomesticActivity({
        userID: req.user.id,
        userName: req.user.userName,
        userFullName: `${req.user.firstName} ${req.user.lastName}`,
        userType: req.user.userType,
        logID: log._id,
        logNumber: log.domJo,
        logShipper: log.shipperConsignee,
        actionType: "Update Job Order Operations Status Stage",
        actionSummary: `${req.user.firstName} ${req.user.lastName} (${
          req.user.userName
        }) updated the operations status of ${log.type} Job Order #${
          log.domJo
        } (${log.shipperConsignee}).`
      });

      switch (req.body.stage) {
        case "preloading":
          log.operations.preloading.isFinished = req.body.isFinished;

          if (req.body.isFinished === true) {
            if (req.body.remarks)
              log.operations.preloading.remarks = data.remarks;

            log.operations.preloading.dateFinished = Date.now();
          } else if (req.body.isFinished === false) {
            log.operations.preloading.remarks = "n/a";

            log.operations.loading.isFinished = false;
            log.operations.loading.remarks = "n/a";
            log.operations.unloading.isFinished = false;
            log.operations.unloading.remarks = "n/a";
          }

          // Full name of the user who accessed
          log.operations.preloading.name = `${req.user.firstName} ${
            req.user.lastName
          }`;

          log.save().then(log => res.json(log));

          // Save activity
          newActivity.save();
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

            log.operations.loading.dateFinished = Date.now();
          } else if (req.body.isFinished === false) {
            log.operations.loading.remarks = "n/a";

            log.operations.unloading.isFinished = false;
            log.operations.unloading.remarks = "n/a";
          }

          log.operations.loading.name = `${req.user.firstName} ${
            req.user.lastName
          }`;

          log.save().then(log => res.json(log));

          // Save activity
          newActivity.save();
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

            log.operations.unloading.dateFinished = Date.now();
          } else if (req.body.isFinished === false) {
            log.operations.unloading.remarks = "n/a";
          }

          log.operations.unloading.name = `${req.user.firstName} ${
            req.user.lastName
          }`;

          log.save().then(log => res.json(log));

          // User update
          User.findOneAndUpdate(
            { _id: req.user.id },
            { $inc: { logsCompleted: 1 } },
            { new: true },
            (err, response) => {
              if (err) {
                console.log(err);
              }
            }
          );

          // Save activity
          newActivity.save();
          break;

        default:
          return res.status(400).json({ unknownStage: "Unknown stage" });
      }
    });
  }
);

// ////////////////////////////////////
// @route   POST api/operations/international/:id
// @desc    Edit international operations
// @access  Private
// @payload { isFinished, remarks, stage }
router.post(
  "/international/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Only admin and operations can access
    if (req.user.userType !== "admin" && req.user.userType !== "operations") {
      return res.status(400).json({ unauthorized: "Unauthorized" });
    }

    InternationalLog.findById(req.params.id).then(log => {
      const data = {};
      if (req.body.remarks) data.remarks = req.body.remarks;

      // Activity
      const newActivity = new InternationalActivity({
        userID: req.user.id,
        userName: req.user.userName,
        userFullName: `${req.user.firstName} ${req.user.lastName}`,
        userType: req.user.userType,
        logID: log._id,
        logNumber: log.domJo,
        logShipper: log.shipperConsignee,
        actionType: "Update Job Order Operations Status Stage",
        actionSummary: `${req.user.firstName} ${req.user.lastName} (${
          req.user.userName
        }) updated the operations status of ${log.type} Job Order #${
          log.domJo
        } (${log.shipperConsignee}).`
      });

      switch (req.body.stage) {
        case "preloading":
          log.operations.preloading.isFinished = req.body.isFinished;

          if (req.body.isFinished === true) {
            if (req.body.remarks)
              log.operations.preloading.remarks = data.remarks;

            log.operations.preloading.dateFinished = Date.now();
          } else if (req.body.isFinished === false) {
            log.operations.preloading.remarks = "n/a";

            log.operations.loading.isFinished = false;
            log.operations.loading.remarks = "n/a";
            log.operations.unloading.isFinished = false;
            log.operations.unloading.remarks = "n/a";
          }

          // Full name of the user who accessed
          log.operations.preloading.name = `${req.user.firstName} ${
            req.user.lastName
          }`;

          log.save().then(log => res.json(log));

          // Save activity
          newActivity.save();
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

            log.operations.loading.dateFinished = Date.now();
          } else if (req.body.isFinished === false) {
            log.operations.loading.remarks = "n/a";

            log.operations.unloading.isFinished = false;
            log.operations.unloading.remarks = "n/a";
          }

          log.operations.loading.name = `${req.user.firstName} ${
            req.user.lastName
          }`;

          log.save().then(log => res.json(log));

          // Save activity
          newActivity.save();
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

            log.operations.unloading.dateFinished = Date.now();
          } else if (req.body.isFinished === false) {
            log.operations.unloading.remarks = "n/a";
          }

          log.operations.unloading.name = `${req.user.firstName} ${
            req.user.lastName
          }`;

          log.save().then(log => res.json(log));

          // User update
          User.findOneAndUpdate(
            { _id: req.user.id },
            { $inc: { logsCompleted: 1 } },
            { new: true },
            (err, response) => {
              if (err) {
                console.log(err);
              }
            }
          );

          // Save activity
          newActivity.save();
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

    if (req.body.comment) newStatus.comment = req.body.comment;
    if (req.body.type) newStatus.type = req.body.type;

    newStatus.name = `${req.user.firstName} ${req.user.lastName}`;
    newStatus.user = req.user.id;

    DomesticLog.findById(req.params.id).then(log => {
      log.dateModified = Date.now();

      // Activity
      const newActivity = new DomesticActivity({
        userID: req.user.id,
        userName: req.user.userName,
        userFullName: `${req.user.firstName} ${req.user.lastName}`,
        userType: req.user.userType,
        logID: log._id,
        logNumber: log.domJo,
        logShipper: log.shipperConsignee,
        actionType: "Add Job Order Operations Status",
        actionSummary: `${req.user.firstName} ${req.user.lastName} (${
          req.user.userName
        }) added an operations status (${req.body.type}) in ${
          log.type
        } Job Order #${log.domJo} (${log.shipperConsignee}).`
      });

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

      // Save activity
      newActivity.save();
    });
  }
);

// ////////////////////////////////////
// @route   POST api/operations/international/:id/status
// @desc    Add international operations status
// @access  Private
// @payload { comment, stage }
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

    if (req.body.comment) newStatus.comment = req.body.comment;
    if (req.body.type) newStatus.type = req.body.type;

    newStatus.name = `${req.user.firstName} ${req.user.lastName}`;
    newStatus.user = req.user.id;

    InternationalLog.findById(req.params.id).then(log => {
      log.dateModified = Date.now();

      // Activity
      const newActivity = new InternationalActivity({
        userID: req.user.id,
        userName: req.user.userName,
        userFullName: `${req.user.firstName} ${req.user.lastName}`,
        userType: req.user.userType,
        logID: log._id,
        logNumber: log.domJo,
        logShipper: log.shipperConsignee,
        actionType: "Add Job Order Operations Status",
        actionSummary: `${req.user.firstName} ${req.user.lastName} (${
          req.user.userName
        }) added an operations status (${req.body.type}) in ${
          log.type
        } Job Order #${log.domJo} (${log.shipperConsignee}).`
      });

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

      // Save activity
      newActivity.save();
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
    // Only admin and operations can access
    if (req.user.userType !== "admin" && req.user.userType !== "operations") {
      return res.status(400).json({ unauthorized: "Unauthorized" });
    }

    DomesticLog.findById(req.params.id)
      .then(log => {
        // Activity
        const newActivity = new DomesticActivity({
          userID: req.user.id,
          userName: req.user.userName,
          userFullName: `${req.user.firstName} ${req.user.lastName}`,
          userType: req.user.userType,
          logID: log._id,
          logNumber: log.domJo,
          logShipper: log.shipperConsignee,
          actionType: "Delete Job Order Operations Status",
          actionSummary: `${req.user.firstName} ${req.user.lastName} (${
            req.user.userName
          }) deleted a ${log.type} Job Order #${log.domJo} (${
            log.shipperConsignee
          }) operations status.`
        });

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

              // Validate if the operations user account owns the status
              if (
                req.user.userType === "operations" &&
                log.operations.preloading.statuses[
                  removeIndex
                ].user.toString() !== req.user.id
              ) {
                return res.status(400).json({
                  unauthorized: "Cannot delete status"
                });
              }

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

              // Validate if the operations user account owns the status
              if (
                req.user.userType === "operations" &&
                log.operations.loading.statuses[removeIndex].user.toString() !==
                  req.user.id
              ) {
                return res.status(400).json({
                  unauthorized: "Cannot delete status"
                });
              }

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

              // Validate if the operations user account owns the status
              if (
                req.user.userType === "operations" &&
                log.operations.unloading.statuses[
                  removeIndex
                ].user.toString() !== req.user.id
              ) {
                return res.status(400).json({
                  unauthorized: "Cannot delete status"
                });
              }

              log.operations.unloading.statuses.splice(removeIndex, 1);

              log.save().then(log => res.json(log));
            }
            break;

          default:
            return res.status(400).json({ unknownStage: "Unknown stage" });
        }

        // Save activity
        newActivity.save();
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
    // Only admin and operations can access
    if (req.user.userType !== "admin" && req.user.userType !== "operations") {
      return res.status(400).json({ unauthorized: "Unauthorized" });
    }

    InternationalLog.findById(req.params.id)
      .then(log => {
        const newActivity = new InternationalActivity({
          userID: req.user.id,
          userName: req.user.userName,
          userFullName: `${req.user.firstName} ${req.user.lastName}`,
          userType: req.user.userType,
          logID: log._id,
          logNumber: log.domJo,
          logShipper: log.shipperConsignee,
          actionType: "Delete Job Order Operations Status",
          actionSummary: `${req.user.firstName} ${req.user.lastName} (${
            req.user.userName
          }) deleted a ${log.type} Job Order #${log.domJo} (${
            log.shipperConsignee
          }) operations status.`
        });

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

              // Validate if the operations user account owns the status
              if (
                req.user.userType === "operations" &&
                log.operations.preloading.statuses[
                  removeIndex
                ].user.toString() !== req.user.id
              ) {
                return res.status(400).json({
                  unauthorized: "Cannot delete status"
                });
              }

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

              // Validate if the operations user account owns the status
              if (
                req.user.userType === "operations" &&
                log.operations.loading.statuses[removeIndex].user.toString() !==
                  req.user.id
              ) {
                return res.status(400).json({
                  unauthorized: "Cannot delete status"
                });
              }

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

              // Validate if the operations user account owns the status
              if (
                req.user.userType === "operations" &&
                log.operations.unloading.statuses[
                  removeIndex
                ].user.toString() !== req.user.id
              ) {
                return res.status(400).json({
                  unauthorized: "Cannot delete status"
                });
              }

              log.operations.unloading.statuses.splice(removeIndex, 1);

              log.save().then(log => res.json(log));
            }
            break;

          default:
            return res.status(400).json({ unknownStage: "Unknown stage" });
        }

        // Save activity
        newActivity.save();
      })
      .catch(err => res.status(404).json({ logNotFound: "No log found" }));
  }
);

module.exports = router;
