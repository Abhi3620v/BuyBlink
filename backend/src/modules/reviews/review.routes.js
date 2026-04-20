import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import { createReviewHandler, getReviewsByProductIdHandler } from "./review.controller.js";
import {
  createReviewSchema,
  getReviewsByProductIdSchema,
} from "./review.validation.js";

const router = Router();

router.get("/product/:productId", validate(getReviewsByProductIdSchema), getReviewsByProductIdHandler);
router.post("/", authenticate, authorize("CUSTOMER"), validate(createReviewSchema), createReviewHandler);

export default router;
