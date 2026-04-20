import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import {
  addCartItemHandler,
  clearCartItemsHandler,
  deleteCartItemHandler,
  getCartItemsHandler,
  mergeCartItemsHandler,
  updateCartItemQuantityHandler,
} from "./cart.controller.js";
import {
  addCartItemSchema,
  deleteCartItemSchema,
  getCartSchema,
  mergeCartSchema,
  updateCartItemSchema,
} from "./cart.validation.js";

const router = Router();

router.use(authenticate, authorize("CUSTOMER"));

router.get("/", validate(getCartSchema), getCartItemsHandler);
router.post("/sync", validate(mergeCartSchema), mergeCartItemsHandler);
router.post("/items", validate(addCartItemSchema), addCartItemHandler);
router.patch("/items/:productId", validate(updateCartItemSchema), updateCartItemQuantityHandler);
router.delete("/items/:productId", validate(deleteCartItemSchema), deleteCartItemHandler);
router.delete("/", validate(getCartSchema), clearCartItemsHandler);

export default router;
