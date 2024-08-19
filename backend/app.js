import express from "express";
import dotenv from "dotenv";
import dbConnect from "./connection/conn.js";
import userRoute from "./routes/user.js";
import bookRoute from "./routes/book.js";
dotenv.config();
const app = express();

app.use(express.json()); //for post request
app.use("/api/v1/user", userRoute);
app.use("/api/v1/book", bookRoute);
//creating port
const PORT = process.env.PORT;

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is listening at ${PORT}`);
});
