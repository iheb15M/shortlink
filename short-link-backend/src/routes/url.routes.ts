import { Request, Response, Router } from "express";
import { container } from "tsyringe";
import { UrlController } from "../controllers/url.controller";
import { createUrlValidation } from "../middleware/createUrl.middleware";
import { handleValidationErrors } from "../middleware/handleValidation.middleware";

const router = Router();

const urlController = container.resolve(UrlController);

/**
 * @swagger
 * /api/v1/find/{shortUrl}:
 *   get:
 *     summary: Find a URL by its short URL.
 *     description: Returns the original URL if the link is public; otherwise, returns the short URL with a private flag set to true.
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         required: true
 *         schema:
 *           type: string
 *         description: The short URL to look up.
 *     responses:
 *       200:
 *         description: The original URL if public or the short URL with private flag if private.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: The original URL or the short URL.
 *                 private:
 *                   type: boolean
 *                   description: Indicates if the URL is private.
 *       404:
 *         description: URL not found.
 */
router.get("/find/:shortUrl", (req, res) => urlController.findOne(req, res));

/**
 * @swagger
 * /api/v1/info/{shortUrl}:
 *   get:
 *     summary: Get information about a short URL.
 *     description: Returns the short URL along with a flag indicating whether it is private and the number of clicks on that short URL.
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         required: true
 *         schema:
 *           type: string
 *         description: The short URL to get information about.
 *     responses:
 *       200:
 *         description: Information about the short URL.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortUrl:
 *                   type: string
 *                   description: The short URL.
 *                 private:
 *                   type: boolean
 *                   description: Indicates if the URL is private.
 *                 clicks:
 *                   type: integer
 *                   description: The number of clicks on the short URL.
 *       404:
 *         description: The short URL was not found.
 */
router.get("/info/:shortUrl", (req, res) => urlController.getInfo(req, res));

/**
 * @swagger
 * /api/v1/create:
 *   post:
 *     summary: Create a new short URL.
 *     description: Validates the original URL and creates a short URL. If the URL is private, both password and confirmation are required and must match.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 description: The original URL to shorten.
 *               isPrivate:
 *                 type: boolean
 *                 description: Indicates if the short URL should be private.
 *               password:
 *                 type: string
 *                 description: The password for a private URL (required if isPrivate is true).
 *               confirmPassword:
 *                 type: string
 *                 description: The password confirmation for a private URL (must match password).
 *     responses:
 *       200:
 *         description: The short URL was successfully created.
 *       400:
 *         description: Invalid input, validation error, or passwords do not match.
 */
router.post(
  "/create",
  createUrlValidation,
  handleValidationErrors,
  (req: Request, res: Response) => urlController.create(req, res)
);

/**
 * @swagger
 * /api/v1/setPassword:
 *   post:
 *     summary: Set a password for a private short URL.
 *     description: Checks if the password for a private link is correct and returns the original URL. If the password is incorrect, it returns an error 401.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shortUrl:
 *                 type: string
 *                 description: The short URL to protect.
 *               password:
 *                 type: string
 *                 description: The password to validate for the short URL.
 *     responses:
 *       200:
 *         description: The original URL if the password is correct.
 *       401:
 *         description: Unauthorized, invalid password.
 */
router.post("/setPassword", (req, res) => urlController.setPassword(req, res));


export default router;