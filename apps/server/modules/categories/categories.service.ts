import type { Categories } from "@repo/db";
import { BaseService } from "../service";

export class CategoriesService extends BaseService<Categories, "categories"> {
  constructor() {
    super("categories");
  }

  findAll = async () => {
    return await this.db[this.model].findMany({
      where: {},
      include: {
        children: true,
      },
    });
  };
}
