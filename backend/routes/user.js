import express from "express";
import {
  getUser,
  signIn,
  signUp,
  updateAddress,
} from "../controllers/userController.js";
import isAuthenticated from "../middleware/authetication.js";
const router = express.Router();
router.route("/sign-up").post(signUp);
router.route("/sign-in").post(signIn);
router.route("/get-user-information").get(isAuthenticated, getUser);
router.route("/update-address").put(isAuthenticated, updateAddress);
export default router;
