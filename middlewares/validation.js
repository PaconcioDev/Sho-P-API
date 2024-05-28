function handleValidationError(schema, property, optional = false) {
  return (req, res, next) => {
    const data = req[property];
    const result = !optional
      ? schema.safeParse(data)
      : schema.partial().safeParse(data);

    if (result.error) {
      return res.status(422).json({
        error: JSON.parse(result.error.message),
      });
    }

    req.validatedData = result.data;
    next();
  };
}

export { handleValidationError };
