
// Import required packages
const express = require ("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
const errorHandler = require("./middlewares/errorHandler.js");

// Import routes
const userRoutes = require("./routes/userRoutes.js");
const storyRoutes = require("./routes/storyRoutes.js");
const connectDB = require("./config/connectDB.js");

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(express.json());

const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000",
  };
  app.use(cors(corsOptions));
  
  
  app.use(cookieParser());
  
  app.use(bodyParser.json());
  
  app.use(bodyParser.urlencoded({ extended: true }));

  // Connect to Database
  
connectDB();

// routes
app.use("/api/user", userRoutes);
app.use("/api/story", storyRoutes);


app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/public/index.html"));
});

// Start server

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});