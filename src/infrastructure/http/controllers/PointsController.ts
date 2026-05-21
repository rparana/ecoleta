import { Request, Response } from "express";
import { FilterPointsUseCase } from "../../../use-cases/list-points/FilterPointsUseCase";
import { CreatePointUseCase } from "../../../use-cases/create-point/CreatePointUseCase";
import { GetPointDetailsUseCase } from "../../../use-cases/get-point/GetPointDetailsUseCase";
import { filterPointsSchema, createPointSchema } from "../../../validation/pointSchemas";

export class PointsController {
  constructor(
    private filterPointsUseCase: FilterPointsUseCase,
    private createPointUseCase: CreatePointUseCase,
    private getPointDetailsUseCase: GetPointDetailsUseCase,
  ) {}

  async index(request: Request, response: Response) {
    const result = filterPointsSchema.safeParse(request.query);

    if (!result.success) {
      return response.status(400).json({ error: result.error.format() });
    }

    const { city, uf, items } = result.data;

    const points = await this.filterPointsUseCase.execute({ city, uf, items });

    return response.json(points);
  }

  async create(request: Request, response: Response) {
    const result = createPointSchema.safeParse(request.body);

    if (!result.success) {
      return response.status(400).json({ error: result.error.format() });
    }

    const point = await this.createPointUseCase.execute(result.data);

    return response.status(201).json(point);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const result = await this.getPointDetailsUseCase.execute(id);

    if (!result) {
      return response.status(400).json({ message: "Point not found." });
    }

    return response.json(result);
  }
}
