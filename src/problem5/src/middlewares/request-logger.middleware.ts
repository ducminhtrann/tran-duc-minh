import { Request, Response, NextFunction } from "express";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();
  const time = new Date().toISOString();

  console.log(`[${time}][${req.method}] ${req.originalUrl}`);
  if (req?.body && Object.keys(req.body)?.length) {
    console.log("Body:", JSON.stringify(req.body));
  }

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${time}][${res.statusCode}] ${req.originalUrl} - ${duration}ms`
    );
  });

  next();
};
