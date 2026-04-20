import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import {
  loginHandler,
  meHandler,
  registerCustomerHandler,
  registerSellerHandler,
} from "./auth.controller.js";
import {
  loginSchema,
  registerCustomerSchema,
  registerSellerSchema,
} from "./auth.validation.js";

const router = Router();

router.post("/register/seller", validate(registerSellerSchema), registerSellerHandler);
router.post("/register/customer", validate(registerCustomerSchema), registerCustomerHandler);
router.post("/login", validate(loginSchema), loginHandler);
router.get("/me", authenticate, meHandler);

export default router;
