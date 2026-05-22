import { ListItemsUseCase } from "../../../src/use-cases/list-items/ListItemsUseCase";
import { IItemsRepository } from "../../../src/domain/repositories/IItemsRepository";

describe("ListItemsUseCase", () => {
  it("should be able to list all collection items", async () => {
    // Given: A mocked repository with items
    const mockItems = [
      { id: 1, title: "Test Item", image: "test.svg" },
    ];
    const mockRepository: IItemsRepository = {
      findAll: jest.fn().mockResolvedValue(mockItems),
    };
    const listItemsUseCase = new ListItemsUseCase(mockRepository);

    // When: The use case is executed
    const result = await listItemsUseCase.execute();

    // Then: Returns items with correctly resolved image URLs
    expect(result).toEqual([
      expect.objectContaining({
        id: 1,
        title: "Test Item",
        image_url: expect.stringContaining("/uploads/test.svg"),
      }),
    ]);
  });
});
