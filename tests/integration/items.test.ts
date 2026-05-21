import request from "supertest";
import app from "../../src/infrastructure/http/app";

describe("Items Integration", () => {
  it("should be able to list items", async () => {
    // Given: A seeded database with collection items
    
    // When: A user requests the list of all items
    const response = await request(app).get("/items");

    // Then: The system MUST return a 200 OK status and a list of items with resolved image URLs
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Lâmpadas",
          image_url: expect.stringContaining("http://localhost:3333/uploads/lampadas.svg"),
        }),
      ])
    );
  });
});
