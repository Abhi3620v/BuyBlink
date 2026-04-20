import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import {
  addWishlistItemHandler,
  createAddressHandler,
  deleteShippingDraftHandler,
  deleteAddressHandler,
  deleteWishlistItemHandler,
  getAdminUsersHandler,
  getAddressesHandler,
  getMyNotificationsHandler,
  getShippingDraftHandler,
  getWishlistItemsHandler,
  readAllMyNotificationsHandler,
  readMyNotificationHandler,
  saveShippingDraftHandler,
  updateAdminUserStatusHandler,
  updateProfileHandler,
} from "./user.controller.js";
import {
  adminUserIdParamSchema,
  adminUserListSchema,
  addressIdParamSchema,
  createAddressSchema,
  deleteWishlistItemSchema,
  markAllNotificationsReadSchema,
  notificationIdParamSchema,
  shippingDraftSchema,
  updateProfileSchema,
  upsertWishlistItemSchema,
} from "./user.validation.js";

const router = Router();

router.use(authenticate);

router.get("/admin", authorize("ADMIN"), validate(adminUserListSchema), getAdminUsersHandler);
router.patch(
  "/admin/:userId/status",
  authorize("ADMIN"),
  validate(adminUserIdParamSchema),
  updateAdminUserStatusHandler,
);
router.patch("/me", validate(updateProfileSchema), updateProfileHandler);
router.get("/me/notifications", getMyNotificationsHandler);
router.patch(
  "/me/notifications/read-all",
  validate(markAllNotificationsReadSchema),
  readAllMyNotificationsHandler,
);
router.patch(
  "/me/notifications/:notificationId/read",
  validate(notificationIdParamSchema),
  readMyNotificationHandler,
);
router.get("/me/shipping-draft", authorize("CUSTOMER"), getShippingDraftHandler);
router.put(
  "/me/shipping-draft",
  authorize("CUSTOMER"),
  validate(shippingDraftSchema),
  saveShippingDraftHandler,
);
router.delete("/me/shipping-draft", authorize("CUSTOMER"), deleteShippingDraftHandler);
router.get("/me/addresses", authorize("CUSTOMER"), getAddressesHandler);
router.post(
  "/me/addresses",
  authorize("CUSTOMER"),
  validate(createAddressSchema),
  createAddressHandler,
);
router.delete(
  "/me/addresses/:addressId",
  authorize("CUSTOMER"),
  validate(addressIdParamSchema),
  deleteAddressHandler,
);
router.get("/me/wishlist", authorize("CUSTOMER"), getWishlistItemsHandler);
router.post(
  "/me/wishlist",
  authorize("CUSTOMER"),
  validate(upsertWishlistItemSchema),
  addWishlistItemHandler,
);
router.delete(
  "/me/wishlist/:productId",
  authorize("CUSTOMER"),
  validate(deleteWishlistItemSchema),
  deleteWishlistItemHandler,
);

export default router;
