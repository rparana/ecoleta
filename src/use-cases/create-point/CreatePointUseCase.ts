import { IPointsRepository } from "../../domain/repositories/IPointsRepository";

interface CreatePointRequest {
  name: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  items: number[];
}

export class CreatePointUseCase {
  constructor(private pointsRepository: IPointsRepository) {}

  async execute(data: CreatePointRequest) {
    const { items, ...pointData } = data;

    const point = await this.pointsRepository.create(
      {
        ...pointData,
        image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80",
      },
      items
    );

    return point;
  }
}
