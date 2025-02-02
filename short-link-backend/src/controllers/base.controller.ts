import { Response } from "express";
export default abstract class BaseController {

  protected sendSuccess<T>(
    res: Response,
    data: T,
    message = "Success",
    statusCode = 200
  ) {
    return res.status(statusCode).json({ success: true, message, data });
  }

  protected sendError(res: Response, error: any) {
    return res.status(error?.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
