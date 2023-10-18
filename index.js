const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors")
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json())
dotenv.config();


app.use("/api/auth", authRoutes);

const PORT = 5000 || process.env.PORT;

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT} and DB is connected`);
  });
});
app.get("/g",(req,res)=>{
  res.send("Chowfarm Backend API")
})
