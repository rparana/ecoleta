import request from "supertest";
import app from "../../src/app";

describe("Items", () => {
  it("should be able to list items", async () => {
    const response = await request(app).get("/items");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Lâmpadas",
        }),
      ])
    );
  });
});
