import { Response } from "express";

type ResponsePayload = {
  data?: unknown;
  total?: number;
  status?: number;
  message?: string;
};

export class BaseController {
  response(res: Response, payload?: ResponsePayload) {
    const status = payload?.status || 200;
    const data = payload?.data || null;
    const message = payload?.message || "success";
    res.status(status).json({
      data,
      status,
      message,
      ...(typeof payload?.total === "number" && { total: payload.total }),
    });
  }
}
