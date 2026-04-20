import { catchAsync } from "../../utils/catch-async.js";
import {
  getCurrentUserProfile,
  loginUser,
  registerCustomer,
  registerSeller,
} from "./auth.service.js";

export const registerSellerHandler = catchAsync(async (request, response) => {
  const result = await registerSeller(request.body);

  response.status(201).json({
    success: true,
    message: "Seller account created successfully.",
    data: result,
  });
});

export const registerCustomerHandler = catchAsync(async (request, response) => {
  const result = await registerCustomer(request.body);

  response.status(201).json({
    success: true,
    message: "Customer account created successfully.",
    data: result,
  });
});

export const loginHandler = catchAsync(async (request, response) => {
  const result = await loginUser(request.body);

  response.json({
    success: true,
    message: "Login successful.",
    data: result,
  });
});

export const meHandler = catchAsync(async (request, response) => {
  const user = await getCurrentUserProfile(request.user.id);

  response.json({
    success: true,
    data: user,
  });
});
