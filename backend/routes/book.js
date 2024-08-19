import express from "express";
import isAuthenticated from "../middleware/authetication.js";
import { addBook, updateBook } from "../controllers/bookController.js";
const router = express.Router();

router.route("/add-book").post(isAuthenticated, addBook);
router.route("/update-book").put(isAuthenticated, updateBook);
export default router;
