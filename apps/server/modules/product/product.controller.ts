import type { Prisma, Product } from "@repo/db";
import {
  createProductSchema,
  listProductsQuery,
  productIdParams,
  updateProductSchema,
} from "@repo/schema/productSchema";
import type { Request, Response } from "express";
import { asyncHandler } from "@/middleware/asyncHandler";
import { AppResponse } from "@/utils/appResponse";
import { BaseController } from "../controller";
import { ProductService } from "./product.service";

export class ProductController extends BaseController<Product, ProductService> {
  constructor() {
    super(new ProductService());
  }

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const q = listProductsQuery.parse(req.query);
    const where: Prisma.ProductWhereInput = {};

    if (q.category) where.category = { slug: q.category };
    if (q.q)
      where.OR = [
        {
          title: {
            contains: q.q,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: q.q,
            mode: "insensitive",
          },
        },
      ];

    const page = Number(q.page || 1);
    const limit = Math.min(Number(q.limit || 12), 100);

    const products = await this.service.findAll({
      where,
      include: {
        product_images: true,
        product_variants: {
          include: {
            inventory: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    new AppResponse({
      res,
      data: products,
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = productIdParams.parse(req.params);
    const product = await this.service.findById(id);

    new AppResponse({
      res,
      data: product,
    });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const data = createProductSchema.parse(req.body);
    const newProduct = await this.service.create(data);

    new AppResponse({
      res,
      data: newProduct,
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = productIdParams.parse(req.params);
    const data = updateProductSchema.parse(req.body);

    const updatedProduct = await this.service.update(id, data);

    new AppResponse({
      res,
      data: updatedProduct,
    });
  });
}
