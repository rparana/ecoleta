import { IPointsRepository } from "../../domain/repositories/IPointsRepository";

interface FilterPointsRequest {
  city: string;
  uf: string;
  items: number[];
}

export class FilterPointsUseCase {
  constructor(private pointsRepository: IPointsRepository) {}

  async execute({ city, uf, items }: FilterPointsRequest) {
    const points = await this.pointsRepository.findByFilters(city, uf, items);
    return points;
  }
}
