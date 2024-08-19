import express from "express";
import isAuthenticated from "../middleware/authetication.js";
import {
  addBookToCart,
  getCartBooks,
  removeBookFromCart,
} from "../controllers/cartController.js";
const router = express.Router();

router.route("/add-to-cart").put(isAuthenticated, addBookToCart);
router.route("/remove-book-from-cart").put(isAuthenticated, removeBookFromCart);
router.route("/get-cart-books").get(isAuthenticated, getCartBooks);
export default router;
