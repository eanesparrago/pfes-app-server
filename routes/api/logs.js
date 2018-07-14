const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Log model
const Log = require("../../models/Log");

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
// @route   POST api/logs/
// @desc    Create log
// @access  Private
router.post(
  "/",
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

    const newLog = new Log({
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
      operations: {
        preloading: req.body.preloading,
        loading: req.body.loading,
        unloading: req.body.unloading,
        customerSatisfactionI: req.body.customerSatisfactionI,
        customerSatisfactionE: req.body.customerSatisfactionE,
        remarks: req.body.remarks
      },
      user: req.user.id
    });

    Log.findOne({ domJo: req.body.domJo }).then(log => {
      if (log) {
        errors.domJo = "That DOM/JO# already exists";
        return res.status(400).json(errors);
      }

      newLog.save().then(log => res.json(log));
    });
    // }
    // });
  }
);

// ////////////////////////////////////
// @route   DELETE api/logs/
// @desc    Delete log
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Only admin can delete logs
    if (req.user.userType !== "admin") {
      return res.json({ unauthorized: "Unauthorized" });
    }

    Log.remove({ domJo: req.body.domJo }).then(() => {
      res.json({ success: true });
    });
  }
);

// ////////////////////////////////////
// @route   POST api/logs/edit
// @desc    Edit log
// @access  Private


module.exports = router;
