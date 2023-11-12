const asyncHandeler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.staus(error.code).json({
      success: false,
      message: error.message,
    });
  }
};

export { asyncHandeler };
