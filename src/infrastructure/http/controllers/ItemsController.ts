import { Request, Response } from "express";
import { ListItemsUseCase } from "../../../use-cases/list-items/ListItemsUseCase";

export class ItemsController {
  constructor(private listItemsUseCase: ListItemsUseCase) {}

  async index(_request: Request, response: Response) {
    const items = await this.listItemsUseCase.execute();
    return response.json(items);
  }
}
