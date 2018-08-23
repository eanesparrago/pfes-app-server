const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InternationalActivitySchema = new Schema({
  dateAdded: {
    type: Date,
    default: Date.now,
    required: true
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userFullName: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
  },
  logID: {
    type: Schema.Types.ObjectId,
    ref: "internationalLogs"
  },
  logNumber: {
    type: String,
    required: true
  },
  logShipper: {
    type: String,
    required: true
  },
  actionType: {
    type: "String",
    required: true
  },
  actionSummary: {
    type: "String",
    required: true
  }
});

module.exports = InternationalActivity = mongoose.model(
  "internationalActivities",
  InternationalActivitySchema
);
