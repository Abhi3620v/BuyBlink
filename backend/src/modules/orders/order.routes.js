import { Router } from "express";
import {
  authenticate,
  authorize,
  tryAuthenticate,
} from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import {
  cancelCustomerOrderHandler,
  createOrderHandler,
  getOrderHistoryHandler,
  getOrderByIdHandler,
  getSellerOrdersHandler,
  getUserOrdersHandler,
  updateSellerOrderItemStatusHandler,
} from "./order.controller.js";
import {
  cancelCustomerOrderSchema,
  createOrderSchema,
  getOrderByIdPublicSchema,
  getOrderHistorySchema,
  updateSellerOrderStatusSchema,
} from "./order.validation.js";

const router = Router();

router.post("/", tryAuthenticate, validate(createOrderSchema), createOrderHandler);
router.get("/history", tryAuthenticate, validate(getOrderHistorySchema), getOrderHistoryHandler);
router.get("/my", authenticate, getUserOrdersHandler);
router.get("/seller", authenticate, authorize("SELLER"), getSellerOrdersHandler);
router.post(
  "/:orderId/cancel",
  authenticate,
  authorize("CUSTOMER"),
  validate(cancelCustomerOrderSchema),
  cancelCustomerOrderHandler,
);
router.get("/:orderId", tryAuthenticate, validate(getOrderByIdPublicSchema), getOrderByIdHandler);
router.patch(
  "/:orderId/items/status",
  authenticate,
  authorize("SELLER"),
  validate(updateSellerOrderStatusSchema),
  updateSellerOrderItemStatusHandler,
);

export default router;
