import express from "express";
import isAuthenticated from "../middleware/authetication.js";
import {
  addBook,
  deleteBook,
  getAllBooks,
  getBookById,
  getRecentBooks,
  updateBook,
} from "../controllers/bookController.js";
const router = express.Router();

router.route("/add-book").post(isAuthenticated, addBook);
router.route("/update-book").put(isAuthenticated, updateBook);
router.route("/delete-book").delete(isAuthenticated, deleteBook);
router.route("/get-all-books").get(getAllBooks);
router.route("/get-recent-books").get(getRecentBooks);
router.route("/get-book-by-id/:id").get(getBookById);
export default router;
