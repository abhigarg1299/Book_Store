import express from "express";
import isAuthenticated from "../middleware/authetication.js";
import { addBook } from "../controllers/bookController.js";
const router = express.Router();

router.route("/add-book").post(isAuthenticated, addBook);
export default router;
