const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  orinalpath: {
    type: String,
    required: true,
  },
  shortestPath: {
    type: String,
  },
});

UrlSchema.virtual("url").get(function () {
  return `http://${this.orinalpath}`;
}),
  
module.exports = mongoose.model("urls", UrlSchema);
