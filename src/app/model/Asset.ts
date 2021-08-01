import mongoose from "mongoose";
import { IAsset } from "../../utils/types";

const AssetSchema = new mongoose.Schema<IAsset>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["RUNNING", "ALERTING", "STOPPED"],
      required: true,
    },
    health: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Asset = mongoose.model("Asset", AssetSchema);

export default Asset;