import { Router } from "express";
import { ProductVariantsController } from "../variant/variant.controller";
import { ProductController } from "./product.controller";

const productRouter = Router();
const productController = new ProductController();
const productVariantsController = new ProductVariantsController();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Apparel products (hoodies, t-shirts, etc.)
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: List products
 *     description: Get a paginated list of apparel products.
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/PageQuery'
 *       - $ref: '#/components/parameters/LimitQuery'
 *       - $ref: '#/components/parameters/SearchQuery'
 *       - $ref: '#/components/parameters/CategoryQuery'
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
productRouter.get("/", productController.getAll);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/ProductId'
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
productRouter.get("/:id", productController.getById);

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
productRouter.post("/", productController.create);

productRouter.put("/:id", productController.update);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/ProductId'
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
productRouter.delete("/:id", productController.delete);

/**
 * @swagger
 * /api/v1/products/variant:
 *   post:
 *     summary: Create a product variant
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductVariant'
 *     responses:
 *       201:
 *         description: Variant created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductVariant'
 */
productRouter.post("/variant", productVariantsController.create);

/**
 * @swagger
 * /api/v1/products/variant/{variantId}:
 *   put:
 *     summary: Update a product variant
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/VariantId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductVariant'
 *     responses:
 *       200:
 *         description: Variant updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductVariant'
 *       404:
 *         description: Variant not found
 */
productRouter.put("/variant/:variantId", productVariantsController.update);

productRouter.delete("/variant/:variantId", productVariantsController.delete);

export { productRouter };
