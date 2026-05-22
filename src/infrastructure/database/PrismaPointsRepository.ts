import prisma from "./prisma";
import { IPointsRepository } from "../../domain/repositories/IPointsRepository";
import { Point } from "../../domain/entities/Point";

export class PrismaPointsRepository implements IPointsRepository {
  async create(pointData: Omit<Point, "id">, itemIds: number[]): Promise<Point> {
    const point = await prisma.$transaction(async (tx) => {
      const createdPoint = await tx.point.create({
        data: {
          ...pointData,
        },
      });

      const pointItems = itemIds.map((item_id) => ({
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

  async findByFilters(city: string, uf: string, itemIds: number[]): Promise<Point[]> {
    const points = await prisma.point.findMany({
      where: {
        city,
        uf,
        items: {
          some: {
            item_id: {
              in: itemIds,
            },
          },
        },
      },
    });

    return points;
  }

  async findById(id: string): Promise<{ point: Point; itemTitles: string[] } | null> {
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

    const itemTitles = point.items.map((item) => item.item.title);

    return {
      point: {
        ...point,
      },
      itemTitles,
    };
  }
}
