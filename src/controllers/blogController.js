const mongoose = require("mongoose");
const Blog = require("../models/blogModel");

const createBlog = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const blog = await Blog.create({
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      author: req.user.id,
    });

    return res.status(201).json({
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Create blog error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
      data: null,
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    console.error("Get blogs error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
      data: null,
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid blog ID",
        data: null,
      });
    }

    const blog = await Blog.findById(id).populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        data: null,
      });
    }

    return res.status(200).json({
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Get blog error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
      data: null,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid blog ID",
        data: null,
      });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        data: null,
      });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can update only your own blogs",
        data: null,
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate("author", "name email");

    return res.status(200).json({
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.error("Update blog error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
      data: null,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid blog ID",
        data: null,
      });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        data: null,
      });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can delete only your own blogs",
        data: null,
      });
    }

    await blog.deleteOne();

    return res.status(200).json({
      message: "Blog deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error("Delete blog error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
      data: null,
    });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
