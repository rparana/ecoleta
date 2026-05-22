import { IItemsRepository } from "../../domain/repositories/IItemsRepository";
import { config } from "../../infrastructure/config/config";

export class ListItemsUseCase {
  constructor(private itemsRepository: IItemsRepository) {}

  async execute() {
    const items = await this.itemsRepository.findAll();

    const serializedItems = items.map((item) => {
      return {
        ...item,
        image_url: config.resolveImageUrl(item.image),
      };
    });

    return serializedItems;
  }
}
