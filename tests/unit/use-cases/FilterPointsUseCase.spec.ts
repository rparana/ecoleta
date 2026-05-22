import { FilterPointsUseCase } from "../../../src/use-cases/list-points/FilterPointsUseCase";
import { IPointsRepository } from "../../../src/domain/repositories/IPointsRepository";

describe("FilterPointsUseCase", () => {
  it("should be able to filter collection points", async () => {
    // Given: A mocked repository and search criteria
    const mockPoints = [
      { id: "1", name: "Point 1", city: "Curitiba", uf: "PR" } as any,
    ];
    const mockRepository: IPointsRepository = {
      findByFilters: jest.fn().mockResolvedValue(mockPoints),
      create: jest.fn(),
      findById: jest.fn(),
    };
    const filterPointsUseCase = new FilterPointsUseCase(mockRepository);

    // When: Searching for points with specific filters
    const result = await filterPointsUseCase.execute({
      city: "Curitiba",
      uf: "PR",
      items: [1],
    });

    // Then: Returns the points matching the criteria
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Point 1");
    expect(mockRepository.findByFilters).toHaveBeenCalledWith("Curitiba", "PR", [1]);
  });
});
