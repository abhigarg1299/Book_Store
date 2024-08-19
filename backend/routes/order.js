import express from "express";
import isAuthenticated from "../middleware/authetication.js";
import {
  getAllOrders,
  getOrderHistory,
  placeOrder,
  updateOrderStatusById,
} from "../controllers/orderController.js";
const router = express.Router();

router.route("/place-order").post(isAuthenticated, placeOrder);
router.route("/order-history").get(isAuthenticated, getOrderHistory);
router.route("/get-all-orders").get(isAuthenticated, getAllOrders);
router.route("/update-status/:id").put(isAuthenticated, updateOrderStatusById);
export default router;
