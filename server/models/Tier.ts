import mongoose from "mongoose";

const elementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageSrc: { type: String, required: true },
});

const tierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tierNumber: { type: Number, required: true },
  elements: [elementSchema],
});

const TierModel = mongoose.model("Tier", tierSchema);
export default TierModel;
