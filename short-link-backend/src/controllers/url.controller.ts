import BaseController from "./base.controller";
import { Request, Response } from "express";
import { UrlService } from "../services/url.service";
import { autoInjectable } from "tsyringe";
import { IUrl } from "../models/url.model";
import { ShortUrlDTO } from "../dtos/shortUrl.output";

@autoInjectable()
export class UrlController extends BaseController {
  constructor(private readonly _urlService: UrlService) {
    super();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { body } = req;
      const data = await this._urlService.create(body);
      this.sendSuccess(res, {shortUrl: data.shortUrl});
    } catch (error) {
      this.sendError(res, error);
    }
  }

  async setPassword(req: Request, res: Response): Promise<void> {
    try {
      const { body } = req;
      const data = await this._urlService.setPassword(body);
      this.sendSuccess(res, {originalUrl: data.originalUrl});
    } catch (error) {
      this.sendError(res, error);
    }
  }

  async getInfo(req: Request, res: Response): Promise<void> {
    try {
      const data: IUrl = await this._urlService.getInfo(req.params.shortUrl);
      this.sendSuccess(res, data as ShortUrlDTO);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const data: IUrl = await this._urlService.findOne(req.params.shortUrl);
      if (data.private) {
        this.sendSuccess(res, {
          shortUrl: data.shortUrl,
          private: data.private,
        });
      } else {
        this.sendSuccess(res, {
          originalUrl: data.originalUrl,
          private: data.private,
        });
      }
    } catch (error) {
      this.sendError(res, error);
    }
  }
}
