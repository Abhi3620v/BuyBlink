import { catchAsync } from "../../utils/catch-async.js";
import {
  createProduct,
  getLandingHighlights,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./product.service.js";

export const getLandingHighlightsHandler = catchAsync(async (_request, response) => {
  const payload = await getLandingHighlights();

  response.json({
    success: true,
    data: payload,
  });
});

export const listProductsHandler = catchAsync(async (request, response) => {
  const products = await listProducts(request.validatedQuery || request.query);

  response.json({
    success: true,
    data: products,
  });
});

export const getProductByIdHandler = catchAsync(async (request, response) => {
  const product = await getProductById(request.params.productId);

  response.json({
    success: true,
    data: product,
  });
});

export const createProductHandler = catchAsync(async (request, response) => {
  const product = await createProduct({
    sellerId: request.user.id,
    payload: request.body,
  });

  response.status(201).json({
    success: true,
    message: "Product created successfully.",
    data: product,
  });
});

export const updateProductHandler = catchAsync(async (request, response) => {
  const product = await updateProduct({
    sellerId: request.user.id,
    productId: request.params.productId,
    payload: request.body,
  });

  response.json({
    success: true,
    message: "Product updated successfully.",
    data: product,
  });
});

export const deleteProductHandler = catchAsync(async (request, response) => {
  await deleteProduct({
    sellerId: request.user.id,
    productId: request.params.productId,
  });

  response.json({
    success: true,
    message: "Product archived successfully.",
  });
});
