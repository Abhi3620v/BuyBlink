import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import cartRoutes from "../modules/cart/cart.routes.js";
import healthRoutes from "../modules/health/health.routes.js";
import mediaRoutes from "../modules/media/media.routes.js";
import orderRoutes from "../modules/orders/order.routes.js";
import paymentRoutes from "../modules/payments/payment.routes.js";
import productRoutes from "../modules/products/product.routes.js";
import reviewRoutes from "../modules/reviews/review.routes.js";
import supportRoutes from "../modules/support/support.routes.js";
import userRoutes from "../modules/users/user.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/media", mediaRoutes);
router.use("/auth", authRoutes);
router.use("/cart", cartRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/payments", paymentRoutes);
router.use("/reviews", reviewRoutes);
router.use("/support", supportRoutes);
router.use("/users", userRoutes);

export default router;
