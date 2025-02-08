import { FilterQuery } from "mongoose";
import {
  CreateCandidateDto,
  QueryCandidateDto,
  UpdateCandidateDto,
} from "../dto";
import { ENUM_HTTP_STATUS } from "../enums";
import { HttpException } from "../exceptions";
import { ICandidate } from "../interfaces";
import { candidateModel } from "../models";
import { toObjectId } from "../utils";

export class CandidateService {
  private candidates = candidateModel;

  public async findAll(
    query: QueryCandidateDto
  ): Promise<{ data: ICandidate[]; total: number }> {
    const { skip, limit, filter } = this.makeQuery(query);
    const [data, total] = await Promise.all([
      this.candidates.find(
        filter,
        {},
        { skip, limit, lean: true, sort: { created_at: -1 } }
      ),
      this.candidates.countDocuments(filter),
    ]);
    return { data, total };
  }

  public async create(dto: CreateCandidateDto): Promise<ICandidate> {
    await this.checkDuplicateCode(dto.code);
    const candidate = await this.candidates.create(new CreateCandidateDto(dto));
    return candidate;
  }

  public async details(id: string) {
    return this.candidates.findById(toObjectId(id));
  }

  public async update(id: string, body: UpdateCandidateDto) {
    const candidate = await this.checkExists(id);
    const update = new UpdateCandidateDto({
      ...candidate,
      ...body,
    });
    await this.candidates.findByIdAndUpdate(candidate._id, update);
    return this.details(id);
  }

  public async delete(id: string) {
    await this.candidates.findByIdAndDelete(id);
  }

  private makeQuery(query: QueryCandidateDto) {
    const { page = 1, per_page = 5, code = "", name = "", yoe = "" } = query;
    const skip = (page - 1) * per_page;
    const filter: FilterQuery<ICandidate> = {};
    if (code) {
      filter.code = code;
    }
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }
    if (yoe) {
      filter.yoe = Number(yoe) || -1;
    }
    return { skip, limit: per_page, filter };
  }

  private async checkExists(id: string): Promise<ICandidate> {
    const candidate = await this.candidates.findById(
      toObjectId(id),
      {},
      { lean: true }
    );
    if (!candidate) {
      throw new HttpException(
        ENUM_HTTP_STATUS.BAD_REQUEST,
        "Candidate not found"
      );
    }
    return candidate;
  }

  private async checkDuplicateCode(code: string) {
    const candidate = await this.candidates.findOne({ code });
    if (candidate) {
      throw new HttpException(ENUM_HTTP_STATUS.BAD_REQUEST, "Duplicate code");
    }
  }
}
