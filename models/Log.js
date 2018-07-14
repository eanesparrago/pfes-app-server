const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  domJo: {
    type: String,
    required: true
    // unique: true
  },
  shipperConsignee: {
    type: String,
    default: "n/a"
  },
  associate: {
    type: String,
    default: "n/a"
  },
  modeOfTransport: {
    type: String,
    default: "n/a"
  },
  commodity: {
    type: String,
    default: "n/a"
  },
  blAwb: {
    type: String,
    default: "n/a"
  },
  origin: {
    type: String,
    default: "n/a"
  },
  destination: {
    type: String,
    default: "n/a"
  },
  etd: {
    type: Date
  },
  eta: {
    type: Date
  },
  status: {
    type: String,
    default: "Pending"
  },
  operations: {
    preloading: {
      type: String,
      default: "n/a"
    },
    loading: {
      type: String,
      default: "n/a"
    },
    unloading: {
      type: String,
      default: "n/a"
    },
    customerSatisfactionI: {
      type: String,
      default: "n/a"
    },
    customerSatisfactionE: {
      type: String,
      default: "n/a"
    },
    remarks: {
      type: String,
      default: "n/a"
    }
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});
module.exports = Log = mongoose.model("logs", LogSchema);
