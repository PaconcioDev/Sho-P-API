const handleProcessFailure = (res, status, message) => {
  return res.status(status).json({ error: message });
};

export { handleProcessFailure };
