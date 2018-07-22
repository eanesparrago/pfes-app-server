const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validations
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// ////////////////////////////////////
// @route   GET api/users/test
// @desc    Tests users route
// @access  Private
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

// ////////////////////////////////////
// @route   POST api/users/register
// @desc    Register user
// @access  Public (Should become private for admin)
router.post("/register", (req, res) => {
  // Validate registration
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ userName: req.body.userName }).then(user => {
    // Check to see if the username already exists in the database
    if (user) {
      return res.status(400).json({ userName: "Username already exists" });
    } else {
      // Create new user of model User
      const newUser = new User({
        userName: req.body.userName,
        userType: req.body.userType,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contact: req.body.contact,
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
  });
});

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
  User.findOne({ userName: userName }).then(user => {
    // Check for user
    if (!user) {
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
          contact: user.contact
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 43200 },
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
      contact: req.user.contact
    });
  }
);

// ////////////////////////////////////
// @route   GET api/users/all
// @desc    Get all users
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    User.find()
      .sort({ userName: 1 })
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
