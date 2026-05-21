import { Point } from "../entities/Point";

export interface IPointsRepository {
  create(point: Omit<Point, "id">, itemIds: number[]): Promise<Point>;
  findByFilters(city: string, uf: string, itemIds: number[]): Promise<Point[]>;
  findById(id: string): Promise<{ point: Point; itemTitles: string[] } | null>;
}
