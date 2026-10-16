const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDatabase = require("./src/config/database");

const authRoutes = require("./src/routes/authRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const errorMiddleware = require("./src/middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Login Blog API is running",
    data: null,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    data: null,
  });
});

app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectDatabase();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
