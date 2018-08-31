const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose.connection);

const InternationalLogSchema = new Schema({
  shipperConsignee: {
    type: String,
    required: true
  },
  associate: {
    type: String,
    required: true
  },
  modeOfTransport: {
    type: String,
    required: true
  },
  commodity: {
    type: {
      type: String
    },
    description: {
      type: String,
      required: true
    }
  },
  blAwb: {
    type: String
  },
  origin: {
    country: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  },
  destination: {
    country: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  },
  pickupDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  etd: {
    type: Date,
    default: Date.now,
    required: true
  },
  eta: {
    type: Date,
    default: Date.now,
    required: true
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
        type: Date
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
          type: {
            type: String,
            required: true,
            default: "Info"
          },
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
        type: Date
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
          type: {
            type: String,
            required: true,
            default: "Info"
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
        type: Date
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
          type: {
            type: String,
            required: true,
            default: "Info"
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ]
    }
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  dateCompleted: {
    type: Date
  },
  remarks: {
    type: String,
    defaut: "n/a"
  },
  contact: {
    name: {
      type: String,
      default: ""
    },
    number: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      default: ""
    }
  },
  status: {
    type: String,
    defaut: "Ongoing",
    required: true
  },
  tags: {
    urgent: {
      type: Boolean,
      default: false
    },
    insured: {
      type: Boolean,
      default: false
    }
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  active: {
    type: Boolean,
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

module.exports = InternationalLog = mongoose.model(
  "internationalLogs",
  InternationalLogSchema
);
