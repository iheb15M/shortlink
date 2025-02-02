import supertest from "supertest";
import app from "../src/app";

const basePath = "/api/v1";

describe("Private Shortlink API", () => {
  let shortUrl: string;

  beforeEach(async () => {
    const response = await supertest(app)
      .post(`${basePath}/create`)
      .send({
        originalUrl: "https://example.com",
        private: true,
        password: "pass",
        confirmPassword: "pass",
      });

    shortUrl = response.body.data.shortUrl;
  });

  it("should create a private shortlink", async () => {
    const response = await supertest(app)
      .post(`${basePath}/create`)
      .send({
        originalUrl: "https://test.com",
        private: true,
        password: "pass",
        confirmPassword: "pass",
      });

    expect(response.body.data.shortUrl).toBeDefined();
    expect(response.body.success).toBe(true);
    expect(response.status).toBe(200);
  });

  it("should retrieve private shortlink info", async () => {
    const response = await supertest(app).get(`${basePath}/info/${shortUrl}`);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data.private).toBe(true);
    expect(response.body.data.shortUrl).toBe(shortUrl);
    expect(response.body.data.clicks).toBe(0);
    expect(response.status).toBe(200);
  });

  it("should retrieve a private shortlink", async () => {
    const response = await supertest(app).get(`${basePath}/find/${shortUrl}`);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data.private).toBe(true);
    expect(response.body.data.shortUrl).toBe(shortUrl);
    expect(response.body.data.originalUrl).toBeUndefined();
    expect(response.status).toBe(200);
  });

  it("should set password of a private shortlink", async () => {
    const response = await supertest(app)
      .post(`${basePath}/setPassword`)
      .send({
        shortUrl,
        password: "pass",
      });

    expect(response.body.data.originalUrl).toBeDefined();
    expect(response.body.success).toBe(true);
    expect(response.status).toBe(200);
  });

  it("should not retrieve private shortlink with incorrect password", async () => {
    const response = await supertest(app)
      .post(`${basePath}/setPassword`)
      .send({
        shortUrl,
        password: "wrongpassword",
      });
  
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Wrong Password");
  });

  
});
