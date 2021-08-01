import mongoose from "mongoose";
import { IUnit } from "../../utils/types";

const UnitSchema = new mongoose.Schema<IUnit>(
  {
    name: {
      type: String,
      required: true,
    },
    assets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Unit = mongoose.model("Unit", UnitSchema);

export default Unit;
