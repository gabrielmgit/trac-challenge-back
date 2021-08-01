import express from "express"
import AssetController from "./app/controller/AssetController";
import CompanyController from "./app/controller/CompanyController";
import UnitController from "./app/controller/UnitController";

const routes = express.Router()

// Company Routes
routes.get("/company", CompanyController.findAll);
routes.get("/company/:company_id", CompanyController.findById);
routes.delete("/company/:company_id", CompanyController.removeById);
routes.post("/company", CompanyController.store);
routes.post("/company/:company_id/unit", UnitController.store);
// Unit Routes
routes.get("/unit", UnitController.findAll);
routes.get("/unit/:unit_id", UnitController.findById);
routes.delete("/unit/:unit_id", UnitController.removeById);
routes.post("/unit/:unit_id/asset", AssetController.store);
// Assets Routes
routes.get("/asset", AssetController.findAll);
routes.get("/asset/:asset_id", AssetController.findById);
routes.delete("/asset/:asset_id", AssetController.removeById);
routes.patch("/asset/:asset_id", AssetController.update);
//TODO: Implements User/Auth routes


export default routes;