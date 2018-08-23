const express = require("express");
const router = express.Router();
const passport = require("passport");

const DomesticActivity = require("../../models/DomesticActivity");
const InternationalActivity = require("../../models/InternationalActivity");

// ////////////////////////////////////
// @route   GET api/activities/domestic
// @desc    Get domestic activities
// @access  Private
router.get(
  "/domestic",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    DomesticActivity.find()
      .sort({ _id: -1 })
      .then(logs => {
        if (!logs) {
          errors.noLogs = "There are no domestic activity logs";
          return res.status(404).json(errors);
        }
        res.json(logs);
      })
      .catch(err =>
        res
          .status(404)
          .json({ domesticActivity: "There are no domestic activity logs" })
      );
  }
);

// ////////////////////////////////////
// @route   GET api/activities/international
// @desc    Get international activities
// @access  Private
router.get(
  "/international",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    InternationalActivity.find()
      .sort({ _id: -1 })
      .then(logs => {
        if (!logs) {
          errors.noLogs = "There are no international activity logs";
          return res.status(404).json(errors);
        }
        res.json(logs);
      })
      .catch(err =>
        res.status(404).json({
          internationalActivity: "There are no international activity logs"
        })
      );
  }
);

module.exports = router;
