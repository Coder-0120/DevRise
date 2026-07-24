const mongoose = require("mongoose");

const socialSchema = new mongoose.Schema(
  {
    github: {
      type: String,
      default: ""
    },

    linkedin: {
      type: String,
      default: ""
    },

    leetcode: {
      type: String,
      default: ""
    },

    portfolio: {
      type: String,
      default: ""
    },

    email: {
      type: String,
      default: ""
    },

    phone: {
      type: String,
      default: ""
    },

    twitter: {
      type: String,
      default: ""
    },

    instagram: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Social", socialSchema);