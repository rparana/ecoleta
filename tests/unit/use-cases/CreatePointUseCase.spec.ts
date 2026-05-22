import { CreatePointUseCase } from "../../../src/use-cases/create-point/CreatePointUseCase";
import { IPointsRepository } from "../../../src/domain/repositories/IPointsRepository";

describe("CreatePointUseCase", () => {
  it("should be able to create a new collection point", async () => {
    // Given: Valid point data and a mocked repository
    const pointData = {
      name: "Test Point",
      email: "test@example.com",
      whatsapp: "123456",
      latitude: 0,
      longitude: 0,
      city: "Test City",
      uf: "TS",
      items: [1],
    };
    const mockCreatedPoint = { id: "uuid", ...pointData, image: "any.png" } as any;
    const mockRepository: IPointsRepository = {
      create: jest.fn().mockResolvedValue(mockCreatedPoint),
      findByFilters: jest.fn(),
      findById: jest.fn(),
    };
    const createPointUseCase = new CreatePointUseCase(mockRepository);

    // When: The point is registered
    const result = await createPointUseCase.execute(pointData);

    // Then: MUST persist and return the point with an ID
    expect(result).toHaveProperty("id", "uuid");
    expect(mockRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Test Point" }),
      [1]
    );
  });
});
