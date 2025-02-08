import { Request, Response } from "express";
import { ENUM_HTTP_STATUS } from "../enums";
import { CandidateService } from "../services";
import { BaseController } from "./base.controller";
import { QueryCandidateDto } from "../dto";

export class CandidateController extends BaseController {
  private candidateService: CandidateService;
  constructor() {
    super();
    this.candidateService = new CandidateService();
  }
  public findAll = async (req: Request, res: Response) => {
    const query = req.query as unknown as QueryCandidateDto;
    const candidates = await this.candidateService.findAll(query);
    this.response(res, candidates);
  };

  public create = async (req: Request, res: Response) => {
    const data = await this.candidateService.create(req.body);
    this.response(res, { data, status: ENUM_HTTP_STATUS.CREATED });
  };

  public details = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await this.candidateService.details(id);
    this.response(res, { data });
  };

  public update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await this.candidateService.details(id);
    this.response(res, { data });
  };

  public delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    await this.candidateService.delete(id);
    this.response(res);
  };
}
