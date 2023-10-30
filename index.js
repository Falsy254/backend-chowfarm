const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/product");
const app = express();
app.use(express.json());
dotenv.config();
app.use(cors({ origin: "*" }));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
const PORT = 5000 || process.env.PORT;
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT} and DB is connected`);
  });
});
app.get("/", (req, res) => {
  res.send("Chowfarm Backend API");
});
