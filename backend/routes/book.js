import express from "express";
import isAuthenticated from "../middleware/authetication.js";
import {
  addBook,
  deleteBook,
  getAllBooks,
  updateBook,
} from "../controllers/bookController.js";
const router = express.Router();

router.route("/add-book").post(isAuthenticated, addBook);
router.route("/update-book").put(isAuthenticated, updateBook);
router.route("/delete-book").delete(isAuthenticated, deleteBook);
router.route("/get-all-books").get(isAuthenticated, getAllBooks);
export default router;
