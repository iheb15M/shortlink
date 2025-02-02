import { injectable } from "tsyringe";
import { createHmac, randomBytes } from "crypto";

@injectable()
export class UtilService {
  hashPassword(password: string): {
    hashedPassword: string;
    salt: string;
  } {
    const salt = randomBytes(16).toString("hex");
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return { hashedPassword, salt };
  }

  verifyPassword(
    password: string,
    hashedPassword: string,
    salt: string
  ): boolean {
    const hashToCompare = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashToCompare === hashedPassword;
  }

  generateUniqueID(length: number = 8): string {
    return randomBytes(length).toString("base64").slice(0, length);
  }
}
