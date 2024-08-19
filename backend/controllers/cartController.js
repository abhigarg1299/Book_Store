import { user } from "../models/user.js";
export const addBookToCart = async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    console.log(bookid, id);
    const userData = await user.findById(id);
    console.log(userData);
    const isBookInCart = userData.cart.includes(bookid);
    console.log(isBookInCart);
    if (isBookInCart) {
      return res.json({
        status: "Success",
        message: "Book is already in cart",
      });
    }
    await user.findByIdAndUpdate(id, {
      $push: { cart: bookid },
    });
    return res.json({
      status: "Success",
      message: "Book added  in cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error Occured",
    });
  }
};

export const removeBookFromCart = async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    console.log(bookid, id);
    const userData = await user.findById(id);
    console.log(userData);
    const isBookInCart = userData.cart.includes(bookid);
    if (isBookInCart) {
      await user.findByIdAndUpdate(id, {
        $pull: { cart: bookid },
      });
    }
    return res.status(200).json({
      message: "Book is Removed from cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const getCartBooks = async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await user.findById(id).populate("cart");
    const CartBooks = userData.cart.reverse();
    return res.status(200).json({
      status: "Success",
      data: CartBooks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
