import { Request, Response } from "express";
import ListItemsUseCase from "../use-cases/ListItemsUseCase";

class ItemsController {
  async index(_request: Request, response: Response) {
    const items = await ListItemsUseCase.execute();
    return response.json(items);
  }
}

export default new ItemsController();
