import { Router } from "express";
import { IRoute } from "../interfaces";
import { CandidateController } from "../controllers/candidate.controller";
import { asyncHandler } from "../middlewares";

export class CandidateRoute implements IRoute {
  public path = "/candidates";
  public router = Router();
  public candidateController = new CandidateController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      asyncHandler(this.candidateController.findAll)
    );
    this.router.post(
      `${this.path}`,
      asyncHandler(this.candidateController.create)
    );
    this.router.put(
      `${this.path}/:id`,
      asyncHandler(this.candidateController.update)
    );
    this.router.delete(
      `${this.path}/:id`,
      asyncHandler(this.candidateController.delete)
    );
    this.router.get(
      `${this.path}/:id`,
      asyncHandler(this.candidateController.details)
    );
  }
}
