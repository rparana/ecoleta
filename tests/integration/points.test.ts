import request from "supertest";
import app from "../../src/infrastructure/http/app";
import prisma from "../../src/infrastructure/database/prisma";

describe("Points Integration", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should be able to create a new point", async () => {
    // Given: A set of valid registration data
    const pointData = {
      name: "BDD Point",
      email: "bdd@example.com",
      whatsapp: "123456789",
      latitude: -46.54,
      longitude: -23.56,
      city: "Curitiba",
      uf: "PR",
      items: [1, 2],
    };

    // When: The registration request is submitted
    const response = await request(app).post("/points").send(pointData);

    // Then: The system MUST persist the point in a single atomic transaction and return 201 Created
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("BDD Point");
  });

  it("should be able to filter points by city, uf and items", async () => {
    // Given: Registered collection points in Curitiba for Baterias
    // (A point is created in the previous test)

    // When: A user searches for points in city "Curitiba", UF "PR", with item IDs 1 and 2
    const response = await request(app).get("/points").query({
      city: "Curitiba",
      uf: "PR",
      items: "1,2",
    });

    // Then: The system MUST return a list of points matching these exact criteria
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should be able to show a specific point details", async () => {
    // Given: An existing collection point ID
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

    // When: A user requests details for this specific ID
    const response = await request(app).get(`/points/${pointId}`);

    // Then: The system MUST return the point's full profile and the list of associated items
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("point");
    expect(response.body).toHaveProperty("items");
    expect(response.body.point.name).toBe("Detail Point");
    expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: "Lâmpadas" }),
      ])
    );
  });

  it("should return a 400 error when the point is not found", async () => {
    // Given: A request for a non-existent point ID
    const invalidId = "non-existent-id";

    // When: The request for details is processed
    const response = await request(app).get(`/points/${invalidId}`);

    // Then: The system MUST return a 400 Bad Request error with the message "Point not found."
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Point not found.");
  });

  it("should return a 400 error when creating a point with invalid data", async () => {
    // Given: A registration request missing required fields
    const invalidData = {
      name: "Invalid Point",
    };

    // When: The request is submitted
    const response = await request(app).post("/points").send(invalidData);

    // Then: The system MUST return a 400 Bad Request error specifying the validation failure
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
