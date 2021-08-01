import { Request, Response } from "express";
import StatusCode from "status-code-enum";
import { IUnit, NewRegistry } from "../../utils/types";
import Company from "../model/Company";
import Unit from "../model/Unit";
import mongoose from "mongoose";

class UnitController {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const data: IUnit[] = [];
      const company_id = req.params.company_id;
      const newUnit: NewRegistry<IUnit> = req.body;

      const session = await mongoose.startSession();
      await session.withTransaction(async () => {
        const company = await Company.findById(company_id);
        if (!company) throw new Error("Not Found");

        const unit = await Unit.create(newUnit);
        company.units.push(unit);
        company.save();

        data.push(unit);
      });
      session.endSession();

      return res.json(...data);
    } catch (err) {
      console.log(err);
      return res
        .status(StatusCode.ClientErrorUnprocessableEntity)
        .send("unprocessable Unit");
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const data: IUnit[] = await Unit.find({});

    return res.json(data);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const data: IUnit = await Unit.findById(req.params.unit_id).populate("assets").exec();
      return res.json(data);
    } catch (err) {
      return res.status(StatusCode.ClientErrorNotFound).send("unit not found");
    }
  }

  async removeById(req: Request, res: Response): Promise<Response> {
    try {
      await Unit.deleteOne({ _id: req.params.unit_id }).exec();

      return res.status(StatusCode.SuccessOK).send("removed");
    } catch (err) {
      return res.status(StatusCode.ClientErrorNotFound).send("unit not found");
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const unit_id = req.params.unit_id;
      const updated_unit: NewRegistry<IUnit> = req.body;
      const unit = await Company.findOneAndUpdate(
        { _id: unit_id },
        updated_unit,
        {
          new: true,
        }
      );

      return res.json(unit);
    } catch (err) {
      return res
        .status(StatusCode.ClientErrorUnprocessableEntity)
        .send("unprocessable Asset");
    }
  }
}

export default new UnitController();
