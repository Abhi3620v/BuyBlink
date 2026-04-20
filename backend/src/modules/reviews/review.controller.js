import { catchAsync } from "../../utils/catch-async.js";
import { createReview, getReviewsByProductId } from "./review.service.js";

export const getReviewsByProductIdHandler = catchAsync(async (request, response) => {
  const reviews = await getReviewsByProductId(request.params.productId);

  response.json({
    success: true,
    data: reviews,
  });
});

export const createReviewHandler = catchAsync(async (request, response) => {
  const review = await createReview({
    customer: request.user,
    payload: request.body,
  });

  response.status(201).json({
    success: true,
    message: "Review submitted successfully.",
    data: review,
  });
});
