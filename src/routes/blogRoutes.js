const express = require("express");

const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const authMiddleware = require("../middleware/authMiddleware");
const { validateBlog } = require("../middleware/validationMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAllBlogs);

router.get("/:id", getBlogById);

router.post("/", validateBlog, createBlog);

router.put("/:id", validateBlog, updateBlog);

router.delete("/:id", deleteBlog);

module.exports = router;
