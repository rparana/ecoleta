import { Item } from "../entities/Item";

export interface IItemsRepository {
  findAll(): Promise<Item[]>;
}
