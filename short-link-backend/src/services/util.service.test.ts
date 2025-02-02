import { UtilService } from "./util.service";

describe("UtilService", () => {
  let utilService: UtilService;

  beforeEach(() => {
    utilService = new UtilService();
  });

  describe("hashPassword", () => {
    it("should generate a hashed password and salt", () => {
      const password = "mySecurePassword";
      const { hashedPassword, salt } = utilService.hashPassword(password);

      expect(hashedPassword).toBeDefined();
      expect(salt).toBeDefined();
      expect(hashedPassword).not.toBe(password);
    });
  });

  describe("verifyPassword", () => {
    it("should return true for correct password", () => {
      const password = "securePass";
      const { hashedPassword, salt } = utilService.hashPassword(password);

      const isValid = utilService.verifyPassword(password, hashedPassword, salt);

      expect(isValid).toBe(true);
    });

    it("should return false for incorrect password", () => {
      const password = "securePass";
      const wrongPassword = "wrongPass";
      const { hashedPassword, salt } = utilService.hashPassword(password);

      const isValid = utilService.verifyPassword(wrongPassword, hashedPassword, salt);

      expect(isValid).toBe(false);
    });
  });

  describe("generateUniqueID", () => {
    it("should generate a unique ID of specified length", () => {
      const length = 8;
      const id = utilService.generateUniqueID(length);

      expect(id).toHaveLength(length);
    });

    it("should generate different IDs for multiple calls", () => {
      const id1 = utilService.generateUniqueID();
      const id2 = utilService.generateUniqueID();

      expect(id1).not.toBe(id2);
    });
  });
});
