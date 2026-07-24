const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true
    },

    role: {
      type: String,
      required: true,
      trim: true
    },

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      default: null
    },

    location: {
      type: String,
      default: "",
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    techStack: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Experience", experienceSchema);