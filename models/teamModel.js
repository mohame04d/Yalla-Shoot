const mongoose = require("mongoose");
const teamSchema = mongoose.Schema({
  name: { type: String, required: [true, "name is required"] },
  logo: { type: String },
  information: {
    achievements: [String],
    country: { type: mongoose.Schema.ObjectId, ref: "Team" },
    level: String,
    stadium: { type: mongoose.Schema.ObjectId, ref: "Stadium" },
    federation: String,
    description: String,
  },
  news: [{ type: mongoose.Schema.ObjectId, ref: "News" }],
  coach: [{ type: mongoose.Schema.ObjectId, ref: "Coach" }],
  apiId: { type: Number, unique: true, required: [true, "apiId is required"] },
});
const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
