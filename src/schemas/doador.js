const mongoose = require("mongoose");

const doador = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    blood: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Doadores", doador);
