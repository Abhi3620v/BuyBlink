export const catchAsync = (handler) => (request, response, next) =>
  Promise.resolve(handler(request, response, next)).catch(next);
