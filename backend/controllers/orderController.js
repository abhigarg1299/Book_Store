import { order } from "../models/order.js";
import { user } from "../models/user.js";
import { books } from "../models/book.js";
export const placeOrder = async (req, res) => {
  try {
    const { id } = req.headers;
    const { Order } = req.body;
    for (const orderData of Order) {
      const newOrder = new order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();

      //saving order in user model
      await user.findByIdAndUpdate(id, {
        $push: { order: orderDataFromDb._id },
      });

      //clearing cart
      await user.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }
    return res.json({
      status: "Success",
      message: "Order Placed Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getOrderHistory = async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await user.findById(id).populate({
      path: "order",
      populate: { path: "book" },
    });

    const orderData = userData.orders.reverse();
    return res.json({
      status: "success",
      data: orderData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const userData = await order
      .find()
      .populate({ path: "book" })
      .populate({ path: "user" })
      .sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateOrderStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    await order.findByIdAndUpdate(id, { status: req.body.status });
    return res.json({
      status: "Success",
      message: "Status Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
