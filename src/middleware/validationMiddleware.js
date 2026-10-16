const validateBlog = (req, res, next) => {
  const { title, description, category } = req.body || {};

  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof category !== "string"
  ) {
    return res.status(400).json({
      message: "Title, description and category are required",
      data: null,
    });
  }

  if (!title.trim() || !description.trim() || !category.trim()) {
    return res.status(400).json({
      message: "Blog fields cannot be empty",
      data: null,
    });
  }

  next();
};

module.exports = { validateBlog };
