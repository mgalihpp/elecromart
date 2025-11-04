import type { Prisma, Product } from "@repo/db";
import type {
  CreateProductImagesInput,
  UpdateProductInput,
} from "@repo/schema/productSchema";
import { AppError } from "@/utils/appError";
import { BaseService } from "../service";

export class ProductService extends BaseService<Product, "product"> {
  constructor() {
    super("product");
  }

  findAll = async (options?: Prisma.ProductFindManyArgs) => {
    return await this.db[this.model].findMany(options);
  };

  findById = async (id: string) => {
    return await this.db[this.model].findUnique({
      where: {
        id,
      },
      include: {
        product_images: true,
        product_variants: { include: { inventory: true } },
        reviews: true,
      },
    });
  };

  async update(id: string, data: UpdateProductInput) {
    // Cek apakah productnya ada
    const product = await this.db[this.model].findFirst({
      where: {
        id,
      },
    });

    if (!product) {
      throw AppError.notFound();
    }

    // Memperbaharui data produk
    const updatedProduct = await this.db[this.model].update({
      where: {
        id,
      },
      data,
    });

    return updatedProduct;
  }

  async createImages(data: CreateProductImagesInput) {
    return await this.db.productImages.createMany({
      data: data.map((image) => ({
        ...image,
      })),
    });
  }

  async deleteImage(imageId: number) {
    return await this.db.productImages.delete({
      where: {
        id: imageId,
      },
    });
  }
}
