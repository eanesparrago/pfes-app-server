const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validations
const validateRegisterInput = require("../../validation/register");
const validateEditUserInput = require("../../validation/editUser");
const validateLoginInput = require("../../validation/login");
const validatePasswordInput = require("../../validation/password");

// Load User model
const User = require("../../models/User");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// ////////////////////////////////////
// @route   GET api/users/test
// @desc    Tests users route
// @access  Private
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

// ////////////////////////////////////
// @route   POST api/users/register
// @desc    Register user
// @access  Private
router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Only admin register a new user account
    if (req.user.userType !== "admin") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Validate registration
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({ userName_lower: req.body.userName.toLowerCase() }).then(
      user => {
        // Check to see if the username already exists in the database
        if (user) {
          return res.status(400).json({ userName: "Username already exists" });
        } else {
          // Create new user of model User
          const newUser = new User({
            userName: req.body.userName,
            userName_lower: req.body.userName.toLowerCase(),
            userType: req.body.userType,
            firstName: capitalizeFirstLetter(req.body.firstName.trim()),
            lastName: capitalizeFirstLetter(req.body.lastName.trim()),
            email: req.body.email.trim().toLowerCase(),
            contact: req.body.contact.trim(),
            password: req.body.password // This will be a hash
          });

          // Generate hash for password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        }
      }
    );
  }
);

// ////////////////////////////////////
// @route   POST api/users/edit
// @desc    Edit user
// @access  Private
router.post(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Only admin can access
    if (req.user.userType !== "admin") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Validate registration
    const { errors, isValid } = validateEditUserInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const userEdits = {};

    userEdits.userType = req.body.userType;
    userEdits.firstName = req.body.firstName;
    userEdits.lastName = req.body.lastName;
    userEdits.email = req.body.email.toLowerCase();
    userEdits.contact = req.body.contact;
    userEdits.isActive = req.body.isActive;

    User.findOneAndUpdate(
      { userName: req.body.userName },
      { $set: userEdits },
      { new: true }
    ).then(user => {
      res.json(user);
    });
  }
);

// ////////////////////////////////////
// @route   POST api/users/password
// @desc    Change user password
// @access  Private
router.post(
  "/password",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Only admin can access
    if (req.user.userType !== "admin") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Validate registration
    const { errors, isValid } = validatePasswordInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({ userName_lower: req.body.userName.toLowerCase() }).then(
      user => {
        if (!user) {
          return res.status(400).json({ userNotFound: "User not found" });
        }

        const userEdits = {};
        userEdits.password = req.body.password;

        // Generate hash for password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(userEdits.password, salt, (err, hash) => {
            if (err) throw err;
            userEdits.password = hash;

            User.findOneAndUpdate(
              { userName: req.body.userName },
              { $set: userEdits },
              { new: true }
            ).then(log => {
              res.json({ reply: "Change password success" });
            });
          });
        });
      }
    );
  }
);

// ////////////////////////////////////
// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  // Valid login
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Find user by username
  User.findOne({ userName: userName })
    .then(user => {
      // Check for user
      if (!user || user.isActive === false) {
        errors.userName = "User not found";
        return res.status(404).json(errors);
      }

      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched, create JWT Payload
          const payload = {
            id: user.id,
            userName: user.userName,
            userType: user.userType,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            contact: user.contact,
            date: user.date,
            logsAdded: user.logsAdded,
            logsCompleted: user.logsCompleted
          };

          // Sign token (expires in 30 minutes or 1800 seconds)
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 1800 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
                payload
              });
            }
          );
        } else {
          errors.password = "Incorrect login information";
          return res.status(400).json(errors);
        }
      });
    })
    .catch(err => {
      errors.password = "Network error";

      res.status(404).json(errors);
    });
});

// ////////////////////////////////////
// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      userName: req.user.userName,
      userType: req.user.userType,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      contact: req.user.contact,
      date: req.user.date
    });
  }
);

// ////////////////////////////////////
// @route   GET api/users/all
// @desc    Get all users
// @access  Private (admin)
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Only admin register a new user account
    if (req.user.userType !== "admin") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const errors = {};

    User.find()
      .select("-password")
      .where("userName")
      .nin(["pfesadmin"])
      .sort({ date: -1 })
      .then(users => {
        if (!users) {
          errors.noUsers = "There are no users";

          return res.status(404).json(errors);
        }
        res.json(users);
      })
      .catch(err => res.status(404).json({ profile: "There are no users" }));
  }
);

module.exports = router;
