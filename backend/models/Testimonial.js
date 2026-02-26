const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: String,
    company: String,
    message: {
      type: String,
      required: true,
    },
    image: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
