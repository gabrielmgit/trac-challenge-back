import { Request, Response } from "express";
import StatusCode from "status-code-enum";
import { ICompany, NewRegistry } from "../../utils/types";
import Company from "../model/Company";

class CompanyController {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const newCompany: NewRegistry<ICompany> = req.body;
      const data = await Company.create(newCompany);
      return res.json(data);
    } catch {
      return res
        .status(StatusCode.ClientErrorUnprocessableEntity)
        .send("unprocessable company");
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const data: ICompany[] = await Company.find({});

    return res.json(data);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const data: ICompany = await Company.findById(req.params.company_id)
        .populate({path: "units", populate: { path: "assets"}})
        // .populate("users")
        .exec();
      return res.json(data);
    } catch (err) {
      return res
        .status(StatusCode.ClientErrorNotFound)
        .send("company not found");
    }
  }

  async removeById(req: Request, res: Response): Promise<Response> {
    try {
      await Company.deleteOne({ _id: req.params.company_id }).exec();

      return res.status(StatusCode.SuccessOK).send("removed");
    } catch (err) {
      return res
        .status(StatusCode.ClientErrorNotFound)
        .send("company not found");
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const company_id = req.params.company_id;
      const updated_company: NewRegistry<ICompany> = req.body;
      const company = await Company.findOneAndUpdate(
        { _id: company_id },
        updated_company,
        {
          new: true,
        }
      );

      return res.json(company);
    } catch (err) {
      return res
        .status(StatusCode.ClientErrorUnprocessableEntity)
        .send("unprocessable Asset");
    }
  }
}

export default new CompanyController();
