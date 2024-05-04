require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.listen(process.env.PORT || 5000, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to my chat application!");
});

app.use("/auth", authRoutes);