import { body } from "express-validator";

export const createUrlValidation = [
  body("originalUrl")
    .isURL().withMessage("Invalid URL format")
    .notEmpty().withMessage("Original URL is required"),

  body("private")
    .isBoolean().withMessage("Private must be a boolean")
    .notEmpty().withMessage("Private field is required"),

  body("password")
    .if(body("private").equals("true"))
    .notEmpty().withMessage("Password is required when private is true")
    .isString().withMessage("Password must be a string"),

    body("confirmPassword")
    .if(body("private").equals("true"))
    .notEmpty().withMessage("Confirm Password is required when private is true")
    .isString().withMessage("Confirm Password must be a string")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password must match Password");
      }
      return true;
    }),
];
