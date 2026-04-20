export const validate =
  (schema) =>
  async (request, _response, next) => {
    try {
      const parsed = await schema.parseAsync({
        body: request.body,
        params: request.params,
        query: request.query,
      });

      request.body = parsed.body;
      request.params = parsed.params;
      request.validatedQuery = parsed.query;
      next();
    } catch (error) {
      next(error);
    }
  };
