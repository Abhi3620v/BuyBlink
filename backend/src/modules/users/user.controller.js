import { catchAsync } from "../../utils/catch-async.js";
import {
  addWishlistItem,
  createAddress,
  deleteShippingDraft,
  deleteAddress,
  deleteWishlistItem,
  getAdminUsers,
  getAddresses,
  getMyNotifications,
  getShippingDraft,
  getWishlistItems,
  readAllMyNotifications,
  readMyNotification,
  upsertShippingDraft,
  updateAdminUserStatus,
  updateProfile,
} from "./user.service.js";

export const updateProfileHandler = catchAsync(async (request, response) => {
  const user = await updateProfile(request.user, request.body);

  response.json({
    success: true,
    message: "Profile updated successfully.",
    data: user,
  });
});

export const getAddressesHandler = catchAsync(async (request, response) => {
  const addresses = await getAddresses(request.user.id);

  response.json({
    success: true,
    data: addresses,
  });
});

export const createAddressHandler = catchAsync(async (request, response) => {
  const address = await createAddress(request.user, request.body);

  response.status(201).json({
    success: true,
    message: "Address saved successfully.",
    data: address,
  });
});

export const getShippingDraftHandler = catchAsync(async (request, response) => {
  const draft = await getShippingDraft(request.user.id);

  response.json({
    success: true,
    data: draft,
  });
});

export const saveShippingDraftHandler = catchAsync(async (request, response) => {
  const draft = await upsertShippingDraft(request.user, request.body);

  response.json({
    success: true,
    message: "Shipping draft saved successfully.",
    data: draft,
  });
});

export const deleteShippingDraftHandler = catchAsync(async (request, response) => {
  await deleteShippingDraft(request.user.id);

  response.json({
    success: true,
    message: "Shipping draft cleared successfully.",
  });
});

export const deleteAddressHandler = catchAsync(async (request, response) => {
  await deleteAddress(request.user.id, request.params.addressId);

  response.json({
    success: true,
    message: "Address deleted successfully.",
  });
});

export const getWishlistItemsHandler = catchAsync(async (request, response) => {
  const items = await getWishlistItems(request.user.id);

  response.json({
    success: true,
    data: items,
  });
});

export const addWishlistItemHandler = catchAsync(async (request, response) => {
  const item = await addWishlistItem(request.user.id, request.body);

  response.status(201).json({
    success: true,
    message: "Wishlist updated successfully.",
    data: item,
  });
});

export const deleteWishlistItemHandler = catchAsync(async (request, response) => {
  const query = request.validatedQuery || request.query;

  await deleteWishlistItem(request.user.id, request.params.productId, query.mode);

  response.json({
    success: true,
    message: "Wishlist item removed successfully.",
  });
});

export const getAdminUsersHandler = catchAsync(async (request, response) => {
  const query = request.validatedQuery || request.query;
  const users = await getAdminUsers(query);

  response.json({
    success: true,
    data: users,
  });
});

export const updateAdminUserStatusHandler = catchAsync(async (request, response) => {
  const user = await updateAdminUserStatus({
    adminUser: request.user,
    userId: request.params.userId,
    status: request.body.status,
  });

  response.json({
    success: true,
    message: "User account status updated successfully.",
    data: user,
  });
});

export const getMyNotificationsHandler = catchAsync(async (request, response) => {
  const notifications = await getMyNotifications(request.user.id);

  response.json({
    success: true,
    data: notifications,
  });
});

export const readMyNotificationHandler = catchAsync(async (request, response) => {
  const notification = await readMyNotification(
    request.user.id,
    request.params.notificationId,
  );

  response.json({
    success: true,
    message: "Notification marked as read.",
    data: notification,
  });
});

export const readAllMyNotificationsHandler = catchAsync(async (request, response) => {
  const notifications = await readAllMyNotifications(request.user.id);

  response.json({
    success: true,
    message: "All notifications marked as read.",
    data: notifications,
  });
});
