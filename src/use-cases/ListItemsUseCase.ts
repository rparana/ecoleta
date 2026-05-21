import prisma from "../infrastructure/database";
import { config } from "../infrastructure/config";

class ListItemsUseCase {
  async execute() {
    const items = await prisma.item.findMany();

    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: config.resolveImageUrl(item.image),
      };
    });

    return serializedItems;
  }
}

export default new ListItemsUseCase();
