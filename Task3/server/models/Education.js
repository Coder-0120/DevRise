const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      required: true,
      trim: true
    },

    degree: {
      type: String,
      required: true,
      trim: true
    },

    fieldOfStudy: {
      type: String,
      required: true,
      trim: true
    },

    startYear: {
      type: Number,
      required: true
    },

    endYear: {
      type: Number,
      required: true
    },

    grade: {
      type: String,
      default: ""
    },

    location: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Education", educationSchema);