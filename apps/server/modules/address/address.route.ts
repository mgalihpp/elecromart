import { Router } from "express";
import { authenticateMiddleware } from "@/middleware/authenticated";
import { AddressController } from "./address.controller";

const addressRouter = Router();
const addressController = new AddressController();
/**
 * @swagger
 * tags:
 *   name: Address
 *   description: Address management endpoints
 */

addressRouter.get("/", authenticateMiddleware, addressController.getAll);
addressRouter.post("/", authenticateMiddleware, addressController.create);
addressRouter.put("/:id", authenticateMiddleware, addressController.update);
addressRouter.delete("/:id", authenticateMiddleware, addressController.delete);

export { addressRouter };
