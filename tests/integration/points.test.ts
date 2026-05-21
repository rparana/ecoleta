import request from "supertest";
import app from "../../src/app";
import prisma from "../../src/infrastructure/database";

describe("Points", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should be able to filter points", async () => {
    const response = await request(app).get("/points").query({
      city: "Curitiba",
      uf: "PR",
      items: "1,2",
    });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should be able to create a new point", async () => {
    const response = await request(app).post("/points").send({
      name: "Test Point",
      email: "test@example.com",
      whatsapp: "123456789",
      latitude: -46.54,
      longitude: -23.56,
      city: "Curitiba",
      uf: "PR",
      items: [1, 2],
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should not be able to create a new point with invalid data", async () => {
    const response = await request(app).post("/points").send({
      name: "Test Point",
    });

    expect(response.status).toBe(400);
  });

  it("should be able to show a specific point", async () => {
    const createResponse = await request(app).post("/points").send({
      name: "Detail Point",
      email: "detail@example.com",
      whatsapp: "123456789",
      latitude: -46.54,
      longitude: -23.56,
      city: "Curitiba",
      uf: "PR",
      items: [1, 2],
    });

    const pointId = createResponse.body.id;

    const response = await request(app).get(`/points/${pointId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("point");
    expect(response.body).toHaveProperty("items");
    expect(response.body.point.name).toBe("Detail Point");
  });

  it("should not be able to show a non-existent point", async () => {
    const response = await request(app).get("/points/non-existent-id");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Point not found.");
  });
});
