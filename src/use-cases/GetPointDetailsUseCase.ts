import prisma from "../infrastructure/database";

class GetPointDetailsUseCase {
  async execute(id: string) {
    const point = await prisma.point.findUnique({
      where: { id },
      include: {
        items: {
          select: {
            item: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });

    if (!point) {
      return null;
    }

    const items = point.items.map((item) => ({
      title: item.item.title,
    }));

    return {
      point: {
        ...point,
        items: undefined,
      },
      items,
    };
  }
}

export default new GetPointDetailsUseCase();
