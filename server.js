// ////////////////////////////////////
// DEPENDENCIES IMPORTS
const express = require("express");
// Express 3.x is a light-weight web application framework to help organize your web application into an MVC architecture on the server side.

const mongoose = require("mongoose");
// Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.

const bodyParser = require("body-parser");
// Node.js body parsing middleware.

const passport = require("passport");
// Passport is Express-compatible authentication middleware for Node.js.

const path = require("path");
// path module part of nodejs

const cors = require("cors");

// ////////////////////////////////////
// ROUTES IMPORTS
const users = require("./routes/api/users");
const logs = require("./routes/api/logs");
const operations = require("./routes/api/operations");
const activities = require("./routes/api/activities");

// ////////////////////////////////////

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config import
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

app.use(cors({ credentials: true, origin: true }));

//  Use routes
app.use("/api/users", users);
app.use("/api/logs", logs);
app.use("/api/operations", operations);
app.use("/api/activities", activities);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
