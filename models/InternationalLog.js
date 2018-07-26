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
    type: String,
    default: "n/a"
  },
  eta: {
    type: String,
    default: "n/a"
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
  status: {
    type: String,
    defaut: "Waiting",
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    default: "International",
    required: true
  }
});
module.exports = InternationalLog = mongoose.model(
  "internationalLogs",
  InternationalLogSchema
);
