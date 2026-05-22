import { IPointsRepository } from "../../domain/repositories/IPointsRepository";

export class GetPointDetailsUseCase {
  constructor(private pointsRepository: IPointsRepository) {}

  async execute(id: string) {
    const result = await this.pointsRepository.findById(id);

    if (!result) {
      return null;
    }

    const { point, itemTitles } = result;

    return {
      point,
      items: itemTitles.map((title) => ({ title })),
    };
  }
}
