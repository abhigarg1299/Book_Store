import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    book: {
      type: mongoose.Types.ObjectId,
      ref: "books",
    },
    status: {
      type: String,
      default: "order Placed",
      enum: ["order Placed,out for delivery,Delivered,cancelled"],
    },
  },
  {
    timestamps: true,
  }
);
export const order = mongoose.model("order", orderSchema);
