const mongoose = require('mongoose');

const ArtifactSchema = new mongoose.Schema({
  ArtiName: String,
  Desc: String,
  Hist: String
});

const ExcavationSchema = new mongoose.Schema({
  Ename: String,
  "start-end": String,
  Lead: String,
  Findings: String,
  Team: [String],
  Discoveries: [String], // fixed typo: use "Discoveries"
  Techniques: [String]
});

const EventSchema = new mongoose.Schema({
  EvName: String,
  Date: String,
  Time: String,
  Location: String,
  desc: String,
  Ticket: String,
  Organisor: String,
  Type: String
});

const GuideSchema = new mongoose.Schema({
  Gname: String,
  Rating: Number,
  NoR: Number,
  Languages: String,
  Experience: String,
  Cost: String
});

const MonumentSchema = new mongoose.Schema({
  monumentName: String,
  ShortDesc: String,
  EntryFee: String,
  StartTime: String,
  ClosingTime: String,
  History: String,
  Significance: String,
  Artifacts: [ArtifactSchema],
  Excavs: [ExcavationSchema],
  Events: [EventSchema],
  Guides: [GuideSchema]
});

const CitySchema = new mongoose.Schema({
  name: String,
  monuments: [MonumentSchema]
});

module.exports = mongoose.model('City', CitySchema);
