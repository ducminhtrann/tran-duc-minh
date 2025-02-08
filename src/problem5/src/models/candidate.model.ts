import { model, Schema, Document } from "mongoose";
import { ICandidate } from "../interfaces";

const modelName = "Candidate";
const schema: Schema = new Schema<ICandidate>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    position: {
      type: String,
      required: true,
    },
    expected_salary: {
      type: String,
      required: true,
    },
    offer_salary: {
      type: String,
      required: true,
    },
    yoe: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export const candidateModel = model<ICandidate & Document>(modelName, schema);
