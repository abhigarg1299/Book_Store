import express from "express";
import isAuthenticated from "../middleware/authetication.js";
import {
  addBookToFavourite,
  deleteBookFromFavourite,
  getFavouriteBooks,
} from "../controllers/favouriteController.js";

const router = express.Router();

router
  .route("/add-book-to-faviourite")
  .put(isAuthenticated, addBookToFavourite);

router
  .route("/remove-book-from-favourite")
  .put(isAuthenticated, deleteBookFromFavourite);

router.route("/get-favourite-books").get(isAuthenticated, getFavouriteBooks);
export default router;
