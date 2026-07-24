const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    github: {
      type: String,
      required: true,
      trim: true
    },

    liveDemo: {
      type: String,
      default: "",
      trim: true
    },

    techStack: {
      type: [String],
      required: true
    },

    image: {
      type: String,
      default: ""
    },

    featured: {
      type: Boolean,
      default: false
    },

    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Project", projectSchema);