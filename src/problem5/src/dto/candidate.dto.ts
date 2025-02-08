import { ICandidate } from "../interfaces";

export class CreateCandidateDto implements ICandidate {
  code: string;
  expected_salary: string;
  name: string;
  offer_salary: string;
  position: string;
  yoe: number;

  constructor(data?: Partial<CreateCandidateDto>) {
    this.code = data.code;
    this.expected_salary = data?.expected_salary;
    this.name = data?.name;
    this.offer_salary = data?.offer_salary;
    this.position = data.position;
    if (Number(data?.yoe) && data.yoe > 1) {
      this.yoe = data.yoe;
    } else {
      this.yoe = 1;
    }
  }
}

export class UpdateCandidateDto implements ICandidate {
  code: string;
  expected_salary: string;
  name: string;
  offer_salary: string;
  position: string;
  yoe: number;

  constructor(data?: Partial<UpdateCandidateDto>) {
    this.expected_salary = data?.expected_salary;
    this.name = data?.name;
    this.offer_salary = data?.offer_salary;
    this.position = data.position;
    this.yoe = data.yoe;
  }
}

export class QueryCandidateDto {
  page: number;
  per_page: number;
  name: string;
  code: string;
  yoe: number;
}
