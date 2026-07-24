const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    issuer: {
      type: String,
      required: true,
      trim: true
    },

    issueDate: {
      type: String,
      required: true
    },

    credentialId: {
      type: String,
      default: ""
    },

    credentialLink: {
      type: String,
      default: ""
    },

    image: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Certificate", certificateSchema);