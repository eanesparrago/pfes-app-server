const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose.connection);

const DomesticLogSchema = new Schema({
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
    type: String,
    required: true
  },
  blAwb: {
    type: String
  },
  origin: {
    provinceName: {
      type: String,
      required: true
    },
    provinceKey: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  },
  destination: {
    provinceName: {
      type: String,
      required: true
    },
    provinceKey: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    }
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
      default: "",
      required: true
    },
    number: {
      type: String,
      default: "",
      required: true
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
    required: true,
    default: Date.now
  },
  dateModified: {
    type: Date
  },
  type: {
    type: String,
    default: "Domestic",
    required: true
  }
});

DomesticLogSchema.plugin(autoIncrement.plugin, {
  model: "domesticLogs",
  field: "domJo",
  startAt: 1,
  incrementBy: 1
});

module.exports = DomesticLog = mongoose.model(
  "domesticLogs",
  DomesticLogSchema
);
