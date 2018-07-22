const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InternationalLogSchema = new Schema({
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
  operations: {
    preloading: {
      status: {
        type: Boolean,
        default: false,
        required: true
      },
      remarks: {
        type: String,
        default: "n/a"
      }
    },
    loading: {
      status: {
        type: Boolean,
        default: false,
        required: true
      },
      remarks: {
        type: String,
        default: "n/a"
      }
    },
    unloading: {
      status: {
        type: Boolean,
        default: false,
        required: true
      },
      remarks: {
        type: String,
        default: "n/a"
      }
    }
  },
  rating: {
    type: String,
    defaut: "n/a"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});
module.exports = InternationalLog = mongoose.model(
  "internationalLogs",
  InternationalLogSchema
);
