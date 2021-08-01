import mongoose from "mongoose";
import { ICompany } from "../../utils/types";

const CompanySchema = new mongoose.Schema<ICompany>(
  {
    name: {
      type: String,
      required: true,
    },
    units: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit",
      },
    ],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", CompanySchema);

export default Company;
