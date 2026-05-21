import { Request, Response } from "express";
import FilterPointsUseCase from "../use-cases/FilterPointsUseCase";
import CreatePointUseCase from "../use-cases/CreatePointUseCase";
import GetPointDetailsUseCase from "../use-cases/GetPointDetailsUseCase";
import { filterPointsSchema, createPointSchema } from "../validation/pointSchemas";

class PointsController {
  async index(request: Request, response: Response) {
    const result = filterPointsSchema.safeParse(request.query);

    if (!result.success) {
      return response.status(400).json({ error: result.error.format() });
    }

    const { city, uf, items } = result.data;

    const points = await FilterPointsUseCase.execute({ city, uf, items });

    return response.json(points);
  }

  async create(request: Request, response: Response) {
    const result = createPointSchema.safeParse(request.body);

    if (!result.success) {
      return response.status(400).json({ error: result.error.format() });
    }

    const point = await CreatePointUseCase.execute(result.data);

    return response.status(201).json(point);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const result = await GetPointDetailsUseCase.execute(id);

    if (!result) {
      return response.status(400).json({ message: "Point not found." });
    }

    return response.json(result);
  }
}

export default new PointsController();
