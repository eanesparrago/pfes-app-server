const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose.connection);

const InternationalLogSchema = new Schema({
  // domJo: {
  //   type: Number
  //   // default: 0
  // },
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
      isFinished: {
        type: Boolean,
        default: false,
        required: true
      },
      remarks: {
        type: String,
        default: "n/a"
      },
      dateFinished: {
        type: Date,
        default: Date.now
      },
      name: {
        type: String
      },
      statuses: [
        {
          name: {
            type: String
          },
          user: {
            type: Schema.Types.ObjectId,
            ref: "users"
          },
          comment: {
            type: String,
            required: true
          },
          // dateInput: {
          //   type: Date
          // },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ]
    },
    loading: {
      isFinished: {
        type: Boolean,
        default: false,
        required: true
      },
      remarks: {
        type: String,
        default: "n/a"
      },
      dateFinished: {
        type: Date,
        default: Date.now
      },
      name: {
        type: String
      },
      statuses: [
        {
          name: {
            type: String
          },
          user: {
            type: Schema.Types.ObjectId,
            ref: "users"
          },
          comment: {
            type: String,
            required: true
          },
          dateInput: {
            type: Date
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ]
    },
    unloading: {
      isFinished: {
        type: Boolean,
        default: false,
        required: true
      },
      remarks: {
        type: String,
        default: "n/a"
      },
      dateFinished: {
        type: Date,
        default: Date.now
      },
      name: {
        type: String
      },
      statuses: [
        {
          name: {
            type: String
          },
          user: {
            type: Schema.Types.ObjectId,
            ref: "users"
          },
          comment: {
            type: String,
            required: true
          },
          dateInput: {
            type: Date
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ]
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
  active: {
    type: String,
    default: true,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  dateModified: {
    type: Date
  },
  type: {
    type: String,
    default: "International",
    required: true
  }
});

InternationalLogSchema.plugin(autoIncrement.plugin, {
  model: "internationalLogs",
  field: "domJo",
  startAt: 1,
  incrementBy: 1
});

module.exports = DomesticLog = mongoose.model(
  "internationalLogs",
  InternationalLogSchema
);
