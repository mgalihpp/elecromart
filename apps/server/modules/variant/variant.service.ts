import type { ProductVariants } from "@repo/db";
import type {
  CreateVariantInput,
  UpdateVariantInput,
} from "@repo/schema/productSchema";
import { AppError } from "@/utils/appError";
import { InventoryService } from "../inventory/inventory.service";
import { BaseService } from "../service";

export class ProductVariantsService extends BaseService<
  ProductVariants,
  "productVariants"
> {
  inventoryService: InventoryService;

  constructor() {
    super("productVariants");
    this.inventoryService = new InventoryService();
  }

  async create(data: CreateVariantInput) {
    const {
      sku,
      product_id,
      additional_price_cents,
      option_values,
      stock_quantity,
      reserved_quantity,
      safety_stock,
    } = data;

    const createdVariant = await this.db[this.model].create({
      data: {
        additional_price_cents,
        sku,
        option_values,
        product: {
          connect: {
            id: product_id,
          },
        },
      },
    });

    const createdInventory = await this.inventoryService.createOrUpdate(
      createdVariant.id,
      {
        stock_quantity: stock_quantity ?? 0,
        reserved_quantity: reserved_quantity ?? 0,
        safety_stock: safety_stock ?? 0,
      }
    );

    return { variant: createdVariant, inventory: createdInventory };
  }

  async createMany(data: CreateVariantInput[]) {
    const createdVariants = await Promise.all(
      data.map(async (item) => {
        const createdVariant = await this.db[this.model].create({
          data: {
            sku: item.sku,
            additional_price_cents: item.additional_price_cents ?? 0,
            option_values: item.option_values,
            product: {
              connect: { id: item.product_id },
            },
          },
        });

        // buat inventory-nya langsung setelah variant dibuat
        await this.inventoryService.createOrUpdate(createdVariant.id, {
          stock_quantity: item.stock_quantity ?? 0,
          reserved_quantity: item.reserved_quantity ?? 0,
          safety_stock: item.safety_stock ?? 0,
        });

        return createdVariant;
      })
    );

    return createdVariants;
  }

  async update(id: string, data: UpdateVariantInput) {
    //Cek apakah ada variant
    const variant = await this.db[this.model].findFirst({
      where: { id },
    });

    if (!variant) {
      throw AppError.notFound();
    }

    const updatedVariant = await this.db[this.model].update({
      where: {
        id,
      },
      data: {
        sku: data.sku,
        additional_price_cents: data.additional_price_cents ?? 0,
        option_values: data.option_values,
      },
    });

    await this.inventoryService.createOrUpdate(updatedVariant.id, {
      stock_quantity: data.stock_quantity ?? 0,
      reserved_quantity: data.reserved_quantity ?? 0,
      safety_stock: data.safety_stock ?? 0,
    });

    return updatedVariant;
  }

  async delete(id: string) {
    const existingVariant = await this.db[this.model].findFirst({
      where: {
        id,
      },
    });

    if (!existingVariant) {
      throw AppError.notFound();
    }

    // Deleting inventory
    const deletedVariantInventory = await this.db[this.model].delete({
      where: {
        id: existingVariant.id,
      },
    });

    return deletedVariantInventory;
  }
}
