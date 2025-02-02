import { autoInjectable } from "tsyringe";
import urlModel, { IUrl } from "../models/url.model";
import { httpError } from "../common/HttpError";
import { UtilService } from "./util.service";

@autoInjectable()
export class UrlService {
  constructor(private readonly _utilService: UtilService) {}

  private async generateUniqueUrl() {
    let shortUrl: string;
    let existingUrl: IUrl | null;
    do {
      shortUrl = this._utilService.generateUniqueID();
      existingUrl = await urlModel.findOne({ shortUrl });
    } while (existingUrl);
    return shortUrl;
  }

  async create(urlData: IUrl): Promise<IUrl> {
    try {
      const shortUrl = await this.generateUniqueUrl();

      if (!urlData.private) {
        const newUrl = new urlModel({ ...urlData, shortUrl });
        await newUrl.save();
        return newUrl;
      }

      const { hashedPassword, salt } = this._utilService.hashPassword(
        urlData.password
      );
      const newUrl = new urlModel({
        ...urlData,
        shortUrl,
        private: true,
        salt,
        password: hashedPassword,
      });

      await newUrl.save();
      return newUrl;
    } catch (error) {
      throw httpError("Failed to create URL", 500);
    }
  }

  async findOne(shortUrl: string): Promise<IUrl> {
    const url = await urlModel.findOne({ shortUrl });
    if (!url) {
      throw httpError("URL not found", 404);
    }
    url.clicks += 1;
    await url.save();
    return url;
  }

  async setPassword(body: any): Promise<IUrl> {
    const url = await urlModel.findOne({ shortUrl: body.shortUrl });
    if (!url) {
      throw httpError("URL not found", 404);
    }

    const correct = this._utilService.verifyPassword(
      body.password,
      url.password,
      url.salt
    );

    if (correct) {
      url.clicks += 1;
      await url.save();
      return url; 
    }
    throw httpError('Wrong Password', 401);

  }

  async getInfo(shortUrl: string): Promise<IUrl> {
    const url = await urlModel
      .findOne({ shortUrl })
      .select("shortUrl clicks private");
    if (!url) {
      throw httpError("URL not found", 404);
    }
    return url;
  }
}
