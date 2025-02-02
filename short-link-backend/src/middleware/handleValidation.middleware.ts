import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => { 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: errors.array().map(err => err.msg).join(', ')
    });
    return;
  }
  next();
};
