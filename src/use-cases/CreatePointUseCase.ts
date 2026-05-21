import prisma from "../infrastructure/database";

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

class CreatePointUseCase {
  async execute(data: CreatePointRequest) {
    const { items, ...pointData } = data;

    const point = await prisma.$transaction(async (tx) => {
      const createdPoint = await tx.point.create({
        data: {
          ...pointData,
          image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80",
        },
      });

      const pointItems = items.map((item_id) => ({
        point_id: createdPoint.id,
        item_id,
      }));

      await tx.pointItem.createMany({
        data: pointItems,
      });

      return createdPoint;
    });

    return point;
  }
}

export default new CreatePointUseCase();
