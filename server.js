require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(process.env.DB_CONNECTION);
const db = mongoose.connection

db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to database"));


// Middleware
app.use(cors({origin: true, credentials: true}));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(express.json());

const userRouter = require("./routes/user");
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("You're at home");
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Server has started");
  console.log(PORT);
});