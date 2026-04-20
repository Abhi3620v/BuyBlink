import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import {
  createProductHandler,
  deleteProductHandler,
  getLandingHighlightsHandler,
  getProductByIdHandler,
  listProductsHandler,
  updateProductHandler,
} from "./product.controller.js";
import {
  createProductSchema,
  landingHighlightsSchema,
  listProductsSchema,
  productIdParamSchema,
  updateProductSchema,
} from "./product.validation.js";

const router = Router();

router.get("/landing/highlights", validate(landingHighlightsSchema), getLandingHighlightsHandler);
router.get("/", validate(listProductsSchema), listProductsHandler);
router.get("/:productId", validate(productIdParamSchema), getProductByIdHandler);
router.post("/", authenticate, authorize("SELLER"), validate(createProductSchema), createProductHandler);
router.patch(
  "/:productId",
  authenticate,
  authorize("SELLER"),
  validate(updateProductSchema),
  updateProductHandler,
);
router.delete(
  "/:productId",
  authenticate,
  authorize("SELLER"),
  validate(productIdParamSchema),
  deleteProductHandler,
);

export default router;
