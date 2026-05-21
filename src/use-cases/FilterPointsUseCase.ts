import prisma from "../infrastructure/database";

interface FilterPointsRequest {
  city: string;
  uf: string;
  items: number[];
}

class FilterPointsUseCase {
  async execute({ city, uf, items }: FilterPointsRequest) {
    const points = await prisma.point.findMany({
      where: {
        city,
        uf,
        items: {
          some: {
            item_id: {
              in: items,
            },
          },
        },
      },
      include: {
        items: true,
      },
    });

    return points;
  }
}

export default new FilterPointsUseCase();
