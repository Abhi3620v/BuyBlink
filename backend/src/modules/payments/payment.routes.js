import { Router } from "express";
import { tryAuthenticate } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import {
  cancelRazorpayCheckoutHandler,
  createRazorpayCheckoutHandler,
  razorpayWebhookHandler,
  retryRazorpayCheckoutHandler,
  verifyRazorpayCheckoutHandler,
} from "./payment.controller.js";
import {
  cancelRazorpayCheckoutSchema,
  createRazorpayCheckoutSchema,
  retryRazorpayPaymentSchema,
  verifyRazorpayPaymentSchema,
} from "./payment.validation.js";

const router = Router();

router.post(
  "/razorpay/order",
  tryAuthenticate,
  validate(createRazorpayCheckoutSchema),
  createRazorpayCheckoutHandler,
);
router.post("/razorpay/webhook", razorpayWebhookHandler);
router.post(
  "/razorpay/verify",
  tryAuthenticate,
  validate(verifyRazorpayPaymentSchema),
  verifyRazorpayCheckoutHandler,
);
router.post(
  "/razorpay/retry",
  tryAuthenticate,
  validate(retryRazorpayPaymentSchema),
  retryRazorpayCheckoutHandler,
);
router.post(
  "/razorpay/cancel",
  tryAuthenticate,
  validate(cancelRazorpayCheckoutSchema),
  cancelRazorpayCheckoutHandler,
);

export default router;
