export const errorHandler = (error, _request, response, _next) => {
  const statusCode =
    error.statusCode ||
    (error.name === "ZodError" ? 400 : 500);

  response.status(statusCode).json({
    success: false,
    message: error.message || "Something went wrong.",
    details:
      error.details ||
      (error.name === "ZodError" ? error.flatten?.() : null),
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
  });
};
