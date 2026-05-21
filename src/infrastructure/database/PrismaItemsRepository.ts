import prisma from "./prisma";
import { IItemsRepository } from "../../domain/repositories/IItemsRepository";
import { Item } from "../../domain/entities/Item";

export class PrismaItemsRepository implements IItemsRepository {
  async findAll(): Promise<Item[]> {
    const items = await prisma.item.findMany();
    return items;
  }
}
