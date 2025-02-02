import supertest from "supertest";
import app from "../src/app"; 

const basePath = "/api/v1";

describe("Public Shortlink API", () => {
  let shortUrl: string;

  beforeEach(async () => {
    const response = await supertest(app)
      .post(`${basePath}/create`)
      .send({ originalUrl: "https://example.com", private: false });

    shortUrl = response.body.data.shortUrl;
  });

  it("should create a public shortlink", async () => {
    const response = await supertest(app)
      .post(`${basePath}/create`)
      .send({ originalUrl: "https://test.com", private: false });

    expect(response.body.data.shortUrl).toBeDefined();
    expect(response.body.success).toBe(true);
    expect(response.status).toBe(200);
  });

  it("should retrieve public shortlink info", async () => {
    const response = await supertest(app).get(`${basePath}/info/${shortUrl}`);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data.private).toBe(false);
    expect(response.body.data.shortUrl).toBe(shortUrl);
    expect(response.body.data.clicks).toBe(0);
    expect(response.status).toBe(200);
  });

  it("should retrieve a public shortlink", async () => {
    const response = await supertest(app).get(`${basePath}/find/${shortUrl}`);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data.private).toBe(false);
    expect(response.body.data.originalUrl).toBe("https://example.com");
    expect(response.status).toBe(200);
  });

  it("should return 404 for non-existing shortlink", async () => {
    const response = await supertest(app).get(`${basePath}/find/nonexistent123`);
    
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("URL not found");
    expect(response.status).toBe(404);
  });

  it("should return error for invalid URL", async () => {
    const response = await supertest(app)
      .post(`${basePath}/create`)
      .send({ originalUrl: "invalid-url", private: false });

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid URL format");
    expect(response.status).toBe(400);
  });
});
