import { Request, Response } from "express";

export interface BaseController {
    store(req: Request, res: Response): Promise<Response> 
    findAll(req: Request, res: Response): Promise<Response>
    findById(req: Request, res: Response): Promise<Response>
    removeById(req: Request, res: Response): Promise<Response>
    update(req: Request, res: Response): Promise<Response>
}