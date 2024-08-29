import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./connection/conn.js";
import userRoute from "./routes/user.js";
import bookRoute from "./routes/book.js";
import favouriteRoute from "./routes/favourite.js";
import cartRoute from "./routes/cart.js";
import orderRoute from "./routes/order.js";

dotenv.config();
const app = express();

//cors
app.use(cors());
app.use(express.json()); //for post request
app.use("/api/v1/user", userRoute);
app.use("/api/v1/book", bookRoute);
app.use("/api/v1/favourite", favouriteRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/order", orderRoute);
//creating port

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is listening at ${PORT}`);
});
