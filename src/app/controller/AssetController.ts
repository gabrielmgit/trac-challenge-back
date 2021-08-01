import { Request, Response } from "express";
import StatusCode from "status-code-enum";
import { IAsset, NewRegistry } from "../../utils/types";
import Unit from "../model/Unit";
import Asset from "../model/Asset";
import mongoose from "mongoose";
import { BaseController } from "./BaseController";

class AssetController implements BaseController {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const data: IAsset[] = [];
      const unit_id = req.params.unit_id;
      const newAsset: NewRegistry<IAsset> = req.body;

      const session = await mongoose.startSession();
      await session.withTransaction(async () => {
        const unit = await Unit.findById(unit_id);
        if (!unit) throw new Error("Not Found");

        const asset = await Asset.create(newAsset);
        unit.assets.push(asset);
        unit.save();

        data.push(asset);
      });
      session.endSession();

      return res.json(...data);
    } catch (err) {
      return res
        .status(StatusCode.ClientErrorUnprocessableEntity)
        .send("unprocessable asset");
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const asset_id = req.params.asset_id;
      const updated_asset: NewRegistry<IAsset> = req.body;
      const asset = await Asset.findOneAndUpdate(
        { _id: asset_id },
        updated_asset,
        {
          new: true,
        }
      );

      return res.json(asset);
    } catch (err) {
      return res
        .status(StatusCode.ClientErrorUnprocessableEntity)
        .send("unprocessable asset");
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const data: IAsset[] = await Asset.find({});

    return res.json(data);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const data: IAsset = await Asset.findById(req.params.asset_id)
        .populate("assets")
        .exec();
      return res.json(data);
    } catch (err) {
      return res.status(StatusCode.ClientErrorNotFound).send("asset not found");
    }
  }

  async removeById(req: Request, res: Response): Promise<Response> {
    try {
      await Asset.deleteOne({ _id: req.params.asset_id }).exec();

      return res.status(StatusCode.SuccessOK).send("removed");
    } catch (err) {
      return res.status(StatusCode.ClientErrorNotFound).send("asset not found");
    }
  }
}

export default new AssetController();
