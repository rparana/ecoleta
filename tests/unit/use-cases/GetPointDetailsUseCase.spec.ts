import { GetPointDetailsUseCase } from "../../../src/use-cases/get-point/GetPointDetailsUseCase";
import { IPointsRepository } from "../../../src/domain/repositories/IPointsRepository";

describe("GetPointDetailsUseCase", () => {
  it("should be able to get a specific point details", async () => {
    // Given: An existing point ID and its associated items
    const pointId = "uuid-123";
    const mockDetails = {
      point: { id: pointId, name: "Detail Point" } as any,
      itemTitles: ["Lâmpadas"],
    };
    const mockRepository: IPointsRepository = {
      findById: jest.fn().mockResolvedValue(mockDetails),
      create: jest.fn(),
      findByFilters: jest.fn(),
    };
    const getPointDetailsUseCase = new GetPointDetailsUseCase(mockRepository);

    // When: Requesting details for the point
    const result = await getPointDetailsUseCase.execute(pointId);

    // Then: Returns the point profile and associate item titles
    expect(result).not.toBeNull();
    expect(result?.point.name).toBe("Detail Point");
    expect(result?.items).toEqual([{ title: "Lâmpadas" }]);
  });

  it("should return null when the point is not found", async () => {
    // Given: A non-existent point ID
    const mockRepository: IPointsRepository = {
      findById: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
      findByFilters: jest.fn(),
    };
    const getPointDetailsUseCase = new GetPointDetailsUseCase(mockRepository);

    // When: Processing the request
    const result = await getPointDetailsUseCase.execute("invalid-id");

    // Then: MUST return null
    expect(result).toBeNull();
  });
});
